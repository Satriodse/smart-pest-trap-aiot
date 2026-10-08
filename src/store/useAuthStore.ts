import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  // Menyimpan data user yang sedang aktif
  user: { name: string; email: string } | null;
  // Fungsi untuk memicu login
  login: (userData: { name: string; email: string }) => void;
  // Fungsi untuk logout
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (userData) => set({ user: userData }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage', // Nama key di LocalStorage browser
    }
  )
);