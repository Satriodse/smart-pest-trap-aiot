import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);

  // Mengatur judul halaman
  useEffect(() => {
    document.title = "Daftar Akun - Smart Pest Trap";
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Konfirmasi password tidak cocok!");
      return;
    }
    alert("Registrasi Berhasil! Silakan masuk.");
    navigate("/login");
  };

  return (
    <div className="py-12 px-4 flex-1 flex items-center justify-center bg-slate-100">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-200">
        <div className="md:w-1/2 bg-[url('/Padi.jpg')] bg-cover bg-center hidden md:block relative">
          <div className="absolute inset-0 bg-green-900/40"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-3xl font-bold mb-2">Smart Pest Trap</h2>
            <p className="text-green-50 text-sm">
              Bergabunglah dan pantau lahan secara presisi.
            </p>
          </div>
        </div>
        <div className="md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Buat Akun Baru
          </h2>
          {error && (
            <div className="p-3 mb-4 bg-red-50 text-red-600 text-xs rounded-lg">
              {error}
            </div>
          )}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg text-slate-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg text-slate-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Kata Sandi
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg text-slate-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Konfirmasi Kata Sandi
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg text-slate-900"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg"
            >
              Daftar Sekarang
            </button>
          </form>
          <p className="text-center text-sm text-slate-600 mt-4">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="text-green-600 font-bold hover:underline"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
