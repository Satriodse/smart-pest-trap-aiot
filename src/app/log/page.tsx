import React, { useEffect, useState } from 'react';

export default function LogHamaPage() {
  // State untuk menyimpan data dari database
  const [logs, setLogs] = useState<any[]>([]);
  const [stats, setStats] = useState({ total_hama_3_hari: 0, status: "Aman" });
  const [isLoading, setIsLoading] = useState(true);
  
  // State untuk Popup/Modal Gambar
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // === State & Variabel untuk Pagination ===
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  
  // Hitung total halaman berdasarkan jumlah data
  const totalPages = Math.ceil(logs.length / ITEMS_PER_PAGE);
  
  // Potong array log untuk mendapatkan data khusus halaman saat ini
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentLogs = logs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    document.title = "Log Hama - Smart Pest Trap";
    fetchLogs();
  }, []);

  // Fungsi Fetch Data dari Backend Flask
  const fetchLogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user/logs");
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs);
        setStats({
          total_hama_3_hari: data.total_hama_3_hari,
          status: data.status
        });
      }
    } catch (error) {
      console.error("Gagal mengambil data log", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi konversi waktu ISO dari database ke format Bahasa Indonesia
  const formatWaktu = (isoString: string) => {
    const date = new Date(isoString);
    const hari = date.toLocaleDateString("id-ID", { weekday: "long" });
    const tanggal = date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    const jam = date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    return `${hari}, ${tanggal} - ${jam} WIB`;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in relative">
      
      {/* ================= 1. HEADER ================= */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Log Hama</h1>
        <p className="text-slate-500 mt-2 text-sm">Riwayat hasil deteksi hama dari perangkat ESP32-CAM di lahan Anda (3 Hari Terakhir).</p>
      </div>

      {/* ================= 2. FILTER BAR (UI Statis) ================= */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-2">
        
        {/* Filter Tanggal */}
        <div className="flex-1 flex items-center justify-between px-4 py-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors border-r border-transparent md:border-slate-100">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <div>
              <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Tanggal</p>
              <p className="text-sm font-medium text-slate-700">3 Hari Terakhir</p>
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

      {/* ================= 3. KONTEN UTAMA ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* === KOLOM KIRI: Daftar Log Hama dari Database === */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          
          {/* Header Tabel */}
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white">
            <h3 className="font-bold text-slate-800 text-sm">
              Total Log Hama: <span className="text-slate-500 font-medium">{logs.length} data</span>
            </h3>
            <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
              <span>Urutkan:</span>
              <button className="flex items-center gap-2 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50">
                Terbaru
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
            </div>
          </div>

          {/* List Data Hama (Menggunakan currentLogs yang sudah dipotong) */}
          <div className="flex-1 overflow-y-auto min-h-[400px]">
            {isLoading ? (
              <div className="text-center text-slate-500 text-sm py-10 animate-pulse">Memuat log dari database...</div>
            ) : currentLogs.length === 0 ? (
              <div className="text-center text-slate-500 text-sm py-10">Belum ada deteksi dalam 3 hari terakhir.</div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {currentLogs.map((log) => (
                  <li 
                    key={log.id_log} 
                    onClick={() => setSelectedImage(log.image_url)}
                    className="p-5 hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-5">
                      {/* Thumbnail Gambar Database */}
                      <div className="w-16 h-16 rounded-xl bg-slate-200 border border-slate-200 flex-shrink-0 flex items-center justify-center overflow-hidden relative">
                        <img 
                          src={log.image_url} 
                          alt="Thumbnail ESP32" 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/150?text=No+Image" }}
                        />
                      </div>
                      
                      {/* Info Deteksi */}
                      <div>
                        <h4 className="font-bold text-slate-900 text-base mb-1">Deteksi Hama</h4>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs font-medium text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            {log.node_id}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Kanan: Tanggal & Badge Ekor */}
                    <div className="flex items-center gap-6">
                      <span className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        {formatWaktu(log.timestamp)}
                      </span>
                      <div className="bg-green-50 border border-green-100 text-[#148348] px-3 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap min-w-[75px] text-center">
                        {log.pest_count} ekor
                      </div>
                      <svg className="w-5 h-5 text-slate-300 group-hover:text-slate-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Pagination UI Dinamis */}
          {totalPages > 1 && (
            <div className="p-5 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Menampilkan <span className="font-bold text-slate-700">{startIndex + 1}</span> hingga <span className="font-bold text-slate-700">{Math.min(startIndex + ITEMS_PER_PAGE, logs.length)}</span> dari total <span className="font-bold text-slate-700">{logs.length}</span> data
              </p>
              
              <div className="flex items-center gap-2 ml-auto sm:ml-0">
                {/* Tombol Sebelumnya */}
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-white hover:text-slate-700 hover:shadow-sm disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all"
                  aria-label="Halaman sebelumnya"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                
                {/* Indikator Halaman (contoh: "1 / 3") */}
                <div className="px-3 h-9 flex items-center justify-center rounded-lg bg-white border border-slate-200 shadow-sm text-sm font-bold text-slate-700">
                  {currentPage} <span className="mx-1 text-slate-400 font-medium">/</span> {totalPages}
                </div>

                {/* Tombol Selanjutnya */}
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-white hover:text-slate-700 hover:shadow-sm disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all"
                  aria-label="Halaman selanjutnya"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* === KOLOM KANAN: Panel Statistik === */}
        <div className="space-y-6">
          
          {/* Card 1: Total Hama Terdeteksi */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 text-[#148348] flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
              </div>
              <div>
                <p className="text-slate-600 text-sm font-semibold mb-1">Total (3 Hari)</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-extrabold text-slate-900">{stats.total_hama_3_hari}</h3>
                  <span className="text-sm text-slate-500 font-medium">ekor</span>
                </div>
                <div className="flex items-center gap-1.5 mt-2 text-xs font-medium">
                  <span className="text-slate-400">Akumulasi tangkapan IoT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Status Lahan Dinamis */}
          <div className={`rounded-2xl border p-6 shadow-sm ${stats.status === 'Waspada' ? 'bg-[#fffdf0] border-yellow-200' : 'bg-white border-slate-200'}`}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${stats.status === 'Waspada' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-50 text-[#148348]'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
              </div>
              <div>
                <p className="text-slate-600 text-sm font-semibold mb-1">Status Lahan</p>
                <h3 className={`text-2xl font-extrabold mb-1.5 tracking-tight ${stats.status === 'Waspada' ? 'text-yellow-700' : 'text-[#148348]'}`}>
                  {stats.status}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {stats.status === 'Waspada' ? 'Populasi hama melebihi batas aman.' : 'Populasi hama terpantau normal.'}
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Tips */}
          <div className="bg-[#f0fdf4] rounded-2xl border border-[#dcfce7] p-6 shadow-sm">
            <div className="flex gap-4">
              <svg className="w-6 h-6 text-[#16a34a] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
              <div>
                <h4 className="text-sm font-bold text-slate-800 mb-1">Tips</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pastikan koneksi internet ESP32-CAM stabil agar proses upload foto ke server tidak terputus.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ================= 4. MODAL IMAGE VIEWER ================= */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl max-w-3xl w-full">
            {/* Tombol Tutup (X) */}
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-slate-900/50 hover:bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            <div className="p-2 bg-black">
              <img 
                src={selectedImage} 
                alt="Tangkapan ESP32-CAM" 
                className="w-full h-auto max-h-[75vh] object-contain rounded-xl" 
                onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/800x600?text=Gambar+Tidak+Ditemukan" }}
              />
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-center">
              <p className="text-sm font-semibold text-slate-600">Bukti visual tangkapan kamera AI</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}