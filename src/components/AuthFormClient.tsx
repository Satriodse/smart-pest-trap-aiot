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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
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
    <div className="w-full">
      {/* ================= HEADER FORM ================= */}
      <h2 className="text-[26px] font-bold text-slate-900 mb-3 tracking-tight">
        Masuk ke Smart Pest Trap
      </h2>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">
        Pantau lahan pertanian Anda secara presisi dengan teknologi AIoT.
      </p>

      {/* ================= FORMULAR LOGIN ================= */}
      <form
        onSubmit={handleLogin}
        className="space-y-6"
        aria-label="Formulir Autentikasi Pengguna"
      >
        
        {/* INPUT EMAIL */}
        <div>
          <label
            htmlFor="emailInput"
            className="block text-sm font-semibold text-gray-800 mb-2"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <input
              id="emailInput"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-11 pr-4 py-3.5 bg-[#f8fafc] border rounded-xl text-sm text-gray-900 font-medium outline-none transition-all placeholder-gray-400 focus:ring-2 focus:ring-[#148348] ${
                errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-[#148348]"
              }`}
              placeholder="Masukkan email Anda"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "emailError" : undefined}
            />
          </div>
          {errors.email && (
            <p id="emailError" className="text-red-600 text-xs mt-1.5 font-medium" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* INPUT PASSWORD */}
        <div>
          <label
            htmlFor="passwordInput"
            className="block text-sm font-semibold text-gray-800 mb-2"
          >
            Kata Sandi
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <input
              id="passwordInput"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full pl-11 pr-12 py-3.5 bg-[#f8fafc] border rounded-xl text-sm text-gray-900 font-medium outline-none transition-all placeholder-gray-400 focus:ring-2 focus:ring-[#148348] ${
                errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-[#148348]"
              }`}
              placeholder="Masukkan kata sandi"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "passwordError" : undefined}
            />
            {/* Tombol Show/Hide Password */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              )}
            </button>
          </div>
          {errors.password && (
            <p id="passwordError" className="text-red-600 text-xs mt-1.5 font-medium" role="alert">
              {errors.password}
            </p>
          )}
        </div>

        {/* CHECKBOX & FORGOT PASSWORD */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-[#148348] focus:ring-[#148348] cursor-pointer"
            />
            <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
              Ingat saya
            </span>
          </label>
          <a href="#" className="text-sm font-bold text-[#148348] hover:text-green-800 transition-colors">
            Lupa kata sandi?
          </a>
        </div>

        {/* TOMBOL SUBMIT */}
        <button
          type="submit"
          disabled={isLoading}
          aria-busy={isLoading}
          className="w-full bg-[#148348] hover:bg-green-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? "Memproses..." : "Masuk"}
          {!isLoading && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          )}
        </button>

        {/* DIVIDER "atau" */}
        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">atau</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* LINK DAFTAR */}
        <p className="text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link to="/register" className="text-[#148348] font-bold hover:underline">
            Daftar sekarang
          </Link>
        </p>
      </form>
    </div>
  );
}