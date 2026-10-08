import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
// Impor TanStack Query & UI Store dari kode asli Anda
import { useAddPestMutation, usePestsQuery } from "../../hooks/usePestQuery";
import { useUIStore } from "../../store/useUIStore";

export default function DashboardPage() {
  // 1. ================= LOGIKA AUTENTIKASI =================
  const user = useAuthStore((state) => state.user);
  const userName = user?.name || "Satrio Dwi Setiawan";

  useEffect(() => {
    document.title = "Dashboard - Smart Pest Trap";
  }, []);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // 2. ================= LOGIKA DATA HAMA (KODE ASLI) =================
  const isSidebarOpen = useUIStore((s) => s.isSidebarOpen);
  const selectedSector = useUIStore((s) => s.selectedSector);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const setSelectedSector = useUIStore((s) => s.setSelectedSector);

  const { data: pests, isLoading, isError, error } = usePestsQuery();
  const addMutation = useAddPestMutation();

  const [speciesInput, setSpeciesInput] = useState("");

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!speciesInput) return;
    addMutation.mutate({
      species: speciesInput,
      count: (window.crypto.getRandomValues(new Uint32Array(1))[0] % 50) + 10,
      location: selectedSector === "All" ? "Sektor A" : selectedSector,
    });
    setSpeciesInput("");
  };

  const filteredPests = pests?.filter((p) =>
    selectedSector === "All" ? true : p.location === selectedSector
  );

  // Menghitung total hama untuk UI Statistik
  const totalPestsCount = filteredPests?.reduce((acc, curr) => acc + curr.count, 0) || 120;


  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      
      {/* ================= 1. HEADER & GREETINGS ================= */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 mb-8">
        <div>
          <p className="text-slate-500 text-sm mb-1 font-medium">Selamat datang,</p>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2 tracking-tight">
            {userName} <span className="text-[28px] animate-wave">👋</span>
          </h1>
          <p className="text-slate-500 mt-2 text-sm">Pantau kondisi lahan dan populasi hama Anda hari ini.</p>
        </div>
        
        {/* Pills Tanggal & Lokasi (Sekarang terhubung dengan State Sektor!) */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <span className="text-sm font-medium text-slate-600">{formattedDate}</span>
          </div>
          
          {/* Tombol Filter Lokasi (Menggantikan fungsi Toggle Sidebar Asli) */}
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

      {/* ================= PANEL FILTER SEKTOR (Tersembunyi by default) ================= */}
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

      {/* ================= 2. KARTU STATISTIK (3 Kolom) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Card 1: Total Hama (Dinamis dari Data) */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Total Hama Terdeteksi</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-slate-900">{isLoading ? "..." : totalPestsCount}</h3>
                <span className="text-sm text-slate-500 font-medium">ekor</span>
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm">
                {totalPestsCount > 100 ? (
                  <><svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                  <span className="text-red-500 font-bold">12%</span><span className="text-slate-400">naik</span></>
                ) : (
                  <><span className="text-green-500 font-bold">Stabil</span></>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Status Lahan */}
        <div className="bg-[#fffdf0] rounded-2xl border border-yellow-100 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Status Lahan</p>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Waspada</h3>
              <p className="text-slate-500 text-xs leading-relaxed">Populasi hama meningkat di sektor tertentu.</p>
            </div>
          </div>
        </div>

        {/* Card 3: Perangkat Aktif */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            </div>
            <div className="w-full">
              <p className="text-slate-500 text-sm font-medium mb-1">Perangkat Aktif</p>
              <div className="flex items-baseline gap-2 mb-3">
                <h3 className="text-3xl font-bold text-slate-900">3</h3>
                <span className="text-sm text-slate-500 font-medium">ESP32-CAM</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> 3 Online
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ================= 3. GRAFIK & DAFTAR LOG HAMA ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kiri: Grafik Tren (UI) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              <h3 className="font-bold text-slate-900">Tren Populasi Hama</h3>
            </div>
          </div>
          
          <div className="flex gap-6 mb-6 px-4">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span> Wereng Coklat
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]"></span> Penggerek Batang
            </div>
          </div>

          <div className="w-full flex-1 min-h-[250px] relative mt-4 mb-4">
            <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-slate-400 font-medium">
              <span>200</span><span>150</span><span>100</span><span>50</span><span>0</span>
            </div>
            <div className="absolute left-8 right-0 top-2 bottom-8 border-b border-slate-200">
              <div className="absolute w-full border-t border-slate-100 top-[0%]"></div>
              <div className="absolute w-full border-t border-slate-100 top-[25%]"></div>
              <div className="absolute w-full border-t border-slate-100 top-[50%]"></div>
              <div className="absolute w-full border-t border-slate-100 top-[75%]"></div>
              
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <path fill="none" stroke="#8b5cf6" strokeWidth="2" d="M 0,150 C 50,140 100,135 150,135 S 250,140 300,130 S 400,135 500,120 S 600,130 650,120" />
                <circle cx="0" cy="150" r="4" fill="#8b5cf6" stroke="white" strokeWidth="2" />
                <circle cx="130" cy="140" r="4" fill="#8b5cf6" stroke="white" strokeWidth="2" />
                <circle cx="260" cy="130" r="4" fill="#8b5cf6" stroke="white" strokeWidth="2" />
                <circle cx="390" cy="135" r="4" fill="#8b5cf6" stroke="white" strokeWidth="2" />
                <circle cx="520" cy="115" r="4" fill="#8b5cf6" stroke="white" strokeWidth="2" />
                <circle cx="650" cy="120" r="4" fill="#8b5cf6" stroke="white" strokeWidth="2" />

                <path fill="none" stroke="#10b981" strokeWidth="2" d="M 0,120 C 50,100 100,60 150,55 S 250,75 300,75 S 400,45 500,60 S 600,40 650,30" />
                <circle cx="0" cy="120" r="4" fill="#10b981" stroke="white" strokeWidth="2" />
                <circle cx="130" cy="95" r="4" fill="#10b981" stroke="white" strokeWidth="2" />
                <circle cx="260" cy="60" r="4" fill="#10b981" stroke="white" strokeWidth="2" />
                <circle cx="390" cy="80" r="4" fill="#10b981" stroke="white" strokeWidth="2" />
                <circle cx="520" cy="40" r="4" fill="#10b981" stroke="white" strokeWidth="2" />
                <circle cx="650" cy="65" r="4" fill="#10b981" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            <div className="absolute left-8 right-0 bottom-0 flex justify-between text-xs text-slate-400 font-medium translate-y-full pt-3">
              <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span>
            </div>
          </div>
        </div>

        {/* Kanan: Input Form & Daftar Hama (Dari Kode Asli) */}
        <div className="space-y-6 flex flex-col">
          
          {/* Form Tambah Hama */}
          <form onSubmit={handleAddSubmit} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <svg className="w-4 h-4 text-[#148348]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              Input Data Manual
            </h3>
            <input
              type="text"
              placeholder="Spesies (cth: Wereng)"
              value={speciesInput}
              onChange={(e) => setSpeciesInput(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[#148348]"
              required
            />
            <button
              type="submit"
              disabled={addMutation.isPending}
              className="w-full bg-[#148348] hover:bg-green-800 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-70"
            >
              {addMutation.isPending ? "Menyimpan..." : "Tambah Log"}
            </button>
          </form>

          {/* Daftar Hama (TanStack Query Data) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
               <h3 className="font-bold text-slate-800 text-sm">Log Pendeteksian Server</h3>
               <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded-md font-bold">{filteredPests?.length || 0} Data</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 max-h-[250px]">
              {isLoading && <div className="text-center p-4 text-sm text-slate-500 animate-pulse">Memuat data dari server...</div>}
              {isError && <div className="text-center p-4 text-sm text-red-500">Error: {(error as Error).message}</div>}
              
              {filteredPests?.length === 0 && (
                <div className="text-center p-6 text-sm text-slate-500">Belum ada data hama di sektor ini.</div>
              )}

              <ul className="space-y-1">
                {filteredPests?.map((pest) => (
                  <li key={pest.id} className="p-3 rounded-xl hover:bg-slate-50 transition-colors flex justify-between items-center border border-transparent hover:border-slate-100">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{pest.species}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{pest.detectedAt}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-[#148348] text-lg">{pest.count}</span>
                      <span className="text-xs text-slate-500 ml-1">ekor</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}