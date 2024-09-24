import React, { useState } from 'react';
import { Box, IconButton, Avatar, Tooltip, Menu, MenuItem, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import ROUTES from '../../../routes/routesModel';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from '../../../providers/CustomThemeProvider';

export default function NotLogged() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { isDark, toggleDarkMode } = useTheme();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleToggleDarkMode = () => {
        toggleDarkMode();
        handleMenuClose();
    };

    return (
        <Box>
            <Tooltip title="Open menu">
                <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                    <Avatar alt="avatar" src="/images/avatar.png" />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        width: 200,
                        maxWidth: '95%',
                    },
                }}
            >
                <MenuItem component={Link} to={ROUTES.SIGNUP} onClick={handleMenuClose}>
                    Signup
                </MenuItem>
                <MenuItem component={Link} to={ROUTES.LOGIN} onClick={handleMenuClose}>
                    Login
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleToggleDarkMode}>
                    {isDark ? <LightModeIcon sx={{ mr: 1 }} /> : <DarkModeIcon sx={{ mr: 1 }} />}
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                </MenuItem>
            </Menu>
        </Box>
    );
}
