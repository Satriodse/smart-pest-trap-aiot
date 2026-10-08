import { useEffect } from "react";
import { Link } from "react-router-dom";
import AuthFormClient from "../../components/AuthFormClient";

export default function LoginPage() {
  // Mempertahankan fitur metadata title halaman
  useEffect(() => {
    document.title = "Masuk - Smart Pest Trap";
  }, []);

  return (
    <div className="min-h-screen relative font-sans flex flex-col">
      
      {/* ================= BACKGROUND GAMBAR FULL ================= */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('/Sawah.jpg')" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/10 to-transparent z-0"></div>

      {/* ================= NAVBAR MINIMALIS ================= */}
      <nav className="relative z-10 w-full px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/LogoWeb.png" alt="Smart Pest Trap Logo" className="h-9 w-auto drop-shadow-sm" />
          <span className="font-bold text-xl text-slate-900 tracking-tight drop-shadow-sm">Smart Pest Trap</span>
        </div>
        <Link to="/" className="flex items-center gap-2 font-semibold text-sm text-slate-900 hover:text-green-700 transition-colors drop-shadow-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Beranda
        </Link>
      </nav>

      {/* ================= KONTEN UTAMA ================= */}
      <main className="relative z-10 flex-grow flex flex-col lg:flex-row items-center justify-between px-8 md:px-16 lg:px-24 w-full max-w-[1400px] mx-auto pb-12 pt-8 gap-12 lg:gap-0">
        
        {/* === BAGIAN KIRI: Teks & Ikon Fitur === */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center mt-4 lg:mt-[-50px]">
          <p className="text-slate-700 font-medium mb-2 text-lg drop-shadow-sm">Selamat datang kembali</p>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-[#111827] leading-[1.1] mb-5 tracking-tight drop-shadow-sm">
            Masuk ke Smart <br /> Pest Trap
          </h1>
          <p className="text-slate-700 text-lg mb-12 max-w-md drop-shadow-sm font-medium">
            Pantau hama. Prediksi peningkatan. <br /> Lindungi hasil panen.
          </p>

          <div className="flex gap-8">
            <div className="flex flex-col items-center text-center text-white drop-shadow-md">
              <div className="w-14 h-14 rounded-full border-[1.5px] border-white/80 flex items-center justify-center mb-3 bg-white/10 backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <span className="text-sm font-semibold tracking-wide text-slate-800 lg:text-white">Deteksi<br/>Hama</span>
            </div>

            <div className="flex flex-col items-center text-center text-white drop-shadow-md">
              <div className="w-14 h-14 rounded-full border-[1.5px] border-white/80 flex items-center justify-center mb-3 bg-white/10 backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
              </div>
              <span className="text-sm font-semibold tracking-wide text-slate-800 lg:text-white">Prediksi<br/>Populasi</span>
            </div>

            <div className="flex flex-col items-center text-center text-white drop-shadow-md">
              <div className="w-14 h-14 rounded-full border-[1.5px] border-white/80 flex items-center justify-center mb-3 bg-white/10 backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
              </div>
              <span className="text-sm font-semibold tracking-wide text-slate-800 lg:text-white">Peringatan<br/>Dini</span>
            </div>
          </div>
        </div>

        {/* === BAGIAN KANAN: Kotak Putih Tempat Form Berada === */}
        <div className="w-full md:w-[480px] bg-white rounded-3xl shadow-2xl p-10 lg:p-12 border border-gray-100">
          <AuthFormClient />
        </div>

      </main>
    </div>
  );
}