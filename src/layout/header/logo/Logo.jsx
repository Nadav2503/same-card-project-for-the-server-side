import React from "react";
import { Typography } from "@mui/material";
import ROUTES from "../../../routes/routesModel";
import NavBarLink from "../../../routes/components/NavBarLink";

export default function Logo() {
    return (
        <>
            <NavBarLink to={ROUTES.ROOT}>
                <Typography
                    variant="h4"
                    sx={{
                        marginRight: 2,
                        fontFamily: "fantasy",
                        display: { xs: "none", md: "inline-flex" },
                    }}
                >
                    BCard
                </Typography>
            </NavBarLink>
        </>
    );
}