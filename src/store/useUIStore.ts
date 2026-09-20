import { create } from "zustand";

interface UIState {
  isSidebarOpen: boolean;
  selectedSector: string;
  themeMode: "light" | "dark";
  toggleSidebar: () => void;
  setSelectedSector: (sector: string) => void;
  toggleTheme: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isSidebarOpen: true,
  selectedSector: "All",
  themeMode: "light",
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSelectedSector: (sector) => set({ selectedSector: sector }),
  toggleTheme: () =>
    set((state) => ({
      themeMode: state.themeMode === "light" ? "dark" : "light",
    })),
}));
