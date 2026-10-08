import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Import Halaman
import AdminPage from "./app/admin/page";
import DashboardPage from "./app/dashboard/page";
import LogHamaPage from './app/log/page';
import NotifikasiPage from './app/notifikasi/page';
import PengaturanPage from './app/pengaturan/page';
import LoginPage from "./app/login/page";
import LandingPage from "./app/page";
import RegisterPage from "./app/register/page";

// Import Layouts
import AppLayout from "./components/AppLayout";
import AdminLayout from "./components/AdminLayout"; // <-- Layout Admin (Biru) diimpor di sini

export default function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* ========================================== */}
          {/* RUTE PUBLIK (Berdiri sendiri, tanpa layout) */}
          {/* ========================================== */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* ========================================== */}
          {/* RUTE PRIVAT PETANI (Dibungkus AppLayout Hijau) */}
          {/* ========================================== */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/log" element={<LogHamaPage />} />
            <Route path="/notifikasi" element={<NotifikasiPage />} />
            <Route path="/pengaturan" element={<PengaturanPage />} />
          </Route>

          {/* ========================================== */}
          {/* RUTE PRIVAT ADMIN (Dibungkus AdminLayout Biru) */}
          {/* ========================================== */}
          <Route element={<AdminLayout />}>
            {/* Rute utama admin */}
            <Route path="/admin" element={<AdminPage />} />
            
            {/* Rute sub-menu admin agar link di sidebar berfungsi dan berganti tab otomatis */}
            <Route path="/admin/perangkat" element={<AdminPage />} />
            <Route path="/admin/pengguna" element={<AdminPage />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}