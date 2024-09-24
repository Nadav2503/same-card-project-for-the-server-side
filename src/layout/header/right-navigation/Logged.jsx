import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import ROUTES from '../../../routes/routesModel';
import useUsers from '../../../users/hooks/useUsers';
import { useCurrentUser } from '../../../users/providers/UserProvider';
import useAnchor from '../hooks/useAnchor';
import { Menu, MenuItem, Divider } from '@mui/material';
import { useTheme } from '../../../providers/CustomThemeProvider';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ConfirmDialog from '../../../components/ConfirmDialog';

const MenuItems = ({ user, handleLogout, toggleDarkMode, isDark, closeAnchor }) => [
    { label: 'Profile', onClick: () => { window.location.href = `${ROUTES.USER_PROFILE}/${user._id}`; closeAnchor(); } },
    { label: 'Edit Profile', onClick: () => { window.location.href = `${ROUTES.EDIT_USER}/${user._id}`; closeAnchor(); } },
    { label: 'Logout', onClick: () => { handleLogout(); closeAnchor(); } },
    {
        label: isDark ? 'Light Mode' : 'Dark Mode',
        onClick: () => {
            toggleDarkMode();
            setTimeout(() => closeAnchor(), 0);
        },
        icon: isDark ? <LightModeIcon /> : <DarkModeIcon />
    }
];

export default function Logged() {
    const { handleLogout } = useUsers();
    const { user } = useCurrentUser();
    const { anchorEl, open, openAnchor, closeAnchor } = useAnchor();
    const { isDark, toggleDarkMode } = useTheme();
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

    const handleLogoutClick = () => {
        setConfirmDialogOpen(true);
    };

    const handleConfirmLogout = () => {
        handleLogout();
        setConfirmDialogOpen(false);
    };

    const menuItems = MenuItems({ user, handleLogout: handleLogoutClick, toggleDarkMode, isDark, closeAnchor });

    return (
        <div>
            <Tooltip title="Open settings">
                <IconButton onClick={openAnchor} sx={{ p: 0, display: 'inline-flex' }}>
                    <Avatar alt="avatar" src="/images/avatar.png" />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={closeAnchor}
            >
                {menuItems.map((item, index) => (
                    <div key={index}>
                        <MenuItem
                            component={item.label === 'Logout' ? 'button' : Link}
                            to={item.label === 'Logout' ? undefined : item.onClick ? undefined : `${ROUTES.LOGIN}`}
                            onClick={item.onClick || closeAnchor}
                        >
                            {item.icon && <span style={{ marginRight: 8 }}>{item.icon}</span>}
                            {item.label}
                        </MenuItem>
                        {item.label === 'Logout' && index < menuItems.length - 1 && <Divider />}
                    </div>
                ))}
            </Menu>
            <ConfirmDialog
                open={confirmDialogOpen}
                onClose={() => setConfirmDialogOpen(false)}
                onConfirm={handleConfirmLogout}
                title="Confirm Logout"
                message="Are you sure you want to log out?"
            />
        </div>
    );
}
