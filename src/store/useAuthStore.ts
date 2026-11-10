import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  // Menyimpan data user yang sedang aktif (ditambahkan properti id_user)
  user: { id_user: number; name: string; email: string; role?: string; phone?: string } | null;
  // Fungsi untuk memicu login (ditambahkan properti id_user)
  login: (userData: { id_user: number; name: string; email: string; role?: string; phone?: string }) => void;
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
      name: 'auth-storage', // Data sesi akan tersimpan di sini
    }
  )
);