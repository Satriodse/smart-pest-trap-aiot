import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { useAuthStore } from "../store/useAuthStore";

// ==========================================
// SKEMA VALIDASI ZOD
// ==========================================
// 1. Skema untuk Login
const loginSchema = z.object({
  email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
  password: z.string().min(8, "Kata sandi minimal 8 karakter"),
});

// 2. Skema untuk Register (Ditambah Nama, No HP, dan Konfirmasi Password)
const registerSchema = z.object({
  name: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  phone: z.string().min(10, "Nomor handphone tidak valid (min. 10 angka)"),
  email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
  password: z.string().min(8, "Kata sandi minimal 8 karakter"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Konfirmasi kata sandi tidak cocok",
  path: ["confirmPassword"],
});

export default function AuthFormClient() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  
  // Deteksi apakah sedang di halaman login atau register dari URL
  const isLogin = location.pathname === "/login";

  // State Form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // 1. EKSEKUSI VALIDASI ZOD
    if (isLogin) {
      const validation = loginSchema.safeParse({ email, password });
      if (!validation.success) {
        const formattedErrors = validation.error.format();
        setErrors({
          email: formattedErrors.email?._errors[0] || "",
          password: formattedErrors.password?._errors[0] || "",
        });
        setIsLoading(false);
        return;
      }
    } else {
      const validation = registerSchema.safeParse({ name, phone, email, password, confirmPassword });
      if (!validation.success) {
        const formattedErrors = validation.error.format();
        setErrors({
          name: formattedErrors.name?._errors[0] || "",
          phone: formattedErrors.phone?._errors[0] || "",
          email: formattedErrors.email?._errors[0] || "",
          password: formattedErrors.password?._errors[0] || "",
          confirmPassword: formattedErrors.confirmPassword?._errors[0] || "",
        });
        setIsLoading(false);
        return;
      }
    }

    // 2. SIMULASI DATABASE LOCALSTORAGE
    let usersDB: any[] = JSON.parse(localStorage.getItem("mock_database_users") || "[]");
    
    // Akun Default (agar Anda tidak perlu daftar ulang jika DB terhapus)
    if (usersDB.length === 0) {
      usersDB = [
        { name: "Admin Utama", email: "admin@gmail.com", phone: "081234567890", password: "password123", role: "Admin" },
        { name: "Satrio Petani", email: "petani@gmail.com", phone: "081234567891", password: "password123", role: "User" }
      ];
      localStorage.setItem("mock_database_users", JSON.stringify(usersDB));
    }

    if (isLogin) {
      // === PROSES LOGIN ===
      const foundUser = usersDB.find((u: any) => u.email === email && u.password === password);

      if (foundUser) {
        const isAdmin = foundUser.email.toLowerCase().includes("admin") || foundUser.role === "Admin";
        
        // Simpan data lengkap ke Zustand Store
        login({ 
          name: foundUser.name, 
          email: foundUser.email,
          phone: foundUser.phone,
          role: isAdmin ? "Admin" : "User"
        });

        document.cookie = `uns_session=${isAdmin ? "admin-token" : "user-token"}; path=/`;
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (isAdmin) {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        setErrors({ general: "Email atau kata sandi salah, atau belum terdaftar." });
      }
    } else {
      // === PROSES REGISTER ===
      const userExists = usersDB.find((u: any) => u.email === email);
      if (userExists) {
        setErrors({ email: "Email sudah terdaftar!" });
        setIsLoading(false);
        return;
      }

      const isAdmin = email.toLowerCase().includes("admin");
      const newUser = {
        name,
        phone,
        email,
        password,
        role: isAdmin ? "Admin" : "User",
      };

      // Simpan akun baru ke LocalStorage
      usersDB.push(newUser);
      localStorage.setItem("mock_database_users", JSON.stringify(usersDB));

      alert("Pendaftaran berhasil! Silakan masuk dengan akun Anda.");
      navigate("/login");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="w-full">
      {/* ================= HEADER FORM ================= */}
      <h2 className="text-[26px] font-bold text-slate-900 mb-3 tracking-tight">
        {isLogin ? "Masuk ke Smart Pest Trap" : "Daftar Akun"}
      </h2>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">
        {isLogin 
          ? "Pantau lahan pertanian Anda secara presisi dengan teknologi AIoT." 
          : "Lengkapi informasi berikut untuk membuat akun baru di Smart Pest Trap."}
      </p>

      {errors.general && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-medium rounded-xl text-center">
          {errors.general}
        </div>
      )}

      {/* ================= FORMULAR ================= */}
      <form onSubmit={handleSubmit} className="space-y-5" aria-label="Formulir Autentikasi">
        
        {/* INPUT NAMA & NO HP (Hanya Muncul saat Register) */}
        {!isLogin && (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Nama Lengkap</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 bg-[#f8fafc] border rounded-xl text-sm text-gray-900 font-medium outline-none transition-all placeholder-gray-400 focus:ring-2 focus:ring-[#148348] ${errors.name ? "border-red-500" : "border-gray-200"}`}
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>
              {errors.name && <p className="text-red-600 text-xs mt-1.5 font-medium">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Nomor Handphone</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 bg-[#f8fafc] border rounded-xl text-sm text-gray-900 font-medium outline-none transition-all placeholder-gray-400 focus:ring-2 focus:ring-[#148348] ${errors.phone ? "border-red-500" : "border-gray-200"}`}
                  placeholder="Contoh: 081234567890"
                />
              </div>
              {errors.phone && <p className="text-red-600 text-xs mt-1.5 font-medium">{errors.phone}</p>}
            </div>
          </>
        )}

        {/* INPUT EMAIL */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-11 pr-4 py-3 bg-[#f8fafc] border rounded-xl text-sm text-gray-900 font-medium outline-none transition-all placeholder-gray-400 focus:ring-2 focus:ring-[#148348] ${errors.email ? "border-red-500" : "border-gray-200"}`}
              placeholder="Masukkan email Anda"
            />
          </div>
          {errors.email && <p className="text-red-600 text-xs mt-1.5 font-medium">{errors.email}</p>}
        </div>

        {/* INPUT PASSWORD */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Kata Sandi</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full pl-11 pr-12 py-3 bg-[#f8fafc] border rounded-xl text-sm text-gray-900 font-medium outline-none transition-all placeholder-gray-400 focus:ring-2 focus:ring-[#148348] ${errors.password ? "border-red-500" : "border-gray-200"}`}
              placeholder={isLogin ? "Masukkan kata sandi" : "Minimal 8 karakter"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              )}
            </button>
          </div>
          {errors.password && <p className="text-red-600 text-xs mt-1.5 font-medium">{errors.password}</p>}
        </div>

        {/* INPUT KONFIRMASI PASSWORD (Hanya Muncul saat Register) */}
        {!isLogin && (
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Konfirmasi Kata Sandi</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full pl-11 pr-12 py-3 bg-[#f8fafc] border rounded-xl text-sm text-gray-900 font-medium outline-none transition-all placeholder-gray-400 focus:ring-2 focus:ring-[#148348] ${errors.confirmPassword ? "border-red-500" : "border-gray-200"}`}
                placeholder="Ulangi kata sandi Anda"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-600 text-xs mt-1.5 font-medium">{errors.confirmPassword}</p>}
          </div>
        )}

        {/* CHECKBOX "INGAT SAYA" & "LUPA KATA SANDI" (Hanya Muncul saat Login) */}
        {isLogin && (
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#148348] focus:ring-[#148348] cursor-pointer" />
              <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">Ingat saya</span>
            </label>
            <a href="#" className="text-sm font-bold text-[#148348] hover:text-green-800 transition-colors">
              Lupa kata sandi?
            </a>
          </div>
        )}

        {/* TOMBOL SUBMIT */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#148348] hover:bg-green-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2 mt-4 disabled:opacity-70"
        >
          {isLoading ? "Memproses..." : (isLogin ? "Masuk" : "Daftar Sekarang")}
          {!isLoading && !isLogin && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          )}
        </button>

        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">atau</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <p className="text-center text-sm text-gray-600">
          {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
          <Link to={isLogin ? "/register" : "/login"} className="text-[#148348] font-bold hover:underline">
            {isLogin ? "Daftar sekarang" : "Masuk di sini"}
          </Link>
        </p>
      </form>
    </div>
  );
}