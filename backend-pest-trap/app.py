from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
from flask_cors import CORS
from datetime import timedelta

app = Flask(__name__)

# Konfigurasi CORS Super Kuat untuk semua rute
CORS(app, resources={r"/*": {"origins": "*"}})

# Konfigurasi Database (PostgreSQL Supabase)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres.pfnirjdxrjqoxsfykwfs:Satrio0813D3TIUNS@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Konfigurasi JWT untuk masa aktif token (misal: 1 hari)
app.config['JWT_SECRET_KEY'] = 'kunci_rahasia_smart_pest_trap_123'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# Inisialisasi
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# ==========================================
# MODEL DATABASE (Merepresentasikan tabel users)
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

# ==========================================
# API ENDPOINTS
# ==========================================

@app.route('/', methods=['GET'])
def index():
    return jsonify({"message": "Backend Smart Pest Trap API berjalan dan terhubung ke Supabase!"}), 200

@app.route('/register', methods=['POST', 'OPTIONS'])
def register():
    # Tangkap preflight CORS secara eksplisit
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS Preflight OK"}), 200

    data = request.get_json()

    if not data or not data.get('nama_lengkap') or not data.get('no_telepon') or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Harap isi semua data (nama, nomor telepon, email, password)"}), 400

    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({"error": "Email sudah terdaftar, silakan gunakan email lain."}), 409

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    new_user = User(
        nama_lengkap=data['nama_lengkap'],
        no_telepon=data['no_telepon'],
        email=data['email'],
        password=hashed_password
    )

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "Registrasi berhasil! Silakan login."}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Terjadi kesalahan server: {str(e)}"}), 500

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
            "message": "Login berhasil!",
            "token": access_token,
            "user": {
                "id_user": user.id_user,
                "nama_lengkap": user.nama_lengkap,
                "no_telepon": user.no_telepon,
                "email": user.email,
                "role": user.role
            }
        }), 200
    else:
        return jsonify({"error": "Email atau password salah!"}), 401

if __name__ == '__main__':
    app.run(debug=True, port=5000)