import { useEffect, useState } from "react";

export default function AdminPage() {
  // Mengatur judul halaman dinamis
  useEffect(() => {
    document.title = "Panel Admin - Smart Pest Trap";
  }, []);

  const [activeTab, setActiveTab] = useState("perangkat");

  const [devices, setDevices] = useState([
    { id: 1, mac: "A4:C1:38:1A:2B", location: "Sektor A" },
  ]);
  const [deviceForm, setDeviceForm] = useState({ mac: "", location: "" });

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Satrio Dwi Setiawan",
      email: "admin@gmail.com",
      role: "Admin",
    },
    { id: 2, name: "Budi Santoso", email: "petani@gmail.com", role: "User" },
  ]);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "User",
  });

  const handleAddDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deviceForm.mac) return;
    setDevices([
      ...devices,
      {
        id: Date.now(),
        mac: deviceForm.mac,
        location: deviceForm.location || "Belum diatur",
      },
    ]);
    setDeviceForm({ mac: "", location: "" });
  };
  const deleteDevice = (id: number) =>
    setDevices(devices.filter((d) => d.id !== id));

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userForm.name || !userForm.email) return;
    setUsers([...users, { id: Date.now(), ...userForm }]);
    setUserForm({ name: "", email: "", role: "User" });
  };
  const deleteUser = (id: number) => setUsers(users.filter((u) => u.id !== id));

  return (
    <div className="flex flex-col md:flex-row w-full flex-1 bg-slate-50 min-h-[80vh]">
      {/* Sidebar Admin */}
      <aside className="w-full md:w-64 md:flex-shrink-0 bg-slate-900 text-slate-300 flex flex-col shadow-lg">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">Panel Admin</h2>
          <p className="text-xs text-slate-400 mt-1">Super Administrator</p>
        </div>
        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-3">
            <li>
              <button
                onClick={() => setActiveTab("perangkat")}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors font-medium ${activeTab === "perangkat" ? "bg-blue-600 text-white" : "hover:bg-slate-800"}`}
              >
                Manajemen Perangkat
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("pengguna")}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors font-medium ${activeTab === "pengguna" ? "bg-blue-600 text-white" : "hover:bg-slate-800"}`}
              >
                Manajemen Pengguna
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Konten Utama Admin */}
      <div className="flex-1 min-w-0 p-4 md:p-6 lg:p-10">
        {activeTab === "perangkat" && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <section className="xl:col-span-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit">
              <h2 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">
                Registrasi Node Baru
              </h2>
              <form onSubmit={handleAddDevice} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    MAC Address *
                  </label>
                  <input
                    type="text"
                    value={deviceForm.mac}
                    onChange={(e) =>
                      setDeviceForm({ ...deviceForm, mac: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Lokasi Lahan
                  </label>
                  <input
                    type="text"
                    value={deviceForm.location}
                    onChange={(e) =>
                      setDeviceForm({ ...deviceForm, location: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm"
                >
                  Simpan Perangkat
                </button>
              </form>
            </section>

            <section className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-fit">
              <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
                <h2 className="font-bold text-slate-800">Daftar ESP32-CAM</h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                  {devices.length} Node
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-600 whitespace-nowrap">
                  <thead className="text-xs text-slate-700 uppercase bg-slate-100/50">
                    <tr>
                      <th className="px-4 py-3">MAC Address</th>
                      <th className="px-4 py-3">Lokasi</th>
                      <th className="px-4 py-3 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {devices.map((d) => (
                      <tr key={d.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-mono text-xs">{d.mac}</td>
                        <td className="px-4 py-3">{d.location}</td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => deleteDevice(d.id)}
                            className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded hover:bg-red-100"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {activeTab === "pengguna" && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <section className="xl:col-span-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit">
              <h2 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">
                Tambah Akun Baru
              </h2>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    value={userForm.name}
                    onChange={(e) =>
                      setUserForm({ ...userForm, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={userForm.email}
                    onChange={(e) =>
                      setUserForm({ ...userForm, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Hak Akses (Role)
                  </label>
                  <select
                    value={userForm.role}
                    onChange={(e) =>
                      setUserForm({ ...userForm, role: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="User">Petani (User)</option>
                    <option value="Admin">Administrator</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 rounded-lg text-sm"
                >
                  Simpan Akun
                </button>
              </form>
            </section>

            <section className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-fit">
              <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
                <h2 className="font-bold text-slate-800">Daftar Pengguna</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-600 whitespace-nowrap">
                  <thead className="text-xs text-slate-700 uppercase bg-slate-100/50">
                    <tr>
                      <th className="px-4 py-3">Nama</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-800">
                          {u.name}
                        </td>
                        <td className="px-4 py-3">{u.email}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 text-xs rounded-full font-semibold ${u.role === "Admin" ? "bg-purple-100 text-purple-800" : "bg-slate-100 text-slate-700"}`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => deleteUser(u.id)}
                            className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded hover:bg-red-100"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
