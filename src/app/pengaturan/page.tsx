import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

export default function PengaturanPage() {
  const user = useAuthStore((state) => state.user);
  
  useEffect(() => {
    document.title = "Pengaturan - Smart Pest Trap";
  }, []);

  // State untuk form profil
  const [formData, setFormData] = useState({
    name: user?.name || "Satrio Dwi Setiawan",
    email: user?.email || "satrio@email.com",
    phone: "0812 3456 7890" // Data dummy untuk nomor HP
  });

  // State untuk toggle preferensi
  const [preferences, setPreferences] = useState({
    trap_app: true,
    trap_wa: true,
    report_app: true,
    report_wa: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in pb-12">
      
      {/* ================= 1. HEADER ================= */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Pengaturan</h1>
        <p className="text-slate-500 mt-2 text-sm">Kelola informasi akun dan preferensi notifikasi Anda.</p>
      </div>

      <div className="space-y-6">
        
        {/* ================= 2. KARTU PROFIL ================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
          {/* Header Kartu */}
          <div className="flex gap-4 items-center mb-8 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 rounded-full bg-green-50 text-[#148348] flex items-center justify-center flex-shrink-0">
               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Profil</h2>
              <p className="text-sm text-slate-500 mt-0.5">Informasi dasar akun Anda.</p>
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Input Nama Lengkap */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:ring-2 focus:ring-[#148348] focus:border-[#148348] outline-none transition-all" 
                />
              </div>
            </div>

            {/* Input Nomor HP */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nomor Handphone</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <input 
                  type="text" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:ring-2 focus:ring-[#148348] focus:border-[#148348] outline-none transition-all" 
                />
              </div>
            </div>

            {/* Input Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:ring-2 focus:ring-[#148348] focus:border-[#148348] outline-none transition-all" 
                />
              </div>
            </div>

            {/* Tombol Ubah Kata Sandi */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Ubah Kata Sandi</label>
              <button className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-[#148348] rounded-xl text-sm text-[#148348] font-bold hover:bg-green-50 transition-colors">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  Ubah Kata Sandi
                </div>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
          </div>

          {/* Tombol Simpan */}
          <div className="mt-8 flex justify-end">
            <button className="bg-[#148348] hover:bg-green-800 text-white font-bold px-6 py-2.5 rounded-xl transition-colors shadow-sm flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
              Simpan Perubahan
            </button>
          </div>
        </div>

        {/* ================= 3. KARTU PREFERENSI NOTIFIKASI ================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
          {/* Header Kartu */}
          <div className="flex gap-4 items-center mb-8 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 rounded-full bg-green-50 text-[#148348] flex items-center justify-center flex-shrink-0">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Preferensi Notifikasi</h2>
              <p className="text-sm text-slate-500 mt-0.5">Atur jenis notifikasi yang ingin Anda terima.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Box Kiri: Notifikasi Yellow Trap */}
            <div className="bg-[#f8fafc] p-6 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm mb-2">Notifikasi Yellow Sticky Trap Penuh</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">Dapatkan notifikasi saat jumlah hama pada yellow sticky trap mencapai kapasitas penuh.</p>
              
              <div className="space-y-4">
                {/* Opsi Aplikasi */}
                <label className="flex gap-4 cursor-pointer group">
                  <div className="mt-1 relative flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      className="peer w-5 h-5 appearance-none rounded border-2 border-slate-300 checked:bg-[#148348] checked:border-[#148348] transition-colors cursor-pointer"
                      checked={preferences.trap_app}
                      onChange={() => togglePreference('trap_app')}
                    />
                    <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div className="flex gap-3">
                    <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Aplikasi</p>
                      <p className="text-xs text-slate-500 mt-0.5">Notifikasi akan muncul di dalam aplikasi.</p>
                    </div>
                  </div>
                </label>
                
                {/* Opsi WhatsApp */}
                <label className="flex gap-4 cursor-pointer group">
                  <div className="mt-1 relative flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      className="peer w-5 h-5 appearance-none rounded border-2 border-slate-300 checked:bg-[#148348] checked:border-[#148348] transition-colors cursor-pointer"
                      checked={preferences.trap_wa}
                      onChange={() => togglePreference('trap_wa')}
                    />
                    <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div className="flex gap-3">
                    {/* Icon WA */}
                    <svg className="w-6 h-6 text-slate-700" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"></path></svg>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">WhatsApp</p>
                      <p className="text-xs text-slate-500 mt-0.5">Notifikasi akan dikirim melalui WhatsApp.</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Box Kanan: Laporan Harian */}
            <div className="bg-[#f8fafc] p-6 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm mb-2">Laporan Harian</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">Dapatkan ringkasan hasil deteksi hama <span className="font-bold text-slate-700">harian dari seluruh</span> perangkap.</p>
              
              <div className="space-y-4">
                {/* Opsi Aplikasi */}
                <label className="flex gap-4 cursor-pointer group">
                  <div className="mt-1 relative flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      className="peer w-5 h-5 appearance-none rounded border-2 border-slate-300 checked:bg-[#148348] checked:border-[#148348] transition-colors cursor-pointer"
                      checked={preferences.report_app}
                      onChange={() => togglePreference('report_app')}
                    />
                    <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div className="flex gap-3">
                    <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Aplikasi</p>
                      <p className="text-xs text-slate-500 mt-0.5">Laporan harian akan muncul di dalam aplikasi.</p>
                    </div>
                  </div>
                </label>
                
                {/* Opsi WhatsApp */}
                <label className="flex gap-4 cursor-pointer group">
                  <div className="mt-1 relative flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      className="peer w-5 h-5 appearance-none rounded border-2 border-slate-300 checked:bg-[#148348] checked:border-[#148348] transition-colors cursor-pointer"
                      checked={preferences.report_wa}
                      onChange={() => togglePreference('report_wa')}
                    />
                    <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div className="flex gap-3">
                    {/* Icon WA */}
                    <svg className="w-6 h-6 text-slate-700" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"></path></svg>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">WhatsApp</p>
                      <p className="text-xs text-slate-500 mt-0.5">Laporan harian akan dikirim melalui WhatsApp.</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

          </div>
        </div>

        {/* ================= 4. KARTU KEAMANAN ================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
          {/* Header Keamanan */}
          <div className="flex gap-4 items-center mb-8 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 rounded-full bg-green-50 text-[#148348] flex items-center justify-center flex-shrink-0">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Keamanan</h2>
              <p className="text-sm text-slate-500 mt-0.5">Jaga keamanan akun Anda dengan kata sandi yang kuat.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#f8fafc] p-6 rounded-2xl border border-slate-100">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Kata Sandi</h3>
                <p className="text-xs text-slate-500 mt-1">Terakhir diubah pada 16 Jun 2025, 08:30</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#148348] rounded-xl text-sm text-[#148348] font-bold hover:bg-green-50 transition-colors shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              Ubah Kata Sandi
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}