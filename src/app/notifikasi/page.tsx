import React, { useEffect, useState } from 'react';

export default function NotifikasiPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Notifikasi - Smart Pest Trap";
    fetchNotifications();
  }, []);

  // Fungsi mengambil data notifikasi dari Flask
  const fetchNotifications = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.alerts);
        setUnreadCount(data.unread_count);
      }
    } catch (error) {
      console.error("Gagal memuat notifikasi", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi menandai satu notifikasi telah dibaca
  const handleMarkAsRead = async (id_alert: number) => {
    try {
      const res = await fetch("http://localhost:5000/api/user/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_alert })
      });
      if (res.ok) {
        fetchNotifications(); // Refresh data
      }
    } catch (error) {
      console.error("Gagal memperbarui status notifikasi", error);
    }
  };

  // Fungsi menandai semua notifikasi telah dibaca
  const handleReadAll = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "read_all" })
      });
      if (res.ok) {
        fetchNotifications(); // Refresh data
      }
    } catch (error) {
      console.error("Gagal menandai semua dibaca", error);
    }
  };

  // Konversi waktu ISO ke format Indonesia
  const formatWaktu = (isoString: string) => {
    const date = new Date(isoString);
    const tanggal = date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    const jam = date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    return `${tanggal}, ${jam} WIB`;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      
      {/* ================= 1. HEADER ================= */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Notifikasi</h1>
          <p className="text-slate-500 mt-2 text-sm">Pantau semua peringatan lonjakan hama penting dari perangkat IoT.</p>
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={handleReadAll}
            className="bg-[#148348] hover:bg-green-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            Tandai Semua Dibaca
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ================= 2. KONTEN UTAMA (KIRI) ================= */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          
          {/* Tabs Filter Cepat (Pills) */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-3">
            <button className="bg-[#148348] text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-sm">
              Semua <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{notifications.length}</span>
            </button>
            <button className="bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors">
              Belum Dibaca <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs">{unreadCount}</span>
            </button>
          </div>

          {/* List Notifikasi */}
          <div className="flex flex-col gap-4">
            {isLoading ? (
              <div className="text-center text-slate-500 py-10 animate-pulse text-sm">Memuat notifikasi dari server...</div>
            ) : notifications.length === 0 ? (
              <div className="text-center text-slate-500 py-10 text-sm bg-white rounded-2xl border border-slate-200 p-8">
                Belum ada notifikasi atau peringatan masuk. Lahan Anda aman!
              </div>
            ) : (
              notifications.map((notif) => {
                const isUnread = notif.status_baca === "unread";
                
                return (
                  <div 
                    key={notif.id_alert} 
                    onClick={() => handleMarkAsRead(notif.id_alert)}
                    className={`relative p-5 md:p-6 rounded-2xl border-l-[4px] shadow-sm flex flex-col sm:flex-row gap-5 cursor-pointer group transition-all ${
                      isUnread 
                        ? "bg-[#fffbfb] border-l-red-500 border-y-red-100 border-r-red-100 hover:shadow-md hover:bg-[#fff5f5]" 
                        : "bg-white border-l-[#148348] border-y-slate-200 border-r-slate-200 hover:shadow-md hover:bg-slate-50"
                    }`}
                  >
                    {/* Ikon Kiri */}
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${isUnread ? 'bg-orange-50 text-orange-500' : 'bg-green-50 text-[#148348]'}`}>
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    </div>

                    {/* Teks Konten */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1.5">
                        <h3 className="font-bold text-slate-900 text-base">Peringatan Lonjakan Hama</h3>
                        <span className={`md:hidden px-2.5 py-1 rounded-full text-[10px] font-bold ${isUnread ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>
                          {isUnread ? 'Penting (Belum Dibaca)' : 'Dibaca'}
                        </span>
                      </div>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed mb-4 pr-0 md:pr-12">{notif.pesan_alert}</p>
                      
                      {/* Tanggal */}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                          {formatWaktu(notif.waktu_alert)}
                        </span>
                      </div>
                    </div>

                    {/* Kanan: Badge (Desktop) */}
                    <div className="hidden md:flex flex-col items-end justify-between">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${isUnread ? 'bg-red-100 text-red-600' : 'bg-[#e8f5e9] text-[#148348]'}`}>
                        {isUnread ? 'Penting' : 'Dibaca'}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* ================= 3. PANEL INFORMASI (KANAN) ================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-fit space-y-4">
          <h3 className="font-bold text-slate-900 text-base mb-2">Informasi Sistem Notifikasi</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Sistem otomatis mengirimkan peringatan apabila hasil jepretan kamera ESP32-CAM mendeteksi jumlah hama melampaui batas ambang normal (50 ekor).
          </p>
          <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100 text-xs text-yellow-800 leading-relaxed">
            Klik pada salah satu kartu notifikasi untuk mengubah statusnya menjadi "Sudah Dibaca".
          </div>
        </div>

      </div>
    </div>
  );
}