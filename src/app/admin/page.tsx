import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AdminPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin Dashboard - Smart Pest Trap";
  }, []);

  // Menentukan tab aktif berdasarkan Route URL
  let activeTab = 'dashboard';
  if (location.pathname.endsWith('/perangkat')) activeTab = 'perangkat';
  if (location.pathname.endsWith('/pengguna')) activeTab = 'pengguna';

  // State Perangkat
  const [devices, setDevices] = useState([
    { id: 1, name: "Perangkat A", mac: "A4:C1:38:1A:2B", location: "Sektor A", status: "Online", lastActive: "23 Jun 2025\n10:20 WIB" },
    { id: 2, name: "Perangkat B", mac: "A4:C1:38:1A:2C", location: "Sektor B", status: "Online", lastActive: "23 Jun 2025\n10:18 WIB" },
    { id: 3, name: "Perangkat C", mac: "A4:C1:38:1A:2D", location: "Sektor C", status: "Online", lastActive: "23 Jun 2025\n10:16 WIB" },
    { id: 4, name: "Perangkat D", mac: "A4:C1:38:1A:2E", location: "Sektor D", status: "Offline", lastActive: "22 Jun 2025\n16:42 WIB" },
  ]);
  const [deviceForm, setDeviceForm] = useState({ mac: "", location: "" });

  // State Pengguna
  const [users, setUsers] = useState([
    { id: 1, name: "Satrio Dwi Setiawan", email: "admin@gmail.com", role: "Admin" },
    { id: 2, name: "Budi Santoso", email: "petani@gmail.com", role: "User" },
  ]);
  const [userForm, setUserForm] = useState({ name: "", email: "", role: "User" });

  // FUNGSI MANAJEMEN PERANGKAT
  const handleAddDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deviceForm.mac) return;
    const newId = devices.length + 1;
    setDevices([
      ...devices,
      {
        id: newId,
        name: `Perangkat Node ${newId}`,
        mac: deviceForm.mac,
        location: deviceForm.location || "Belum diatur",
        status: "Online",
        lastActive: "Baru saja\nDitambahkan",
      },
    ]);
    setDeviceForm({ mac: "", location: "" });
  };
  const deleteDevice = (id: number) => setDevices(devices.filter((d) => d.id !== id));

  // FUNGSI MANAJEMEN PENGGUNA
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userForm.name || !userForm.email) return;
    setUsers([...users, { id: Date.now(), ...userForm }]);
    setUserForm({ name: "", email: "", role: "User" });
  };
  const deleteUser = (id: number) => setUsers(users.filter((u) => u.id !== id));

  // Ringkasan Statistik
  const onlineDevices = devices.filter(d => d.status === "Online").length;
  const offlineDevices = devices.length - onlineDevices;

  // TABEL PERANGKAT (Komponen Reusable agar tidak duplikat kode)
  const TableDaftarPerangkat = ({ showPagination = false }) => (
    <div className="overflow-x-auto w-full flex-1">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="bg-[#f8fafc] text-xs font-bold text-[#1a365d] border-y border-slate-100">
            <th className="px-6 py-4 whitespace-nowrap">Nama Perangkat</th>
            <th className="px-6 py-4 whitespace-nowrap">MAC Address</th>
            <th className="px-6 py-4 whitespace-nowrap">Lokasi Lahan</th>
            <th className="px-6 py-4 whitespace-nowrap">Status Koneksi</th>
            <th className="px-6 py-4 whitespace-nowrap">Terakhir Aktif</th>
            <th className="px-6 py-4 whitespace-nowrap text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm">
          {devices.map((device) => (
            <tr key={device.id} className="hover:bg-slate-50 transition-colors group">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                   <div className="w-9 h-9 rounded-full bg-[#f1f5f9] text-[#475569] flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                   </div>
                   <div>
                     <p className="font-bold text-[#1a365d]">{device.name}</p>
                     <p className="text-[11px] text-slate-400 font-medium">ID: DEV-00{device.id}</p>
                   </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-blue-600 font-mono text-xs font-medium">{device.mac}</td>
              <td className="px-6 py-4 whitespace-nowrap text-slate-600 font-medium">{device.location}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border ${
                  device.status === 'Online' ? 'bg-[#f0fdf4] text-green-700 border-green-100' : 'bg-[#fff5f5] text-red-600 border-red-100'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${device.status === 'Online' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  {device.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500 leading-relaxed font-medium">
                {device.lastActive.split('\n').map((line, i) => <div key={i}>{line}</div>)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-8 h-8 rounded-lg border border-blue-200 text-blue-600 flex items-center justify-center hover:bg-blue-50 transition-colors" title="Edit">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                  </button>
                  <button onClick={() => deleteDevice(device.id)} className="w-8 h-8 rounded-lg border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 transition-colors" title="Hapus">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {devices.length === 0 && (
            <tr><td colSpan={6} className="px-6 py-10 text-center text-slate-500 text-sm">Belum ada perangkat terdaftar.</td></tr>
          )}
        </tbody>
      </table>

      {/* Pagination Footer */}
      {showPagination && devices.length > 0 && (
        <div className="p-4 border-t border-slate-100 flex justify-between items-center bg-white">
          <span className="text-xs text-slate-500 font-medium">Menampilkan 1-{devices.length} dari {devices.length} perangkat</span>
          <div className="flex gap-2">
             <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 disabled:opacity-50" disabled>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
             </button>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm shadow-sm">1</button>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 disabled:opacity-50" disabled>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
             </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      
      {/* TAMPILAN DASHBOARD (DEFAULT /admin) */}
      {activeTab === 'dashboard' && (
        <>
          {/* 4 Kartu Statistik */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div className="bg-[#f8fafc] rounded-2xl border border-slate-100 p-6 flex items-start gap-4 hover:border-blue-200 transition-colors cursor-pointer" onClick={() => navigate('/admin/perangkat')}>
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <div>
                <p className="text-[#1a365d] text-xs font-bold mb-1">Total Perangkat</p>
                <h3 className="text-3xl font-extrabold text-[#1a365d] mb-1">{devices.length}</h3>
                <p className="text-[11px] text-slate-500">Node terdaftar</p>
              </div>
            </div>

            <div className="bg-[#f0fdf4] rounded-2xl border border-green-100 p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-green-200 text-green-700 flex items-center justify-center flex-shrink-0">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.906 14.142 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path></svg>
              </div>
              <div>
                <p className="text-[#1a365d] text-xs font-bold mb-1">Perangkat Online</p>
                <h3 className="text-3xl font-extrabold text-[#1a365d] mb-1">{onlineDevices}</h3>
                <p className="text-[11px] text-slate-500">Terhubung ke server</p>
              </div>
            </div>

            <div className="bg-[#fff5f5] rounded-2xl border border-red-100 p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-500 flex items-center justify-center flex-shrink-0">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"></path></svg>
              </div>
              <div>
                <p className="text-[#1a365d] text-xs font-bold mb-1">Perangkat Offline</p>
                <h3 className="text-3xl font-extrabold text-[#1a365d] mb-1">{offlineDevices}</h3>
                <p className="text-[11px] text-slate-500">Tidak terhubung</p>
              </div>
            </div>

            <div className="bg-[#f8fafc] rounded-2xl border border-slate-100 p-6 flex items-start gap-4 hover:border-blue-200 transition-colors cursor-pointer" onClick={() => navigate('/admin/pengguna')}>
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
              </div>
              <div>
                <p className="text-[#1a365d] text-xs font-bold mb-1">Total Pengguna</p>
                <h3 className="text-3xl font-extrabold text-[#1a365d] mb-1">{users.length}</h3>
                <p className="text-[11px] text-slate-500">Akun terdaftar</p>
              </div>
            </div>
          </div>

          {/* Tabel Perangkat Lebar Penuh (Dashboard) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-6">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-[#e1effe] text-blue-700 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                 </div>
                 <div>
                   <h3 className="text-lg font-bold text-[#1a365d]">Daftar Perangkat</h3>
                   <p className="text-xs text-slate-500 mt-0.5">Kelola dan pantau seluruh perangkat ESP32-CAM yang terdaftar pada sistem.</p>
                 </div>
              </div>
              
              {/* TOMBOL NAVIGASI KE MANAJEMEN PERANGKAT */}
              <button 
                onClick={() => navigate('/admin/perangkat')} 
                className="bg-[#1c64f2] hover:bg-blue-700 text-white font-semibold text-sm px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
                Tambah Perangkat
              </button>
            </div>
            
            {/* Panggil komponen tabel */}
            <TableDaftarPerangkat showPagination={true} />
          </div>
        </>
      )}

      {/* TAMPILAN MANAJEMEN PERANGKAT (/admin/perangkat) */}
      {activeTab === 'perangkat' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
          {/* Form Registrasi (Kiri) */}
          <div className="xl:col-span-1">
             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-fit sticky top-6">
               <h2 className="text-lg font-bold text-[#1a365d] mb-1">Registrasi Node Baru</h2>
               <p className="text-xs text-slate-500 mb-6">Daftarkan MAC Address ESP32-CAM baru.</p>
               
               <form onSubmit={handleAddDevice} className="space-y-4">
                 <div>
                   <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">MAC Address *</label>
                   <input
                     type="text"
                     placeholder="Contoh: A4:C1:38:1A:2B"
                     value={deviceForm.mac}
                     onChange={(e) => setDeviceForm({ ...deviceForm, mac: e.target.value })}
                     className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 uppercase"
                     required
                   />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Lokasi Lahan</label>
                   <input
                     type="text"
                     placeholder="Contoh: Sektor E"
                     value={deviceForm.location}
                     onChange={(e) => setDeviceForm({ ...deviceForm, location: e.target.value })}
                     className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50"
                   />
                 </div>
                 <button type="submit" className="w-full bg-[#1c64f2] hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm transition-colors mt-2 shadow-sm flex items-center justify-center gap-2">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
                   Simpan Perangkat
                 </button>
               </form>
             </div>
          </div>

          {/* Tabel Perangkat (Kanan) */}
          <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-[#e1effe] text-blue-700 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                 </div>
                 <div>
                   <h3 className="text-lg font-bold text-[#1a365d]">Daftar Perangkat</h3>
                   <p className="text-xs text-slate-500 mt-0.5">Kelola perangkat terdaftar.</p>
                 </div>
              </div>
            </div>
            
            <TableDaftarPerangkat showPagination={false} />
          </div>
        </div>
      )}

      {/* TAMPILAN MANAJEMEN PENGGUNA (/admin/pengguna) */}
      {activeTab === 'pengguna' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
          <div className="xl:col-span-1">
             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-fit sticky top-6">
               <h2 className="text-lg font-bold text-[#1a365d] mb-1">Tambah Akun Baru</h2>
               <p className="text-xs text-slate-500 mb-6">Buat akun untuk petani atau admin lain.</p>
               
               <form onSubmit={handleAddUser} className="space-y-4">
                 <div>
                   <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Nama Lengkap *</label>
                   <input
                     type="text"
                     value={userForm.name}
                     onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                     className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50"
                     required
                   />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Email *</label>
                   <input
                     type="email"
                     value={userForm.email}
                     onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                     className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50"
                     required
                   />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Hak Akses (Role)</label>
                   <select
                     value={userForm.role}
                     onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                     className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50"
                   >
                     <option value="User">Petani (User)</option>
                     <option value="Admin">Administrator</option>
                   </select>
                 </div>
                 <button type="submit" className="w-full bg-[#1a365d] hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-sm transition-colors mt-2 shadow-sm flex items-center justify-center gap-2">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                   Simpan Akun
                 </button>
               </form>
             </div>
          </div>

          <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                 </div>
                 <div>
                   <h3 className="text-lg font-bold text-[#1a365d]">Daftar Pengguna</h3>
                   <p className="text-xs text-slate-500 mt-0.5">Kelola akun yang dapat mengakses sistem.</p>
                 </div>
              </div>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-[#f8fafc] text-[11px] font-bold text-[#1a365d] uppercase tracking-wider border-y border-slate-100">
                    <th className="px-6 py-4 whitespace-nowrap">Nama & Email</th>
                    <th className="px-6 py-4 whitespace-nowrap">Role</th>
                    <th className="px-6 py-4 whitespace-nowrap text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                           <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 text-xs font-bold uppercase">
                              {u.name.charAt(0)}
                           </div>
                           <div>
                             <p className="font-bold text-[#1a365d] text-sm">{u.name}</p>
                             <p className="text-xs text-slate-500 font-medium">{u.email}</p>
                           </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-[10px] rounded-md font-bold uppercase tracking-wider ${
                          u.role === "Admin" ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-600"
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => deleteUser(u.id)} className="opacity-0 group-hover:opacity-100 inline-flex items-center justify-center w-8 h-8 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-all" title="Hapus">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}