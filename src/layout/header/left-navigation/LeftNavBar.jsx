import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Divider, Typography, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ROUTES from '../../../routes/routesModel';
import Logo from '../logo/Logo';
import LogoIcon from '../logo/LogoIcon';
import { useCurrentUser } from '../../../users/providers/UserProvider';
import { useNavigate } from 'react-router-dom';

export default function LeftNavBar() {
    const { user } = useCurrentUser();
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNavigate = (to) => {
        navigate(to);
        handleMenuClose();
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Logo />

            {isMobile ? (
                <>
                    <IconButton onClick={handleMenuOpen} sx={{ ml: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        PaperProps={{
                            sx: {
                                width: 200,
                                maxWidth: '95%',
                            },
                        }}
                    >
                        <MenuItem onClick={() => handleNavigate(ROUTES.ABOUT)}>About</MenuItem>
                        <MenuItem onClick={() => handleNavigate(ROUTES.CARDS)}>Cards</MenuItem>
                        {user && (
                            <MenuItem onClick={() => handleNavigate(ROUTES.FAV_CARDS)}>Favorites</MenuItem>
                        )}
                        {user && (user.isAdmin || user.isBusiness) && (
                            <MenuItem onClick={() => handleNavigate(ROUTES.MY_CARDS)}>My Cards</MenuItem>
                        )}
                        <Divider />
                        <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                            <LogoIcon /> <Typography variant="body2" sx={{ ml: 1 }}>BCard</Typography>
                        </Box>
                    </Menu>
                </>
            ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                    <LogoIcon />
                    <Typography
                        variant="body1"
                        onClick={() => handleNavigate(ROUTES.ABOUT)}
                        sx={{
                            ml: 2,
                            cursor: 'pointer',
                            border: '1px solid',
                            borderColor: theme.palette.divider,
                            borderRadius: 1,
                            boxShadow: theme.shadows[2],
                            p: 1,
                            transition: 'all 0.3s',
                            '&:hover': {
                                backgroundColor: theme.palette.action.hover,
                                borderColor: theme.palette.primary.main,
                                boxShadow: theme.shadows[4],
                            }
                        }}
                    >
                        About
                    </Typography>
                    <Typography
                        variant="body1"
                        onClick={() => handleNavigate(ROUTES.CARDS)}
                        sx={{
                            ml: 2,
                            cursor: 'pointer',
                            border: '1px solid',
                            borderColor: theme.palette.divider,
                            borderRadius: 1,
                            boxShadow: theme.shadows[2],
                            p: 1,
                            transition: 'all 0.3s',
                            '&:hover': {
                                backgroundColor: theme.palette.action.hover,
                                borderColor: theme.palette.primary.main,
                                boxShadow: theme.shadows[4],
                            }
                        }}
                    >
                        Cards
                    </Typography>
                    {user && (
                        <Typography
                            variant="body1"
                            onClick={() => handleNavigate(ROUTES.FAV_CARDS)}
                            sx={{
                                ml: 2,
                                cursor: 'pointer',
                                border: '1px solid',
                                borderColor: theme.palette.divider,
                                borderRadius: 1,
                                boxShadow: theme.shadows[2],
                                p: 1,
                                transition: 'all 0.3s',
                                '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                    borderColor: theme.palette.primary.main,
                                    boxShadow: theme.shadows[4],
                                }
                            }}
                        >
                            Favorites
                        </Typography>
                    )}
                    {user && (user.isAdmin || user.isBusiness) && (
                        <Typography
                            variant="body1"
                            onClick={() => handleNavigate(ROUTES.MY_CARDS)}
                            sx={{
                                ml: 2,
                                cursor: 'pointer',
                                border: '1px solid',
                                borderColor: theme.palette.divider,
                                borderRadius: 1,
                                boxShadow: theme.shadows[2],
                                p: 1,
                                transition: 'all 0.3s',
                                '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                    borderColor: theme.palette.primary.main,
                                    boxShadow: theme.shadows[4],
                                }
                            }}
                        >
                            My Cards
                        </Typography>
                    )}
                </Box>
            )}
        </Box>
    );
}
