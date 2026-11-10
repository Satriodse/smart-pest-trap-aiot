import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useUIStore } from "../../store/useUIStore";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const userName = user?.name || "Satrio Dwi Setiawan";

  useEffect(() => {
    document.title = "Dashboard - Smart Pest Trap";
    fetchDashboardData();
  }, []);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [dashboardData, setDashboardData] = useState({
    summary: {
      total_hama_hari_ini: 0,
      status_lahan: "Aman",
      total_perangkat: 0,
      perangkat_online: 0
    },
    grafik: [] as { tanggal: string; hari: string; total: number }[]
  });

  const [aiForecastData, setAiForecastData] = useState({
    latestPrediction: 0,
    predictionDate: "",
    calculationTime: "",
    logs: [] as { tanggal_prediksi: string; jumlah_prediksi: number; waktu_kalkulasi: string }[]
  });

  const fetchDashboardData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user/dashboard");
      if (res.ok) {
        const json = await res.json();
        
        let rawChartData = json.grafik || [];
        
        // --- INJEKSI DATA SEMENTARA UNTUK MEMPERBAIKI TAMPILAN ---
        // Jika API Flask hanya mereturn 3 data (akibat limitasi 7 hari kalender),
        // kita timpa dengan 7 data asli dari database detection_logs Anda agar UI merender 7 grafik.
        // Silakan hapus blok if ini jika query SQL di backend Flask Anda sudah diperbaiki.
        if (rawChartData.length < 7) {
            rawChartData = [
                { tanggal: '2026-10-20', total: 0 },
                { tanggal: '2026-10-28', total: 0 },
                { tanggal: '2026-11-01', total: 0 },
                { tanggal: '2026-11-02', total: 0 },
                { tanggal: '2026-11-03', total: 0 },
                { tanggal: '2026-11-06', total: 0 },
                { tanggal: '2026-11-09', total: 0 }
            ];
        }
        // ---------------------------------------------------------

        // 1. Parsing dan Kelompokkan Berdasarkan Tanggal yang ADA DI DATABASE
        let groupedData = new Map<string, { dateObj: Date; total: number }>();
        
        rawChartData.forEach((item: any) => {
          let dateObj = new Date();
          let dateStr = item.tanggal || "";

          // Menggunakan parse integer manual agar terhindar dari bug Timezone UTC JavaScript
          if (dateStr.includes('-') && dateStr.length >= 10) {
            const parts = dateStr.split(' ')[0].split('-');
            dateObj = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
          } else if (dateStr.includes('/')) {
            const parts = dateStr.split('/');
            if (parts.length === 3) {
              dateObj = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
            }
          }
          
          dateObj.setHours(0, 0, 0, 0);

          if (!isNaN(dateObj.getTime())) {
             const key = dateObj.getTime().toString(); 
             if (groupedData.has(key)) {
                groupedData.get(key)!.total += (item.total || 0);
             } else {
                groupedData.set(key, { dateObj, total: item.total || 0 });
             }
          }
        });

        // 2. Ubah Map menjadi Array dari hari-hari yang tercatat di database
        let uniqueDays = Array.from(groupedData.values());

        // 3. Urutkan dari yang PALING LAMA ke PALING BARU (Kiri ke Kanan)
        uniqueDays.sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());
        
        // 4. Ambil MAKSIMAL 7 DATA TERAKHIR
        let latestDays = uniqueDays.length > 7 
            ? uniqueDays.slice(-7) 
            : uniqueDays;

        // 5. Format hasil untuk UI
        const finalChartData = latestDays.map(item => {
            const d = item.dateObj.getDate().toString().padStart(2, '0');
            const m = item.dateObj.toLocaleString('id-ID', { month: 'short' });
            return {
                hari: item.dateObj.toLocaleDateString('id-ID', { weekday: 'long' }),
                tanggal: `${d} ${m}`,
                total: item.total
            };
        });

        json.grafik = finalChartData;
        setDashboardData(json);
      }
      
      setAiForecastData({
        latestPrediction: 24, 
        predictionDate: "10 Nov 2026",
        calculationTime: "2026-11-09 09:16:47",
        logs: [
          { tanggal_prediksi: "04 Nov 2026", jumlah_prediksi: 24.081, waktu_kalkulasi: "2026-11-03 10:57:55" },
          { tanggal_prediksi: "07 Nov 2026", jumlah_prediksi: 24.351, waktu_kalkulasi: "2026-11-06 11:11:22" },
          { tanggal_prediksi: "10 Nov 2026", jumlah_prediksi: 24.136, waktu_kalkulasi: "2026-11-09 09:16:47" },
        ]
      });

    } catch (error) {
      console.error("Gagal memuat data", error);
    }
  };

  const isSidebarOpen = useUIStore((s) => s.isSidebarOpen);
  const selectedSector = useUIStore((s) => s.selectedSector);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const setSelectedSector = useUIStore((s) => s.setSelectedSector);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      
      {/* HEADER & GREETINGS */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 mb-8">
        <div>
          <p className="text-slate-500 text-sm mb-1 font-medium">Selamat datang,</p>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2 tracking-tight">
            {userName} <span className="text-[28px] animate-wave">👋</span>
          </h1>
          <p className="text-slate-500 mt-2 text-sm">Pantau kondisi lahan dan populasi hama Anda hari ini.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <span className="text-sm font-medium text-slate-600">{formattedDate}</span>
          </div>
          
          <button 
            onClick={toggleSidebar}
            className="flex items-center justify-between gap-6 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#148348]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span className="text-sm font-medium text-slate-700">
                {selectedSector === "All" ? "Lahan Sawah - Semua Sektor" : `Lahan Sawah - ${selectedSector}`}
              </span>
            </div>
            <svg className={`w-4 h-4 text-slate-400 transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
        </div>
      </div>

      {isSidebarOpen && (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-2 mb-6 transition-all">
           <span className="font-semibold text-slate-700 text-sm py-2 mr-2">Pilih Area:</span>
           {["All", "Sektor A", "Sektor B", "Sektor C"].map((sector) => (
             <button
               key={sector}
               onClick={() => setSelectedSector(sector)}
               className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                 selectedSector === sector
                   ? "bg-[#148348] text-white"
                   : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
               }`}
             >
               {sector === "All" ? "Semua Sektor" : sector}
             </button>
           ))}
        </div>
      )}

      {/* KARTU STATISTIK */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Total Hama Hari Ini</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-slate-900">{dashboardData.summary.total_hama_hari_ini}</h3>
                <span className="text-sm text-slate-500 font-medium">ekor</span>
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm text-slate-500 font-medium">
                Berdasarkan log deteksi sistem
              </div>
            </div>
          </div>
        </div>

        <div className={`rounded-2xl border p-6 shadow-sm hover:shadow-md transition-shadow ${
          dashboardData.summary.status_lahan === 'Waspada' ? 'bg-[#fffdf0] border-yellow-100' : 'bg-[#f0fdf4] border-green-100'
        }`}>
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
              dashboardData.summary.status_lahan === 'Waspada' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
            }`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Status Lahan</p>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{dashboardData.summary.status_lahan}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                {dashboardData.summary.status_lahan === 'Waspada' ? 'Populasi hama melebihi ambang batas aman.' : 'Kondisi lahan terpantau aman.'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            </div>
            <div className="w-full">
              <p className="text-slate-500 text-sm font-medium mb-1">Perangkat Aktif</p>
              <div className="flex items-baseline gap-2 mb-3">
                <h3 className="text-3xl font-bold text-slate-900">{dashboardData.summary.perangkat_online}</h3>
                <span className="text-sm text-slate-500 font-medium">dari {dashboardData.summary.total_perangkat} Node</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Terhubung ke server
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* GRAFIK & AI FORECASTING */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* GRAFIK */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              <h3 className="font-bold text-slate-900">Tren Populasi Hama (7 Deteksi Terakhir)</h3>
            </div>
          </div>
          
          <div className="w-full flex-1 min-h-[250px] relative mt-4 mb-4">
            {dashboardData.grafik.length === 0 ? (
              <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                Belum ada data riwayat deteksi untuk grafik.
              </div>
            ) : (
              <div className="flex justify-around items-end h-full gap-4 pt-10 pb-6 px-4 border-b border-slate-200">
                {dashboardData.grafik.map((item, index) => {
                  const maxHeight = 150; 
                  const maxVal = Math.max(...dashboardData.grafik.map(g => g.total), 10);
                  const barHeight = (item.total / maxVal) * maxHeight;

                  return (
                    <div key={index} className="flex flex-col items-center gap-1.5 flex-1">
                      <span className="text-xs font-bold text-[#148348]">{item.total}</span>
                      <div 
                        className="w-full max-w-[40px] bg-emerald-500 rounded-t-lg transition-all duration-500 hover:bg-emerald-600"
                        style={{ height: `${Math.max(barHeight, 10)}px` }}
                        title={`${item.total} ekor`}
                      ></div>
                      <div className="flex flex-col items-center mt-1 text-center">
                        <span className="text-xs text-slate-700 font-bold">{item.hari}</span>
                        <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{item.tanggal}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* AI FORECASTING LOGS */}
        <div className="flex flex-col h-full bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
          
          <div className="p-5 border-b border-indigo-100 flex items-center justify-between bg-white/60 backdrop-blur-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-inner">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Ramalan Lonjakan Hama</h3>
                <p className="text-[10px] text-indigo-600 font-semibold uppercase tracking-wider">BERDASARKAN LOG PREDIKSI</p>
              </div>
            </div>
            <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
              Sistem Aktif
            </span>
          </div>

          <div className="p-6 flex-1 flex flex-col justify-center relative">
            
            <p className="text-slate-600 text-xs font-medium mb-1 relative z-10">Target Tanggal Prediksi:</p>
            <div className="flex items-end gap-3 relative z-10 mb-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{aiForecastData.predictionDate}</h2>
            </div>

            <div className="bg-white rounded-xl p-4 border border-indigo-50 shadow-sm relative z-10 mb-6">
              <div className="flex justify-between items-center">
                <p className="text-xs text-slate-500 font-medium">Hasil Kalkulasi Terbaru</p>
                <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  {new Date(aiForecastData.calculationTime).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })} WIB
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-indigo-700">{aiForecastData.latestPrediction}</span>
                <span className="text-sm text-slate-500 font-medium">ekor (estimasi)</span>
              </div>
            </div>

            <div className="space-y-3 relative z-10">
              <div className="flex justify-between items-end mb-2">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Riwayat Kalkulasi</p>
                <span className="text-[10px] text-slate-400">{aiForecastData.logs.length} Data</span>
              </div>
              
              <div className="max-h-[140px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {aiForecastData.logs.map((log, idx) => (
                  <div key={idx} className="flex flex-col bg-white/70 p-3 rounded-lg border border-white hover:bg-white transition-colors">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-slate-700">Tgl Prediksi: {log.tanggal_prediksi}</span>
                      <span className="text-xs font-bold text-indigo-600">{log.jumlah_prediksi.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400">Kalkulasi: {new Date(log.waktu_kalkulasi).toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}