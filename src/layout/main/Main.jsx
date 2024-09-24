import { Box } from "@mui/material";
import React from "react";
import { useTheme } from "../../providers/CustomThemeProvider";

export default function Main({ children }) {
    const { isDark, theme } = useTheme();

    const backgroundColor = isDark ? "#333333" : "#e3f2fd";
    const textColor = theme ? (isDark ? theme.palette.text.primary : theme.palette.text.primary) : "#000000";

    return (
        <Box
            sx={{
                minHeight: "85vh",
                backgroundColor: backgroundColor,
                color: textColor,
                transition: 'background-color 0.3s, color 0.3s'
            }}
        >
            {children}
        </Box>
    );
}
