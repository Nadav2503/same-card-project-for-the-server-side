import { Box, IconButton } from "@mui/material";
import React from "react";
import { useCurrentUser } from "../../../users/providers/UserProvider";
import Logged from "./Logged";
import NotLogged from "./NotLogged";

export default function RightNavbar() {
    const { user } = useCurrentUser();
    return (
        <Box
            sx={{
                display: { xs: "inline-flex" },
                alignItems: "center",
            }}
        >

            {user ? <Logged /> : <NotLogged />}
        </Box>
    );
}