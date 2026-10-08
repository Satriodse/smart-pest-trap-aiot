import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  
  // State dari kode asli Anda
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);

  // State tambahan untuk fitur UI mata password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mengatur judul halaman (Dari kode asli Anda)
  useEffect(() => {
    document.title = "Daftar Akun - Smart Pest Trap";
  }, []);

  // Fungsi Register (Dari kode asli Anda)
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok!");
      return;
    }
    // Hapus error jika sukses
    setError(null);
    alert("Registrasi Berhasil! Silakan masuk.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen relative font-sans flex flex-col">
      
      {/* ================= BACKGROUND GAMBAR FULL ================= */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('/Sawah.jpg')" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/10 to-transparent z-0 backdrop-blur-sm"></div>

      {/* ================= NAVBAR MINIMALIS ================= */}
      <nav className="relative z-10 w-full px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/LogoWeb.png" alt="Smart Pest Trap Logo" className="h-9 w-auto drop-shadow-sm" />
          <span className="font-bold text-xl text-slate-900 tracking-tight drop-shadow-sm">Smart Pest Trap</span>
        </div>
        <Link to="/" className="flex items-center gap-2 font-semibold text-sm text-slate-900 hover:text-[#148348] transition-colors drop-shadow-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Beranda
        </Link>
      </nav>

      {/* ================= KONTEN UTAMA ================= */}
      <main className="relative z-10 flex-grow flex flex-col lg:flex-row items-center justify-between px-8 md:px-16 lg:px-24 w-full max-w-[1400px] mx-auto pb-12 pt-8 gap-12 lg:gap-0">
        
        {/* === BAGIAN KIRI: Teks & Ikon Fitur === */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center mt-4 lg:mt-[-50px]">
          <p className="text-slate-700 font-medium mb-2 text-lg drop-shadow-sm">Selamat datang</p>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-[#111827] leading-[1.1] mb-5 tracking-tight drop-shadow-sm">
            Buat Akun Baru <br /> Smart Pest Trap
          </h1>
          <p className="text-slate-700 text-lg mb-12 max-w-md drop-shadow-sm font-medium">
            Mulai pemantauan hama lahan Anda <br /> dengan teknologi AIoT.
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

        {/* === BAGIAN KANAN: Form Register === */}
        <div className="w-full md:w-[480px] bg-white rounded-3xl shadow-2xl p-10 lg:p-12 border border-gray-100">
          <h2 className="text-[26px] font-bold text-slate-900 mb-2 tracking-tight">Daftar Akun</h2>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Lengkapi informasi berikut untuk membuat akun baru di Smart Pest Trap.
          </p>

          {/* Menampilkan pesan error jika password tidak cocok */}
          {error && (
            <div className="p-3 mb-6 bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-100 flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            
            {/* Input Nama Lengkap */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Nama Lengkap</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-11 pr-4 py-3.5 bg-[#f8fafc] border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#148348] focus:border-[#148348] outline-none transition-all placeholder-gray-400" 
                  placeholder="Masukkan nama lengkap Anda" 
                  required
                />
              </div>
            </div>

            {/* Input Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-3.5 bg-[#f8fafc] border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#148348] focus:border-[#148348] outline-none transition-all placeholder-gray-400" 
                  placeholder="Masukkan email Anda" 
                  required
                />
              </div>
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Kata Sandi</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-11 pr-12 py-3.5 bg-[#f8fafc] border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#148348] focus:border-[#148348] outline-none transition-all placeholder-gray-400" 
                  placeholder="Minimal 8 karakter" 
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Input Konfirmasi Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Konfirmasi Kata Sandi</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-11 pr-12 py-3.5 bg-[#f8fafc] border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#148348] focus:border-[#148348] outline-none transition-all placeholder-gray-400" 
                  placeholder="Ulangi kata sandi Anda" 
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Tombol Submit */}
            <button 
              type="submit"
              className="w-full bg-[#148348] hover:bg-green-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2 mt-6"
            >
              Daftar Sekarang
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>

            {/* Divider "atau" */}
            <div className="relative flex py-3 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">atau</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Link Login */}
            <p className="text-center text-sm text-gray-600">
              Sudah punya akun?{' '}
              <Link to="/login" className="text-[#148348] font-bold hover:underline transition-colors">
                Masuk di sini
              </Link>
            </p>
          </form>

        </div>
      </main>

    </div>
  );
}