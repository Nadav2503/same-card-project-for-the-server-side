import React from "react";
import { Route, Routes } from "react-router-dom";
import CardsPage from "../cards/pages/CardsPage";
import AboutPage from "../pages/AboutPage";
import ErrorPage from "../pages/ErrorPage";
import ROUTES from "./routesModel";
import FavoriteCards from "../cards/pages/FavoriteCards";
import MyCards from "../cards/pages/MyCards";
import LoginPage from "../users/pages/LoginPage";
import SignupPage from "../users/pages/SignupPage";
import CardDetailsPage from "../cards/pages/CardDetailsPage";
import AddCardPage from "../cards/pages/AddCardPage";
import EditCardPage from "../cards/pages/EditCardPage";
import EditUserPage from '../users/pages/EditUserPage';
import UserProfilePage from '../users/pages/UserProfilePage';
export default function Router() {

    return (
        <Routes>
            <Route path={ROUTES.ROOT} element={<CardsPage />} />
            <Route path={ROUTES.CARDS} element={<CardsPage />} />
            <Route path={ROUTES.ABOUT} element={<AboutPage />} />
            <Route path={ROUTES.FAV_CARDS} element={<FavoriteCards />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
            <Route path={ROUTES.MY_CARDS} element={<MyCards />} />
            <Route path={ROUTES.CARD_INFO + "/:id"} element={<CardDetailsPage />} />
            <Route path={ROUTES.EDIT_CARD + "/:id"} element={<EditCardPage />} />
            <Route path={ROUTES.USER_PROFILE + "/:id"} element={<UserProfilePage />} />
            <Route path={ROUTES.EDIT_USER + "/:id"} element={<EditUserPage />} />
            <Route path={ROUTES.ADD_CARDS} element={<AddCardPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}