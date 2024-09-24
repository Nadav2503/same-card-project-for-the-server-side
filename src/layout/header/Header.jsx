import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import LeftNavBar from "./left-navigation/LeftNavBar.jsx";
import RightNavbar from "./right-navigation/RightNavBar.jsx";
import SearchBar from "./middle-navigation/SearchBar.jsx";
export default function Header() {
    return (
        <AppBar position="sticky" color="primary" elevation={10}>
            <Toolbar sx={{ justifyContent: "space-evenly" }}>
                <LeftNavBar />
                <SearchBar />
                <RightNavbar />
            </Toolbar>
        </AppBar>
    );
}