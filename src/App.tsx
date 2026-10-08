import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "./app/admin/page";
import DashboardPage from "./app/dashboard/page";
import LogHamaPage from './app/log/page';
import NotifikasiPage from './app/notifikasi/page';
import PengaturanPage from './app/pengaturan/page';
import LoginPage from "./app/login/page";
// Import halaman dari struktur folder lama Anda
import LandingPage from "./app/page";
import RegisterPage from "./app/register/page";
import AppLayout from "./components/AppLayout";

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
          {/* RUTE PRIVAT / DASHBOARD (Dibungkus AppLayout) */}
          {/* ========================================== */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/log" element={<LogHamaPage />} />
            <Route path="/notifikasi" element={<NotifikasiPage />} />
            <Route path="/pengaturan" element={<PengaturanPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}