import { create } from 'zustand';
import { createTheme } from '@mui/material/styles';
import { esES } from '@mui/x-data-grid';

const useThemeStore = create((set, get) => ({
    theme: typeof window !== "undefined" && localStorage.getItem('MUIThemeMode') || 'light',
    themeMode: () => createTheme({ palette: { mode: get().theme } }, esES),
    setTheme: (theme) => {
        set({ theme });
        typeof window !== "undefined" && localStorage.setItem('MUIThemeMode', theme);
    }
}));

export default useThemeStore;