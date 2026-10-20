import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
from flask_cors import CORS
from datetime import timedelta
from werkzeug.utils import secure_filename
from ultralytics import YOLO # Tambahan untuk FR-03

app = Flask(__name__)

# Konfigurasi CORS & Database
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    'DATABASE_URL', 
    'postgresql+psycopg2://postgres.pfnirjdxrjqoxsfykwfs:Satrio0813D3TIUNS@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'kunci_rahasia_smart_pest_trap_123'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# Konfigurasi Folder Upload (FR-02)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Inisialisasi
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Load Model YOLO (FR-03)
# Pastikan file best.pt berada satu folder dengan app.py
try:
    model_yolo = YOLO('best.pt')
    print("Model YOLO berhasil dimuat!")
except Exception as e:
    print(f"Gagal memuat model YOLO: {e}")

# ==========================================
# 1. MODEL DATABASE
# ==========================================
class User(db.Model):
    __tablename__ = 'users'
    id_user = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nama_lengkap = db.Column(db.String(255), nullable=False)
    no_telepon = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), default='Petani')
    created_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())

# TABEL BARU: Menyimpan riwayat deteksi hama (FR-02 & FR-03)
class DetectionLog(db.Model):
    __tablename__ = 'detection_logs'
    id_log = db.Column(db.Integer, primary_key=True, autoincrement=True)
    image_filename = db.Column(db.String(255), nullable=False)
    pest_count = db.Column(db.Integer, nullable=False)
    # node_id disiapkan untuk FR-07 (Manajemen Perangkat) nanti
    node_id = db.Column(db.String(50), default='ESP32-CAM-01') 
    timestamp = db.Column(db.DateTime, server_default=db.func.current_timestamp())

# ==========================================
# 2. API ENDPOINTS (FR-01: LOGIN & REGISTER)
# ==========================================
@app.route('/', methods=['GET'])
def index():
    return jsonify({"message": "Backend Smart Pest Trap API berjalan!"}), 200

@app.route('/register', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS Preflight OK"}), 200
    data = request.get_json()
    if not data or not data.get('nama_lengkap') or not data.get('no_telepon') or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Harap isi semua data"}), 400
    
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({"error": "Email sudah terdaftar."}), 409
        
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(
        nama_lengkap=data['nama_lengkap'], no_telepon=data['no_telepon'],
        email=data['email'], password=hashed_password
    )
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "Registrasi berhasil!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS Preflight OK"}), 200
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Email dan password wajib diisi"}), 400
        
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(
            identity=str(user.id_user), 
            additional_claims={"role": user.role, "nama": user.nama_lengkap}
        )
        return jsonify({
            "message": "Login berhasil!", "token": access_token,
            "user": {"id_user": user.id_user, "nama_lengkap": user.nama_lengkap, "role": user.role}
        }), 200
    return jsonify({"error": "Email atau password salah!"}), 401

# ==========================================
# 3. API ENDPOINTS (FR-02 & FR-03: IoT & AI)
# ==========================================
@app.route('/upload-detect', methods=['POST'])
def upload_and_detect():
    # 1. Cek apakah ada file gambar yang dikirim dari ESP32-CAM
    if 'image' not in request.files:
        return jsonify({"error": "Tidak ada file gambar (key: 'image') yang dikirim"}), 400
        
    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "Nama file kosong"}), 400

    if file:
        # FR-02: Simpan Gambar
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # FR-03: Jalankan Deteksi YOLO
        try:
            results = model_yolo(filepath)
            
            # Menghitung jumlah hama (jumlah kotak / bounding box yang terdeteksi)
            pest_count = len(results[0].boxes)

            # Simpan hasil deteksi ke Database Supabase
            new_log = DetectionLog(image_filename=filename, pest_count=pest_count)
            db.session.add(new_log)
            db.session.commit()

            return jsonify({
                "message": "Gambar diterima dan diproses!",
                "filename": filename,
                "pest_count": pest_count
            }), 200

        except Exception as e:
            db.session.rollback()
            return jsonify({"error": f"Gagal memproses gambar: {str(e)}"}), 500

if __name__ == '__main__':
    # Ini akan otomatis membuat tabel baru di Supabase jika belum ada
    with app.app_context():
        db.create_all() 
        
    app.run(host='0.0.0.0', port=5000, debug=True)