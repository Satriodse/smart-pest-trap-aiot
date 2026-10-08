import { Link } from 'react-router-dom';
import React from 'react';

export default function LandingPage() {
  // Fungsi untuk menggulir halaman ke bagian Alur Sistem secara halus
  const scrollToAlurSistem = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const element = document.getElementById('alur-sistem');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      
      {/* ================= NAVBAR ================= */}
      <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/LogoWeb.png" alt="Smart Pest Trap Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold text-gray-900 tracking-tight">Smart Pest Trap</span>
          </div>

          {/* Menu */}
          <div className="hidden md:flex items-center gap-8 font-medium text-sm">
            <Link to="#" className="text-green-600 border-b-2 border-green-600 pb-1">Beranda</Link>
            {/* Tombol Tentang Sistem diubah menggunakan onClick handler */}
            <a 
              href="#alur-sistem" 
              onClick={scrollToAlurSistem}
              className="text-gray-500 hover:text-green-600 transition-colors pb-1 border-b-2 border-transparent hover:border-green-600 cursor-pointer"
            >
              Tentang Sistem
            </a>
          </div>

          {/* Button Login/Register */}
          <Link to="/login" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            Masuk / Daftar
          </Link>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-48 lg:pt-40 lg:pb-64 overflow-hidden">
        {/* Background Sawah & Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img src="/Sawah.jpg" alt="Sawah Background" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
          <div className="absolute inset-0 bg-white/10"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center">
          
          {/* Teks Kiri */}
          <div className="w-full lg:w-3/5 pr-0 lg:pr-12">
            <div className="inline-flex items-center gap-2 bg-green-50/80 backdrop-blur-sm border border-green-200 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
              AIoT untuk Pertanian Berkelanjutan
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6">
              Lindungi Lahan <br className="hidden md:block"/>
              Anda dengan <br className="hidden md:block"/>
              <span className="text-green-600">Kecerdasan Buatan</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
              Smart Pest Trap AIoT adalah sistem pemantauan dan prediksi hama berbasis ESP32-CAM, Computer Vision, dan Machine Learning untuk membantu petani menjaga hasil panen tetap optimal.
            </p>
            <Link to="/login" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3.5 rounded-full text-base font-semibold transition-all shadow-lg hover:shadow-green-600/30">
              Mulai Monitoring
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
          </div>

          {/* Elemen Melayang Kanan (Simulasi UI) */}
          <div className="w-full lg:w-2/5 mt-16 lg:mt-0 relative h-[400px] hidden md:block">
            {/* Card Deteksi Hama */}
            <div className="absolute top-4 left-0 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/50 w-64 z-20 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-sm text-gray-800">Deteksi Hama</span>
                <span className="bg-green-500 text-white text-[10px] px-2 py-1 rounded-full font-bold">42 ekor</span>
              </div>
              <div className="w-full h-32 bg-yellow-200/80 rounded-lg relative overflow-hidden flex items-center justify-center">
                 <div className="absolute top-2 left-4 w-6 h-6 border-2 border-green-500 rounded-sm bg-green-500/20"></div>
                 <div className="absolute bottom-4 right-8 w-5 h-5 border-2 border-green-500 rounded-sm bg-green-500/20"></div>
                 <div className="absolute top-10 left-1/2 w-8 h-8 border-2 border-green-500 rounded-sm bg-green-500/20"></div>
                 <div className="absolute bottom-6 left-10 w-4 h-4 border-2 border-green-500 rounded-sm bg-green-500/20"></div>
                 <span className="text-yellow-600/50 text-xs font-bold">Live Camera Feed</span>
              </div>
            </div>

            {/* Card Prediksi Forecasting */}
            <div className="absolute bottom-12 right-0 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-white/50 w-72 z-30 transform hover:-translate-y-2 transition-transform duration-300">
              <span className="font-bold text-sm text-gray-800 mb-4 block">Prediksi Lonjakan Hama</span>
              <div className="w-full h-20 mb-4">
                <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                  <path fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M0,35 L20,30 L40,25 L60,22 L80,15 L100,5" />
                  <circle cx="0" cy="35" r="3" fill="#10b981"/>
                  <circle cx="20" cy="30" r="3" fill="#10b981"/>
                  <circle cx="40" cy="25" r="3" fill="#10b981"/>
                  <circle cx="60" cy="22" r="3" fill="#10b981"/>
                  <circle cx="80" cy="15" r="3" fill="#10b981"/>
                  <circle cx="100" cy="5" r="4" fill="#10b981" className="animate-pulse"/>
                  <path fill="url(#grad)" opacity="0.2" d="M0,35 L20,30 L40,25 L60,22 L80,15 L100,5 L100,40 L0,40 Z" />
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                Potensi Lonjakan
              </div>
            </div>

            {/* Tag ESP32-CAM */}
            <div className="absolute top-1/2 left-[-20px] bg-white text-gray-700 px-3 py-1.5 rounded-full shadow-lg text-xs font-bold flex items-center gap-2 z-40 border border-gray-100">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path></svg>
              ESP32-CAM
            </div>
          </div>
        </div>

        {/* Kurva Gelombang Pembatas Bawah */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-sm">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="relative bg-white pt-10 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h3 className="text-green-600 font-bold tracking-wider text-sm mb-3 uppercase">Fitur Unggulan</h3>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Teknologi Modern untuk Pertanian Cerdas</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Menggabungkan IoT, Computer Vision, dan Machine Learning untuk pemantauan hama yang lebih akurat dan prediktif.
          </p>
        </div>

        {/* 4 Grid Fitur (Tombol Panah Dihapus) */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="bg-gray-50 hover:bg-white rounded-3xl p-8 transition-all hover:shadow-xl border border-transparent hover:border-gray-100 group">
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-3">Pemantauan Hama Otomatis</h4>
            <p className="text-gray-500 text-sm leading-relaxed mb-2">ESP32-CAM mengambil gambar perangkap hama secara berkala dan mengirimkannya ke server untuk dianalisis.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-50 hover:bg-white rounded-3xl p-8 transition-all hover:shadow-xl border border-transparent hover:border-gray-100 group">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-3">AI Pest Counting</h4>
            <p className="text-gray-500 text-sm leading-relaxed mb-2">Computer Vision mendeteksi dan menghitung jumlah hama secara otomatis dari citra perangkap.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-50 hover:bg-white rounded-3xl p-8 transition-all hover:shadow-xl border border-transparent hover:border-gray-100 group">
            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-3">Prediksi Populasi Hama</h4>
            <p className="text-gray-500 text-sm leading-relaxed mb-2">Sistem menganalisis data historis untuk memprediksi potensi peningkatan populasi hama di masa mendatang.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-gray-50 hover:bg-white rounded-3xl p-8 transition-all hover:shadow-xl border border-transparent hover:border-gray-100 group">
            <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-3">Peringatan Serangan Hama</h4>
            <p className="text-gray-500 text-sm leading-relaxed mb-2">Sistem memberikan peringatan ketika jumlah hama terdeteksi melewati batas aman yang telah ditentukan.</p>
          </div>

        </div>
      </section>

      {/* ================= WORKFLOW SECTION (Ditambahkan ID 'alur-sistem') ================= */}
      {/* Scroll-margin ditambahkan agar saat di-klik, navbar tidak menutupi judul */}
      <section id="alur-sistem" className="bg-white px-6 lg:px-8 pb-10 scroll-mt-24">
        <div className="max-w-7xl mx-auto bg-green-50/50 border border-green-100 rounded-[2.5rem] p-8 md:p-12 flex flex-col xl:flex-row items-center gap-12">
          
          {/* Header Workflow */}
          <div className="w-full xl:w-1/3 text-center xl:text-left">
            <span className="text-green-600 font-bold text-xs tracking-wider uppercase mb-2 block">Alur Sistem</span>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Bagaimana Smart Pest Trap Bekerja?</h3>
            <p className="text-gray-500 text-sm">Dari pengambilan gambar hingga peringatan dini, semuanya berjalan otomatis dan terintegrasi.</p>
          </div>

          {/* Steps */}
          <div className="w-full xl:w-2/3 flex flex-col md:flex-row items-center justify-between relative gap-6 md:gap-0">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center w-full md:w-1/4 z-10">
              <div className="w-16 h-16 bg-white shadow-md rounded-full flex items-center justify-center text-green-600 mb-4 border border-gray-50">
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
              </div>
              <h5 className="font-bold text-gray-900 text-sm mb-1">ESP32-CAM</h5>
              <p className="text-gray-500 text-xs px-2">Mengambil gambar perangkap hama.</p>
            </div>
            {/* Arrow */}
            <div className="hidden md:block w-1/8 text-gray-300"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center w-full md:w-1/4 z-10">
              <div className="w-16 h-16 bg-white shadow-md rounded-full flex items-center justify-center text-blue-600 mb-4 border border-gray-50">
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <h5 className="font-bold text-gray-900 text-sm mb-1">AI Detection</h5>
              <p className="text-gray-500 text-xs px-2">Mendeteksi dan menghitung jumlah hama.</p>
            </div>
             {/* Arrow */}
             <div className="hidden md:block w-1/8 text-gray-300"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center w-full md:w-1/4 z-10">
              <div className="w-16 h-16 bg-white shadow-md rounded-full flex items-center justify-center text-purple-600 mb-4 border border-gray-50">
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
              </div>
              <h5 className="font-bold text-gray-900 text-sm mb-1">Forecasting</h5>
              <p className="text-gray-500 text-xs px-2">Memprediksi potensi lonjakan hama.</p>
            </div>
             {/* Arrow */}
             <div className="hidden md:block w-1/8 text-gray-300"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center w-full md:w-1/4 z-10">
              <div className="w-16 h-16 bg-white shadow-md rounded-full flex items-center justify-center text-orange-600 mb-4 border border-gray-50">
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
              </div>
              <h5 className="font-bold text-gray-900 text-sm mb-1">Early Warning</h5>
              <p className="text-gray-500 text-xs px-2">Memberikan peringatan jika melewati threshold.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER / CTA SECTION ================= */}
      <footer className="bg-white px-6 lg:px-8 pb-16 pt-8 border-t border-green-50 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
             <div className="bg-green-100 p-3 rounded-full text-green-600">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
             </div>
             <div>
               <h4 className="text-lg font-bold text-gray-900">Siap melindungi hasil panen Anda?</h4>
               <p className="text-gray-500 text-sm">Bergabung sekarang dan rasakan manfaat teknologi Smart Pest Trap AIoT.</p>
             </div>
          </div>
          <Link to="\login" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-sm font-semibold transition-all shadow-md whitespace-nowrap flex items-center gap-2">
            Mulai Monitoring
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </Link>
        </div>
      </footer>

    </div>
  );
}