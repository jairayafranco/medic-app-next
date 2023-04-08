import { create } from 'zustand';
import { createTheme } from '@mui/material/styles';
import { esES } from '@mui/x-data-grid';

const isWindow = typeof window !== "undefined";

const useThemeStore = create((set, get) => ({
    theme: isWindow && localStorage.getItem('MUIThemeMode') || 'light',
    themeMode: () => createTheme({ palette: { mode: get().theme } }, esES),
    setTheme: (theme) => {
        set({ theme });
        isWindow && localStorage.setItem('MUIThemeMode', theme);
    }
}));

export default useThemeStore;