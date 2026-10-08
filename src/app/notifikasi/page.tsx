import React, { useEffect } from 'react';

export default function NotifikasiPage() {
  useEffect(() => {
    document.title = "Notifikasi - Smart Pest Trap";
  }, []);

  // Data tiruan notifikasi sesuai desain
  const notifications = [
    {
      id: 1,
      type: "trap",
      title: "Yellow Sticky Trap Penuh",
      description: "Perangkap kuning di Sektor A telah mencapai kapasitas penuh (> 300 ekor). Segera lakukan penggantian perangkap.",
      location: "Sektor A",
      date: "23 Jun 2025, 09:45",
      status: "Penting"
    },
    {
      id: 2,
      type: "report",
      title: "Laporan Harian",
      description: "Laporan monitoring harian untuk 23 Juni 2025 telah tersedia. Silakan lihat detailnya pada menu Log Hama.",
      location: "Semua Lokasi",
      date: "23 Jun 2025, 08:00",
      status: "Info"
    },
    {
      id: 3,
      type: "trap",
      title: "Yellow Sticky Trap Penuh",
      description: "Perangkap kuning di Sektor B telah mencapai kapasitas penuh (> 300 ekor). Segera lakukan penggantian perangkap.",
      location: "Sektor B",
      date: "22 Jun 2025, 16:20",
      status: "Penting"
    },
    {
      id: 4,
      type: "report",
      title: "Laporan Harian",
      description: "Laporan monitoring harian untuk 22 Juni 2025 telah tersedia. Silakan lihat detailnya pada menu Log Hama.",
      location: "Semua Lokasi",
      date: "22 Jun 2025, 07:50",
      status: "Info"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      
      {/* ================= 1. HEADER ================= */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Notifikasi</h1>
        <p className="text-slate-500 mt-2 text-sm">Pantau semua notifikasi penting terkait kondisi lahan Anda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ================= 2. KONTEN UTAMA (KIRI) ================= */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          
          {/* Tabs Filter Cepat (Pills) */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-3">
            <button className="bg-[#148348] text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-sm">
              Semua <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">3</span>
            </button>
            <button className="bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors">
              Yellow Sticky Trap Penuh <span className="bg-slate-200 px-2 py-0.5 rounded-full text-xs text-slate-600">1</span>
            </button>
            <button className="bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors">
              Laporan Harian <span className="bg-slate-200 px-2 py-0.5 rounded-full text-xs text-slate-600">2</span>
            </button>
          </div>

          {/* List Notifikasi */}
          <div className="flex flex-col gap-4">
            {notifications.map((notif) => {
              const isPenting = notif.status === "Penting";
              
              return (
                <div 
                  key={notif.id} 
                  className={`relative p-5 md:p-6 rounded-2xl border-l-[4px] shadow-sm flex flex-col sm:flex-row gap-5 cursor-pointer group transition-all ${
                    isPenting 
                      ? "bg-[#fffbfb] border-l-red-500 border-y-red-100 border-r-red-100 hover:shadow-md hover:bg-[#fff5f5]" 
                      : "bg-white border-l-[#148348] border-y-slate-200 border-r-slate-200 hover:shadow-md hover:bg-slate-50"
                  }`}
                >
                  {/* Ikon Kiri */}
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${isPenting ? 'bg-orange-50 text-orange-500' : 'bg-green-50 text-[#148348]'}`}>
                    {notif.type === "trap" ? (
                       <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                    ) : (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    )}
                  </div>

                  {/* Teks Konten */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1.5">
                      <h3 className="font-bold text-slate-900 text-base">{notif.title}</h3>
                      {/* Badge Penting/Info di Mobile ditaruh disini, di Desktop bisa dipisah */}
                      <span className={`md:hidden px-2.5 py-1 rounded-full text-[10px] font-bold ${isPenting ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>
                        {notif.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4 pr-0 md:pr-12">{notif.description}</p>
                    
                    {/* Lokasi & Tanggal */}
                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        {notif.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        {notif.date}
                      </span>
                    </div>
                  </div>

                  {/* Kanan: Badge (Desktop) & Ikon Panah */}
                  <div className="hidden md:flex flex-col items-end justify-between">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${isPenting ? 'bg-red-100 text-red-600' : 'bg-[#e8f5e9] text-[#148348]'}`}>
                      {notif.status}
                    </span>
                    <svg className="w-5 h-5 text-slate-300 group-hover:text-slate-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="pt-2 flex justify-center items-center gap-2">
            <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#148348] text-white font-bold text-sm shadow-sm transition-colors">1</button>
            <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-sm transition-colors">2</button>
            <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>

        </div>

        {/* ================= 3. PANEL FILTER (KANAN) ================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-fit">
          <h3 className="font-bold text-slate-900 text-base mb-6">Filter Notifikasi</h3>
          
          {/* Filter Kategori */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-slate-700 mb-3">Kategori</h4>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-[4px] bg-[#148348] flex items-center justify-center text-white">
                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-sm text-slate-600 font-medium group-hover:text-slate-900 transition-colors">Yellow Sticky Trap Penuh</span>
                </div>
                <span className="bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">1</span>
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-[4px] bg-[#148348] flex items-center justify-center text-white">
                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-sm text-slate-600 font-medium group-hover:text-slate-900 transition-colors">Laporan Harian</span>
                </div>
                <span className="bg-slate-200 text-slate-500 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">2</span>
              </label>
            </div>
          </div>

          <hr className="border-slate-100 mb-6" />

          {/* Filter Status */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-slate-700 mb-3">Status</h4>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-[4px] bg-[#148348] flex items-center justify-center text-white">
                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-sm text-slate-600 font-medium group-hover:text-slate-900 transition-colors">Penting</span>
                </div>
                <span className="bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">1</span>
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-[4px] bg-[#148348] flex items-center justify-center text-white">
                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-sm text-slate-600 font-medium group-hover:text-slate-900 transition-colors">Info</span>
                </div>
                <span className="bg-slate-200 text-slate-500 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">2</span>
              </label>
            </div>
          </div>

          <hr className="border-slate-100 mb-6" />

          {/* Filter Tanggal */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-slate-700 mb-3">Tanggal</h4>
            <div className="relative cursor-pointer">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>
              <div className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-500 font-medium hover:border-slate-300 transition-colors">
                Pilih rentang tanggal
              </div>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                 <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {/* Tombol Reset */}
          <button className="w-full flex items-center justify-center gap-2 border border-[#148348] text-[#148348] hover:bg-green-50 font-bold px-4 py-3 rounded-xl transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            Reset Filter
          </button>

        </div>
      </div>
    </div>
  );
}