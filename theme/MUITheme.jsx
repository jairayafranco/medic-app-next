import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useState, useMemo } from 'react';
import useThemeStore from '../store/useThemeStore';

export default function MUITheme({ children }) {
    const { theme, themeMode } = useThemeStore();
    const DOMLoaded = useState(false); // This is a hack to prevent the theme from flashing on page load. It's not a perfect solution, but it's better than nothing.

    useEffect(() => {
        DOMLoaded[1](true);
    }, []);

    const MUIThemeMode = useMemo(themeMode, [theme]);

    return (
        DOMLoaded[0] && (
            <ThemeProvider theme={MUIThemeMode}>
                {children}
            </ThemeProvider>
        )
    );
}
