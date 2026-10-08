import React, { useEffect } from 'react';

export default function LogHamaPage() {
  useEffect(() => {
    document.title = "Log Hama - Smart Pest Trap";
  }, []);

  // Data tiruan (mock data) sesuai dengan desain gambar
  const logData = [
    { id: 1, device: "ESP32-CAM-001", sector: "Sektor A", date: "22 Jun 2025, 14:32", count: 68 },
    { id: 2, device: "ESP32-CAM-002", sector: "Sektor B", date: "21 Jun 2025, 16:17", count: 45 },
    { id: 3, device: "ESP32-CAM-001", sector: "Sektor A", date: "20 Jun 2025, 11:03", count: 37 },
    { id: 4, device: "ESP32-CAM-003", sector: "Sektor C", date: "19 Jun 2025, 15:26", count: 52 },
    { id: 5, device: "ESP32-CAM-002", sector: "Sektor B", date: "18 Jun 2025, 09:41", count: 28 },
    { id: 6, device: "ESP32-CAM-003", sector: "Sektor C", date: "17 Jun 2025, 13:12", count: 61 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      
      {/* ================= 1. HEADER ================= */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Log Hama</h1>
        <p className="text-slate-500 mt-2 text-sm">Riwayat hasil deteksi hama dari perangkat ESP32-CAM di lahan Anda.</p>
      </div>

      {/* ================= 2. FILTER BAR ================= */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-2">
        
        {/* Filter Tanggal */}
        <div className="flex-1 flex items-center justify-between px-4 py-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors border-r border-transparent md:border-slate-100">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <div>
              <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Tanggal</p>
              <p className="text-sm font-medium text-slate-700">16 Jun 2025 – 23 Jun 2025</p>
            </div>
          </div>
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>

        {/* Filter Perangkat */}
        <div className="flex-1 flex items-center justify-between px-4 py-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors border-r border-transparent md:border-slate-100">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div>
              <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Perangkat</p>
              <p className="text-sm font-medium text-slate-700">Semua Perangkat</p>
            </div>
          </div>
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>

        {/* Filter Lokasi */}
        <div className="flex-1 flex items-center justify-between px-4 py-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <div>
              <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Lokasi</p>
              <p className="text-sm font-medium text-slate-700">Semua Lokasi</p>
            </div>
          </div>
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>

        {/* Tombol Reset */}
        <div className="px-4 py-3 flex items-center">
          <button className="w-full flex items-center justify-center gap-2 border border-[#148348] text-[#148348] hover:bg-green-50 font-medium px-4 py-2.5 rounded-xl transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            Reset Filter
          </button>
        </div>
      </div>

      {/* ================= 3. KONTEN UTAMA (KIRI: TABEL, KANAN: STATISTIK) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* === KOLOM KIRI: Daftar Log Hama (Lebar 2/3) === */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          
          {/* Header Tabel */}
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white">
            <h3 className="font-bold text-slate-800 text-sm">Total Log Hama: <span className="text-slate-500 font-medium">8 data</span></h3>
            <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
              <span>Urutkan:</span>
              <button className="flex items-center gap-2 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50">
                Terbaru
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
            </div>
          </div>

          {/* List Data Hama */}
          <div className="flex-1 overflow-y-auto">
            <ul className="divide-y divide-slate-100">
              {logData.map((log) => (
                <li key={log.id} className="p-5 hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-5">
                    {/* Placeholder Gambar Yellow Trap */}
                    <div className="w-16 h-16 rounded-xl bg-yellow-400 border border-yellow-500 flex-shrink-0 flex items-center justify-center opacity-90 overflow-hidden relative">
                       {/* Pola titik-titik hitam simulasi lalat/hama */}
                       <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(black 15%, transparent 16%)', backgroundSize: '8px 8px' }}></div>
                    </div>
                    
                    {/* Info Deteksi */}
                    <div>
                      <h4 className="font-bold text-slate-900 text-base mb-1">Deteksi Hama</h4>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs font-medium text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          {log.device}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                          {log.sector}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Kanan: Tanggal & Badge Ekor */}
                  <div className="flex items-center gap-6">
                    <span className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      {log.date}
                    </span>
                    <div className="bg-green-50 border border-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap">
                      {log.count} ekor
                    </div>
                    <svg className="w-5 h-5 text-slate-300 group-hover:text-slate-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Pagination */}
          <div className="p-5 border-t border-slate-100 flex justify-center items-center gap-2 bg-white">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#148348] text-white font-bold text-sm shadow-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-sm">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </div>

        {/* === KOLOM KANAN: Panel Statistik (Lebar 1/3) === */}
        <div className="space-y-6">
          
          {/* Card 1: Total Hama Terdeteksi */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 text-[#148348] flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
              </div>
              <div>
                <p className="text-slate-600 text-sm font-semibold mb-1">Total Hama Terdeteksi</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-extrabold text-slate-900">311</h3>
                  <span className="text-sm text-slate-500 font-medium">ekor</span>
                </div>
                <div className="flex items-center gap-1.5 mt-2 text-xs font-medium">
                  <svg className="w-4 h-4 text-[#148348]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                  <span className="text-[#148348] font-bold">18%</span>
                  <span className="text-slate-400">dari periode sebelumnya</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Status Lahan */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
              </div>
              <div>
                <p className="text-slate-600 text-sm font-semibold mb-1">Status Lahan</p>
                <h3 className="text-2xl font-extrabold text-[#148348] mb-1.5 tracking-tight">Aman</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Populasi hama masih dalam batas normal.</p>
              </div>
            </div>
          </div>

          {/* Card 3: Perangkat Aktif */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
              </div>
              <div className="w-full">
                <p className="text-slate-600 text-sm font-semibold mb-1">Perangkat Aktif</p>
                <div className="flex items-baseline gap-2 mb-3">
                  <h3 className="text-2xl font-extrabold text-slate-900">3</h3>
                  <span className="text-sm text-slate-500 font-medium">perangkat</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-[#10b981]"></span> 3 online
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span> 0 offline
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Tips */}
          <div className="bg-[#f0fdf4] rounded-2xl border border-[#dcfce7] p-6 shadow-sm">
            <div className="flex gap-4">
              <svg className="w-6 h-6 text-[#16a34a] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
              <div>
                <h4 className="text-sm font-bold text-slate-800 mb-1">Tips</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Lakukan pembersihan perangkap secara rutin untuk menjaga efektivitas monitoring.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}