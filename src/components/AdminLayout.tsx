import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const [currentTime, setCurrentTime] = useState("");

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Jam Real-time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB');
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Daftar menu navigasi Sidebar Admin
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg> },
    { name: 'Manajemen Perangkat', path: '/admin/perangkat', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg> },
    { name: 'Manajemen Pengguna', path: '/admin/pengguna', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg> },
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-slate-800 overflow-hidden antialiased">
      
      {/* ================= SIDEBAR KIRI ================= */}
      <aside className="w-[260px] bg-[#f8fafc] flex flex-col justify-between hidden md:flex z-20">
        <div>
          {/* Logo & Brand Admin */}
          <div className="h-24 flex flex-col justify-center px-6 gap-1">
            <div className="flex items-center gap-2">
              {/* GAMBAR LOGO DIPERBARUI KE LogoWeb.png */}
              <img src="/LogoWeb.png" alt="Logo Smart Pest Trap" className="w-8 h-8 object-contain drop-shadow-sm" />
              <span className="font-extrabold text-[#1a365d] text-xl tracking-tight">Smart Pest Trap</span>
            </div>
            <span className="text-[10px] text-blue-500 font-semibold uppercase tracking-wider ml-10">AIoT Pest Monitoring System</span>
          </div>
          
          {/* Menu Navigasi Admin */}
          <nav className="px-4 py-2 space-y-1 mt-2">
            {navItems.map((item) => {
              const isActive = item.path === '/admin' 
                ? location.pathname === '/admin' 
                : location.pathname.includes(item.path);
                
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                    isActive 
                      ? "bg-[#e1effe] text-blue-700 font-bold shadow-sm" 
                      : "text-[#475569] hover:bg-white hover:shadow-sm"
                  }`}
                >
                  {item.icon}
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Tombol Logout Admin */}
        <div className="p-4 mb-4">
            <div className="border-t border-slate-200 mb-4 pt-4 px-2"></div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-[#475569] hover:text-red-600 hover:bg-white hover:shadow-sm rounded-xl transition-all font-medium cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            <span className="text-sm font-bold">Keluar</span>
          </button>
        </div>
      </aside>

      {/* ================= AREA KONTEN KANAN ================= */}
      <div className="flex-1 flex flex-col min-w-0 bg-white rounded-l-[2.5rem] border-l border-slate-200 shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
        
        {/* Top Header Admin */}
        <header className="px-8 pt-8 pb-4 flex justify-between items-start">
           <div>
              <h1 className="text-3xl font-bold text-[#1a365d] tracking-tight">Selamat Datang, Admin</h1>
              <p className="text-slate-500 mt-1.5 text-sm">Berikut adalah ringkasan data sistem Smart Pest Trap.</p>
           </div>
           
           <div className="hidden md:flex gap-6 items-center text-sm font-medium text-slate-500 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
             <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                {formattedDate}
             </div>
             <div className="w-px h-4 bg-slate-300"></div>
             <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {currentTime}
             </div>
           </div>
        </header>

        {/* ================= OUTLET (Konten Admin) ================= */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto px-8 pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}