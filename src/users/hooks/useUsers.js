import { useState, useCallback, useEffect } from 'react';
import { useCurrentUser } from '../providers/UserProvider';
import { setTokenInLocalStorage, removeToken, getUser, getLoginAttempts, incrementLoginAttempts, resetLoginAttempts, getLockStatus } from '../services/localStorageService';
import { login, signup, getUserData, updateUser } from '../services/usersApiService';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routesModel';
import { useSnack } from '../../providers/SnackbarProvider';
import normalizeUser from '../helpers/normalization/normalizeUser';

export default function useUsers() {
    const [isLoading, setIsLoading] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [remainingAttempts, setRemainingAttempts] = useState(null);
    const { user, setUser, setToken } = useCurrentUser();
    const navigate = useNavigate();
    const setSnack = useSnack();

    useEffect(() => {
        const { locked } = getLockStatus();
        setIsLocked(locked);
        if (!locked) {
            const { count } = getLoginAttempts();
            setRemainingAttempts(Math.max(0, 3 - count));
        }
    }, []);

    const handleLogin = useCallback(async (userLogin) => {
        setIsLoading(true);
        const { locked } = getLockStatus();
        if (locked) {
            setIsLocked(true);
            setIsLoading(false);
            setSnack("error", "Your account is temporarily locked. Try again later.");
            return;
        }

        try {
            const token = await login(userLogin);
            setTokenInLocalStorage(token);
            setToken(token);
            const userFromLocalStorage = getUser();
            setUser(userFromLocalStorage);
            resetLoginAttempts();
            navigate(ROUTES.CARDS);
        } catch (err) {
            incrementLoginAttempts();
            const errorMessage = err.response?.data?.message || err.message || "An unexpected error occurred";
            setSnack("error", errorMessage);
            const { locked } = getLockStatus();
            setIsLocked(locked);
            if (!locked) {
                const { count } = getLoginAttempts();
                setRemainingAttempts(Math.max(0, 3 - count));
            }
        } finally {
            setIsLoading(false);
        }
    }, [navigate, setToken, setUser, setSnack]);

    const handleSignup = useCallback(async (user) => {
        setIsLoading(true);
        try {
            const normalizedUser = normalizeUser(user);
            const { token } = await signup(normalizedUser);
            setTokenInLocalStorage(token);
            setToken(token);
            setUser(getUser());
            navigate(ROUTES.CARDS);
            await handleLogin({ email: user.email, password: user.password });
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "An unexpected error occurred";
            setSnack("error", errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [handleLogin, navigate, setToken, setUser, setSnack]);

    const handleLogout = useCallback(() => {
        setToken(null);
        setUser(null);
        removeToken();
        navigate(ROUTES.LOGIN);
    }, [navigate, setToken, setUser]);

    const getUserById = useCallback(async (id) => {
        setIsLoading(true);
        try {
            const userData = await getUserData(id);
            setUser(userData);
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "An unexpected error occurred";
            setSnack("error", errorMessage);
            navigate(ROUTES.ERROR);
        } finally {
            setIsLoading(false);
        }
    }, [setSnack, setUser, navigate]);

    const handleUpdateUser = useCallback(async (id, userData) => {
        setIsLoading(true);
        try {
            const normalizedUser = normalizeUser(userData);
            await updateUser(id, normalizedUser);
            setSnack("success", "User updated successfully");
            navigate(ROUTES.USER_PROFILE + `/${id}`);
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "An unexpected error occurred";
            setSnack("error", errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [navigate, setSnack]);

    return { isLoading, user, isLocked, remainingAttempts, handleLogin, handleLogout, handleSignup, getUserById, handleUpdateUser };
}
