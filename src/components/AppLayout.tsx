import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboardOrAdmin =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/admin");

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            {/* Ganti dengan tag img standar, BUKAN next/image */}
            <img
              src="/LogoWeb.png"
              alt="Logo"
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-lg font-bold text-slate-900 leading-tight">
              Smart Pest Trap
            </h1>
          </Link>
          <nav className="flex space-x-4 items-center">
            {isDashboardOrAdmin ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors cursor-pointer"
              >
                Keluar
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
              >
                Masuk / Daftar
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full flex flex-col">
        <Outlet />
      </main>

      {/* Footer kini aktif dan tampil secara konsisten di seluruh halaman */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-500 text-sm mt-auto">
        &copy; 2026 Smart Pest Trap AIoT. Proyek D3 Teknik Informatika SV UNS.
      </footer>
    </div>
  );
}
