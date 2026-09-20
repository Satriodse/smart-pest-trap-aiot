import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

// Skema validasi Zod sesuai Bab 5 (Strict Runtime Validation)
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email wajib diisi" })
    .email({ message: "Format email tidak valid" }),
  password: z.string().min(8, { message: "Kata sandi minimal 8 karakter" }),
});

export default function AuthFormClient() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Eksekusi validasi runtime Zod
    const validation = loginSchema.safeParse({ email, password });

    if (!validation.success) {
      const formattedErrors = validation.error.format();
      setErrors({
        email: formattedErrors.email?._errors[0],
        password: formattedErrors.password?._errors[0],
      });
      setIsLoading(false);
      return;
    }

    // Cek apakah login sebagai admin atau user biasa
    const isAdmin = email.toLowerCase().includes("admin");

    document.cookie = `uns_session=${isAdmin ? "admin-token" : "user-token"}; path=/`;
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (isAdmin) {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-200">
      <div className="md:w-1/2 bg-[url('/Padi.jpg')] bg-cover bg-center hidden md:block relative">
        <div className="absolute inset-0 bg-green-900/40"></div>
        <div className="absolute bottom-8 left-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Smart Pest Trap</h2>
          <p className="text-green-50 text-sm pr-4">
            Pantau lahan pertanian Anda secara presisi dengan teknologi AIoT.
          </p>
        </div>
      </div>
      <div className="md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Masuk ke Dashboard
        </h2>
        {/* Penambahan aria-label untuk web semantik (Bab 1) */}
        <form
          onSubmit={handleLogin}
          className="space-y-4"
          aria-label="Formulir Autentikasi Pengguna"
        >
          <div>
            <label
              htmlFor="emailInput"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Email
            </label>
            <input
              id="emailInput"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2.5 border rounded-lg text-slate-900 outline-none focus:ring-2 focus:ring-green-500 ${errors.email ? "border-red-500" : "border-slate-300"}`}
              placeholder="masukkan email anda"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "emailError" : undefined}
            />
            {/* Penambahan role="alert" untuk Screen Reader */}
            {errors.email && (
              <p
                id="emailError"
                className="text-red-600 text-xs mt-1 font-medium"
                role="alert"
              >
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="passwordInput"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Kata Sandi
            </label>
            <input
              id="passwordInput"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2.5 border rounded-lg text-slate-900 outline-none focus:ring-2 focus:ring-green-500 ${errors.password ? "border-red-500" : "border-slate-300"}`}
              placeholder="••••••••"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "passwordError" : undefined}
            />
            {errors.password && (
              <p
                id="passwordError"
                className="text-red-600 text-xs mt-1 font-medium"
                role="alert"
              >
                {errors.password}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-70 mt-2"
          >
            {isLoading ? "Memproses..." : "Masuk"}
          </button>
        </form>
        <p className="text-center text-sm text-slate-600 mt-6">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="text-green-600 font-bold hover:underline"
          >
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
