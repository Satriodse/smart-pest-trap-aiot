import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  // Mengatur judul halaman saat pertama kali dimuat
  useEffect(() => {
    document.title = "Smart Pest Trap - Beranda";
  }, []);

  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section dengan Background Sawah yang Stabil */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 min-h-[75vh] flex items-center bg-[url('/Sawah.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold text-slate-900 leading-tight mb-6">
            Lindungi Lahan Anda dengan <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
              Kecerdasan Buatan
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-slate-700 mx-auto mb-10 font-medium">
            Sistem pemantauan hama otomatis 24/7 menggunakan ESP32-CAM dan
            Computer Vision.
          </p>
          {/* Diarahkan ke halaman login */}
          <Link
            to="/login"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg shadow-md transition-all text-lg"
          >
            Akses Dashboard
          </Link>
        </div>
      </section>

      {/* Kotak Fitur Unggulan */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">
            Fitur Unggulan Sistem AIoT
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-slate-200 rounded-xl shadow-sm bg-slate-50">
              <div className="text-4xl mb-4">📷</div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">
                Penerimaan Citra Real-time
              </h3>
              <p className="text-slate-600">
                Modul ESP32-CAM menangkap dan mengirimkan kondisi lahan secara
                presisi setiap saat.
              </p>
            </div>
            <div className="p-6 border border-slate-200 rounded-xl shadow-sm bg-slate-50">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">
                AI Pest Counting
              </h3>
              <p className="text-slate-600">
                Klasifikasi AI otomatis menghitung populasi hama tanpa perlu
                pengecekan manual ke sawah.
              </p>
            </div>
            <div className="p-6 border border-slate-200 rounded-xl shadow-sm bg-slate-50">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">
                Outbreak Warning
              </h3>
              <p className="text-slate-600">
                Sistem memberikan peringatan dini jika jumlah hama melampaui
                batas aman yang ditentukan.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}