import React, { useState, useEffect } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { usePestsQuery, useAddPestMutation } from '@/hooks/usePestQuery';

export default function DashboardPage() {
  useEffect(() => {
    document.title = "Dashboard Petani - Smart Pest Trap";
  }, []);

  const isSidebarOpen = useUIStore((s) => s.isSidebarOpen);
  const selectedSector = useUIStore((s) => s.selectedSector);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const setSelectedSector = useUIStore((s) => s.setSelectedSector);

  const { data: pests, isLoading, isError, error } = usePestsQuery();
  const addMutation = useAddPestMutation();

  const [speciesInput, setSpeciesInput] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!speciesInput) return;
    addMutation.mutate({
      species: speciesInput,
      count: Math.floor(Math.random() * 50) + 10,
      location: selectedSector === 'All' ? 'Sektor A' : selectedSector,
    });
    setSpeciesInput('');
  };

  const filteredPests = pests?.filter((p) => 
    selectedSector === 'All' ? true : p.location === selectedSector
  );

  return (
    <div className="flex flex-col md:flex-row w-full flex-1 bg-slate-50 min-h-[80vh]">
      
      {/* PENGEMBALIAN SIDEBAR HIJAU DENGAN ARIA LABEL */}
      <aside 
        className="w-full md:w-64 md:flex-shrink-0 bg-green-800 text-slate-100 flex flex-col shadow-lg z-10"
        aria-label="Navigasi Utama Dashboard"
      >
        <div className="p-6 border-b border-green-700">
          <h2 className="text-xl font-bold text-white">Dashboard Petani</h2>
          <p className="text-xs text-green-300 mt-1">Pemantauan Lahan</p>
        </div>
        <nav className="flex-1 py-4" aria-label="Menu Dasbor">
          <ul className="space-y-1 px-3">
            <li>
              <button 
                className="w-full text-left px-4 py-3 rounded-lg transition-colors font-medium bg-green-600 text-white shadow-sm"
                aria-current="page"
              >
                Ringkasan Lahan
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* KONTEN UTAMA DASHBOARD */}
      <div className="flex-1 min-w-0 p-4 md:p-6 lg:p-10 flex flex-col">
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          {/* TOMBOL TOGGLE DENGAN ARIA CONTROLS & EXPANDED UNTUK SCREEN READER */}
          <button 
            onClick={toggleSidebar} 
            className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
            aria-expanded={isSidebarOpen}
            aria-controls="filterSidebar"
            aria-label={isSidebarOpen ? "Tutup panel filter sektor lahan" : "Buka panel filter sektor lahan"}
          >
            {isSidebarOpen ? 'Sembunyikan Filter' : 'Tampilkan Filter'}
          </button>
          <h2 className="text-xl font-bold text-slate-800 text-right md:text-left">
            Manajemen Hama & Server State (TanStack Query)
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Kotak Filter Sektor Lahan DENGAN ID UNTUK ARIA-CONTROLS */}
          {isSidebarOpen && (
            <aside 
              id="filterSidebar" 
              className="w-full lg:w-64 p-5 bg-white rounded-xl border border-slate-200 shadow-sm h-fit flex-shrink-0"
              aria-label="Filter Sektor Lahan"
            >
              <h3 className="font-semibold text-slate-700 mb-3 text-sm uppercase tracking-wider">Filter Sektor Lahan</h3>
              {['All', 'Sektor A', 'Sektor B', 'Sektor C'].map((sector) => (
                <button
                  key={sector}
                  onClick={() => setSelectedSector(sector)}
                  className={`block w-full text-left px-3 py-2 rounded-lg mb-1 text-sm font-medium transition-colors ${
                    selectedSector === sector ? 'bg-green-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                  aria-pressed={selectedSector === sector}
                >
                  {sector === 'All' ? 'Semua Sektor' : sector}
                </button>
              ))}
            </aside>
          )}

          {/* Kolom Daftar Hama */}
          <main className="flex-1 space-y-6" aria-label="Area Utama Pengelolaan Hama">
            <form 
              onSubmit={handleAddSubmit} 
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3"
              aria-label="Formulir Tambah Log Hama"
            >
              <input 
                type="text" 
                placeholder="Nama Spesies Hama..." 
                value={speciesInput} 
                onChange={(e) => setSpeciesInput(e.target.value)} 
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Input Nama Spesies Hama"
                required
              />
              <button 
                type="submit" 
                disabled={addMutation.isPending} 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg text-sm transition-colors disabled:opacity-70 flex-shrink-0"
                aria-busy={addMutation.isPending}
              >
                {addMutation.isPending ? 'Menyimpan...' : '+ Tambah Log Hama'}
              </button>
            </form>

            {isLoading && (
              <div 
                className="p-6 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl text-center font-medium animate-pulse"
                role="status"
              >
                Memuat data log server secara asinkron...
              </div>
            )}

            {isError && (
              <div 
                className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-xl"
                role="alert"
              >
                Terjadi Kesalahan Server: {(error as Error).message}
              </div>
            )}

            {filteredPests && filteredPests.length === 0 && (
              <div className="p-6 bg-slate-50 border border-slate-200 text-slate-500 rounded-xl text-center">
                Tidak ada data hama yang ditemukan pada filter ini.
              </div>
            )}

            {filteredPests && filteredPests.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 bg-slate-50 border-b font-semibold text-slate-700 text-sm">
                  Daftar Deteksi Hama (Server State Cache)
                </div>
                <ul className="divide-y divide-slate-100" aria-label="Daftar Hama">
                  {filteredPests.map((pest) => (
                    <li key={pest.id} className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                      <div>
                        <span className="font-bold text-slate-800">{pest.species}</span>
                        <span className="ml-3 text-xs bg-green-100 text-green-800 px-2.5 py-1 rounded-full font-semibold">
                          {pest.location}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-slate-900 text-lg">{pest.count}</span> 
                        <span className="text-xs text-slate-500 ml-1">ekor</span>
                        <span className="block text-xs text-slate-400">{pest.detectedAt}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}