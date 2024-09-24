import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountBoxIcon from '@mui/icons-material/AccountBoxOutlined';
import StyleIcon from "@mui/icons-material/Style"
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useCurrentUser } from "../../users/providers/UserProvider";

export default function Footer() {
    const navigate = useNavigate();
    const { user } = useCurrentUser();
    return (
        <Paper elevation={3}
            sx={{ position: "sticky", bottom: 0, left: 0, right: 0 }}>
            <BottomNavigation showLabels sx={{
                border: '1px solid #ddd',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}>
                <BottomNavigationAction
                    label="About"
                    icon={<InfoIcon />}
                    onClick={() => navigate(ROUTES.ABOUT)}
                />
                {user && (
                    <BottomNavigationAction
                        label="Favorites"
                        icon={<FavoriteIcon />}
                        onClick={() => navigate(ROUTES.FAV_CARDS)}
                    />
                )}
                {user && (user.isAdmin || user.isBusiness) && (
                    <BottomNavigationAction
                        label="My Cards"
                        icon={<AccountBoxIcon />}
                        onClick={() => navigate(ROUTES.MY_CARDS)}
                    />
                )}
                (
                <BottomNavigationAction
                    label="Cards"
                    icon={<StyleIcon />}
                    onClick={() => navigate(ROUTES.CARDS)}
                />
                )
            </BottomNavigation>
        </Paper>
    );
}
