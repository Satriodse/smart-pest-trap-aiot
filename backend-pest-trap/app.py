import os
import pickle
import pandas as pd
import pytz
from dotenv import load_dotenv
from flask import Flask, jsonify, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
from flask_cors import CORS
from datetime import datetime, timedelta
from werkzeug.utils import secure_filename
from ultralytics import YOLO
from sqlalchemy import func

# 1. Muat Variabel Rahasia dari file .env
load_dotenv()

app = Flask(__name__)

# 2. Konfigurasi CORS & Database
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'fallback_secret_key')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# Konfigurasi Folder Upload
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Inisialisasi
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# ==========================================
# KONFIGURASI ZONA WAKTU INDONESIA (WIB)
# ==========================================
tz_id = pytz.timezone('Asia/Jakarta')

def get_wib_time():
    """Mengembalikan waktu saat ini di WIB dalam format naive datetime 
       agar kompatibel dengan tipe kolom db.DateTime standar"""
    return datetime.now(tz_id).replace(tzinfo=None)

# ==========================================
# LOAD MODEL AI (YOLO & FORECASTING)
# ==========================================
try:
    model_yolo = YOLO('best.pt')
    print("✅ Model YOLO berhasil dimuat!")
except Exception as e:
    print(f"❌ Gagal memuat model YOLO: {e}")

try:
    with open('model_forecasting.pkl', 'rb') as f:
        paket_forecasting = pickle.load(f)
        model_rf = paket_forecasting['model']
        fitur_rf = paket_forecasting['fitur']
    print("✅ Model Forecasting berhasil dimuat!")
except Exception as e:
    print(f"❌ Gagal memuat model Forecasting: {e}")

# ==========================================
# 1. MODEL DATABASE (Tabel-tabel)
# ==========================================
class User(db.Model):
    __tablename__ = 'users'
    id_user = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nama_lengkap = db.Column(db.String(255), nullable=False)
    no_telepon = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), default='Petani')
    created_at = db.Column(db.DateTime, default=get_wib_time)

class PerangkatIoT(db.Model):
    __tablename__ = 'perangkat_iot'
    id_device = db.Column(db.String(50), primary_key=True) 
    id_user = db.Column(db.Integer, db.ForeignKey('users.id_user'), nullable=False) 
    mac_address = db.Column(db.String(50), unique=True, nullable=False) 
    lokasi_lahan = db.Column(db.String(255), nullable=False) 
    status_aktif = db.Column(db.String(20), default='aktif') 
    batas_ambang = db.Column(db.Integer, nullable=False)

class DetectionLog(db.Model):
    __tablename__ = 'detection_logs'
    id_log = db.Column(db.Integer, primary_key=True, autoincrement=True)
    image_filename = db.Column(db.String(255), nullable=False)
    pest_count = db.Column(db.Integer, nullable=False)
    node_id = db.Column(db.String(50), default='ESP32-CAM-01') 
    timestamp = db.Column(db.DateTime, default=get_wib_time)

class Alerts(db.Model):
    __tablename__ = 'alerts'
    id_alert = db.Column(db.Integer, primary_key=True, autoincrement=True) 
    id_log = db.Column(db.Integer, db.ForeignKey('detection_logs.id_log'), nullable=False) 
    pesan_alert = db.Column(db.Text, nullable=False) 
    status_baca = db.Column(db.String(20), default='unread') 
    waktu_alert = db.Column(db.DateTime, default=get_wib_time)

class ForecastingLog(db.Model):
    __tablename__ = 'forecasting_logs'
    id_prediksi = db.Column(db.Integer, primary_key=True, autoincrement=True) 
    id_log = db.Column(db.Integer, db.ForeignKey('detection_logs.id_log'), nullable=True) 
    tanggal_prediksi = db.Column(db.Date, nullable=False) 
    jumlah_prediksi = db.Column(db.Float, nullable=False)
    waktu_kalkulasi = db.Column(db.DateTime, default=get_wib_time)

# ==========================================
# 2. API ENDPOINTS (LOGIN & REGISTER)
# ==========================================
@app.route('/', methods=['GET'])
def index():
    return jsonify({"message": "Backend Smart Pest Trap API berjalan!"}), 200

@app.route('/register', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS Preflight OK"}), 200
    data = request.get_json()
    if not data or not all(k in data for k in ('nama_lengkap', 'no_telepon', 'email', 'password')):
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
# 3. API ENDPOINTS (IoT & AI)
# ==========================================
@app.route('/upload-detect', methods=['POST'])
def upload_and_detect():
    if 'image' not in request.files:
        return jsonify({"error": "Tidak ada file gambar (key: 'image') yang dikirim"}), 400
        
    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "Nama file kosong"}), 400

    if file:
        # Memaksa penamaan file murni berdasarkan waktu server lokal (WIB) saat ini
        waktu_sekarang = get_wib_time().strftime("%Y%m%d_%H%M%S")
        filename = f"{waktu_sekarang}_esp32cam.jpg" 

        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        try:
            # 1. Jalankan Deteksi YOLO
            results = model_yolo(filepath)
            pest_count = len(results[0].boxes)

            # Simpan hasil deteksi ke Database
            new_log = DetectionLog(image_filename=filename, pest_count=pest_count)
            db.session.add(new_log)
            db.session.commit()

            # --- LOGIKA TRIGGER NOTIFIKASI JIKA HAMA >= 50 ---
            if pest_count >= 50:
                pesan = f"Waspada! Terdeteksi lonjakan {pest_count} ekor hama di area lahan Anda."
                new_alert = Alerts(id_log=new_log.id_log, pesan_alert=pesan)
                db.session.add(new_alert)
                db.session.commit()
            # -------------------------------------------------

            # 2. Persiapan Data untuk Forecasting
            logs_terakhir = DetectionLog.query.order_by(DetectionLog.timestamp.desc()).limit(7).all()
            
            riwayat = [log.pest_count for log in reversed(logs_terakhir)]
            if len(riwayat) < 7:
                riwayat = (paket_forecasting['riwayat_7_hari'][:7-len(riwayat)] + riwayat)

            # Menggunakan zona waktu lokal (WIB) untuk forecasting besok
            besok = get_wib_time() + timedelta(days=1)
            
            X_besok = pd.DataFrame([{
                'lag_1': riwayat[-1], 
                'lag_7': riwayat[0],
                'rolling_7': sum(riwayat) / 7,
                'hari_dalam_minggu': besok.weekday()
            }])

            # 3. Jalankan Prediksi Random Forest
            ramalan = float(model_rf.predict(X_besok[fitur_rf])[0])
            
            # Simpan hasil ramalan ke Database
            new_forecast = ForecastingLog(
                id_log=new_log.id_log,
                tanggal_prediksi=besok.date(),
                jumlah_prediksi=ramalan
            )
            db.session.add(new_forecast)
            db.session.commit()

            return jsonify({
                "message": "Gambar diproses & Prediksi berhasil!",
                "filename": filename,
                "pest_count_aktual": pest_count,
                "prediksi_besok": int(ramalan)
            }), 200

        except Exception as e:
            db.session.rollback()
            return jsonify({"error": f"Gagal memproses AI: {str(e)}"}), 500

# ==========================================
# 4. API ENDPOINTS (ADMIN DASHBOARD)
# ==========================================
@app.route('/api/admin/perangkat', methods=['GET', 'POST', 'OPTIONS'])
def manage_perangkat():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS Preflight OK"}), 200
        
    if request.method == 'GET':
        perangkat = PerangkatIoT.query.all()
        hasil = [{
            "id_device": p.id_device,
            "mac_address": p.mac_address,
            "lokasi_lahan": p.lokasi_lahan,
            "status_aktif": p.status_aktif
        } for p in perangkat]
        return jsonify(hasil), 200

    if request.method == 'POST':
        data = request.get_json()
        mac_address = data.get('mac_address')
        lokasi_lahan = data.get('lokasi_lahan')
        
        if not mac_address or not lokasi_lahan:
            return jsonify({"error": "MAC Address dan Lokasi Lahan wajib diisi!"}), 400
            
        if PerangkatIoT.query.filter_by(mac_address=mac_address).first():
            return jsonify({"error": "MAC Address sudah terdaftar!"}), 409
            
        total_dev = PerangkatIoT.query.count() + 1
        id_device = f"DEV-{total_dev:03d}"
        
        new_device = PerangkatIoT(
            id_device=id_device,
            id_user=1,
            mac_address=mac_address,
            lokasi_lahan=lokasi_lahan,
            batas_ambang=50 
        )
        try:
            db.session.add(new_device)
            db.session.commit()
            return jsonify({"message": "Perangkat berhasil ditambahkan!"}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500

@app.route('/api/admin/users', methods=['GET', 'POST', 'OPTIONS'])
def manage_users():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS Preflight OK"}), 200

    if request.method == 'GET':
        users = User.query.all()
        hasil = [{
            "id_user": u.id_user,
            "nama_lengkap": u.nama_lengkap,
            "email": u.email,
            "role": u.role
        } for u in users]
        return jsonify(hasil), 200
        
    if request.method == 'POST':
        data = request.get_json()
        nama = data.get('nama_lengkap')
        email = data.get('email')
        role = data.get('role')
        password = data.get('password')
        
        if not nama or not email or not role or not password:
            return jsonify({"error": "Semua kolom wajib diisi!"}), 400
            
        if User.query.filter_by(email=email).first():
            return jsonify({"error": "Email sudah digunakan!"}), 409
            
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        
        new_user = User(
            nama_lengkap=nama,
            email=email,
            role=role,
            no_telepon="-", 
            password=hashed_password
        )
        try:
            db.session.add(new_user)
            db.session.commit()
            return jsonify({"message": f"Akun {role} berhasil dibuat!"}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500

# ==========================================
# 5. API ENDPOINTS (USER DASHBOARD)
# ==========================================
@app.route('/api/user/dashboard', methods=['GET', 'OPTIONS'])
def user_dashboard():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS Preflight OK"}), 200

    try:
        total_devices = PerangkatIoT.query.count()
        online_devices = PerangkatIoT.query.filter_by(status_aktif='aktif').count()

        # Menggunakan zona waktu lokal (WIB)
        today = get_wib_time().date()
        today_hama = db.session.query(func.sum(DetectionLog.pest_count)).filter(
            func.date(DetectionLog.timestamp) == today
        ).scalar() or 0

        status_lahan = "Aman" if today_hama < 100 else "Waspada"

        tujuh_hari_lalu = today - timedelta(days=6)
        
        grafik_query = db.session.query(
            func.date(DetectionLog.timestamp).label('tanggal'),
            func.sum(DetectionLog.pest_count).label('total_hama')
        ).filter(
            func.date(DetectionLog.timestamp) >= tujuh_hari_lalu
        ).group_by(
            func.date(DetectionLog.timestamp)
        ).order_by(
            func.date(DetectionLog.timestamp).asc()
        ).all()

        nama_hari_id = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]
        grafik_data = []
        for row in grafik_query:
            tanggal_obj = row.tanggal
            if isinstance(tanggal_obj, str):
                 tanggal_obj = datetime.strptime(tanggal_obj, '%Y-%m-%d').date()
            
            hari_index = tanggal_obj.weekday()
            nama_hari = nama_hari_id[hari_index]
            
            grafik_data.append({
                "tanggal": str(tanggal_obj),
                "hari": nama_hari,
                "total": int(row.total_hama)
            })

        return jsonify({
            "summary": {
                "total_hama_hari_ini": today_hama,
                "status_lahan": status_lahan,
                "total_perangkat": total_devices,
                "perangkat_online": online_devices
            },
            "grafik": grafik_data
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ==========================================
# 6. API ENDPOINTS (LOG HAMA & IMAGE VIEWER)
# ==========================================
@app.route('/uploads/<path:filename>')
def serve_image(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/api/user/logs', methods=['GET', 'OPTIONS'])
def get_user_logs():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS Preflight OK"}), 200

    try:
        # Menggunakan zona waktu lokal (WIB)
        tiga_hari_lalu = get_wib_time() - timedelta(days=3)
        logs = DetectionLog.query.filter(
            DetectionLog.timestamp >= tiga_hari_lalu
        ).order_by(DetectionLog.timestamp.desc()).all()

        hasil = []
        total_hama = 0
        for log in logs:
            total_hama += log.pest_count
            hasil.append({
                "id_log": log.id_log,
                "image_filename": log.image_filename,
                "image_url": f"http://localhost:5000/uploads/{log.image_filename}",
                "pest_count": log.pest_count,
                "node_id": log.node_id,
                "timestamp": log.timestamp.isoformat()
            })
            
        return jsonify({
            "logs": hasil,
            "total_hama_3_hari": total_hama,
            "status": "Aman" if total_hama < 100 else "Waspada"
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ==========================================
# 7. API ENDPOINTS (NOTIFIKASI & LAPORAN HARIAN)
# ==========================================
@app.route('/api/user/notifications', methods=['GET', 'POST', 'OPTIONS'])
def user_notifications():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS Preflight OK"}), 200
        
    try:
        # --- LOGIKA OTOMATIS: GENERATE LAPORAN HARIAN (KEMARIN) ---
        # Menggunakan zona waktu lokal (WIB)
        kemarin = get_wib_time().date() - timedelta(days=1)
        judul_laporan = f"Laporan Harian {kemarin.strftime('%d %b %Y')}"
        
        # Cek apakah laporan untuk tanggal kemarin sudah ada di tabel alerts
        laporan_exist = Alerts.query.filter(Alerts.pesan_alert.like(f"%{judul_laporan}%")).first()
        
        if not laporan_exist:
            # Hitung total hama kemarin
            total_kemarin = db.session.query(func.sum(DetectionLog.pest_count)).filter(
                func.date(DetectionLog.timestamp) == kemarin
            ).scalar() or 0
            
            pesan_laporan = f"[{judul_laporan}] Laporan monitoring harian telah tersedia. Total hama yang terdeteksi kemarin adalah sebanyak {int(total_kemarin)} ekor."
            
            # Ambil satu id_log untuk validasi foreign key (menggunakan log terbaru)
            log_terbaru = DetectionLog.query.order_by(DetectionLog.id_log.desc()).first()
            if log_terbaru:
                new_report = Alerts(id_log=log_terbaru.id_log, pesan_alert=pesan_laporan)
                db.session.add(new_report)
                db.session.commit()
        # ----------------------------------------------------------

        if request.method == 'POST':
            data = request.get_json()
            if data and data.get('action') == 'read_all':
                Alerts.query.filter_by(status_baca='unread').update({'status_baca': 'read'})
                db.session.commit()
                return jsonify({"message": "Semua notifikasi ditandai dibaca"}), 200
            
            if data and data.get('id_alert'):
                alert = Alerts.query.get(data['id_alert'])
                if alert:
                    alert.status_baca = 'read'
                    db.session.commit()
                    return jsonify({"message": "Notifikasi ditandai dibaca"}), 200

        alerts = Alerts.query.order_by(Alerts.waktu_alert.desc()).all()
        hasil = []
        unread_count = 0
        for a in alerts:
            if a.status_baca == 'unread':
                unread_count += 1
            hasil.append({
                "id_alert": a.id_alert,
                "id_log": a.id_log,
                "pesan_alert": a.pesan_alert,
                "status_baca": a.status_baca,
                "waktu_alert": a.waktu_alert.isoformat()
            })
            
        return jsonify({
            "alerts": hasil,
            "unread_count": unread_count
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# ==========================================
# 8. API ENDPOINTS (PENGATURAN PROFIL)
# ==========================================
@app.route('/api/user/profile/<int:id_user>', methods=['GET', 'PUT', 'OPTIONS'])
def manage_profile(id_user):
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS Preflight OK"}), 200

    user = User.query.get(id_user)
    if not user:
        return jsonify({"error": "User tidak ditemukan"}), 404

    # GET: Mengambil data diri user saat ini
    if request.method == 'GET':
        return jsonify({
            "id_user": user.id_user,
            "nama_lengkap": user.nama_lengkap,
            "no_telepon": user.no_telepon,
            "email": user.email
        }), 200

    # PUT: Memperbarui Nama dan Nomor Telepon
    if request.method == 'PUT':
        data = request.get_json()
        if 'nama_lengkap' in data:
            user.nama_lengkap = data['nama_lengkap']
        if 'no_telepon' in data:
            user.no_telepon = data['no_telepon']

        try:
            db.session.commit()
            return jsonify({"message": "Profil berhasil diperbarui!"}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    with app.app_context():
        db.create_all() 
    app.run(host='0.0.0.0', port=5000, debug=True)