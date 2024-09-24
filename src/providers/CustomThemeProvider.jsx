import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { createContext, useCallback, useContext, useState } from "react";

const ThemeContext = createContext();

export default function CustomThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(false);

    const toggleDarkMode = useCallback(() => {
        setIsDark((prev) => !prev);
    }, []);

    const theme = createTheme({
        palette: {
            mode: isDark ? "dark" : "light",
            ...(isDark
                ? {
                    primary: {
                        main: "#90caf9",
                    },
                    background: {
                        default: "#121212",
                        paper: "#424242",
                    },
                    text: {
                        primary: "#ffffff",
                        secondary: "#b0bec5",
                    },
                }
                : {
                    primary: {
                        main: "#1976d2",
                    },
                    background: {
                        default: "#f5f5f5",
                        paper: "#ffffff",
                    },
                    text: {
                        primary: "#000000",
                        secondary: "#555555",
                    },
                }),
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <ThemeContext.Provider value={{ isDark, toggleDarkMode, theme }}>
                {children}
            </ThemeContext.Provider>
        </ThemeProvider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a Provider");
    return context;
};
