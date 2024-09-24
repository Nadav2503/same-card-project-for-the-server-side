import { jwtDecode } from 'jwt-decode';

const TOKEN = 'myToken';
const LOGIN_ATTEMPTS_KEY = 'loginAttempts';
const MAX_ATTEMPTS = 3;
const LOCK_DURATION_MS = 24 * 60 * 60 * 1000;

export const setTokenInLocalStorage = (jwtToken) => {
    localStorage.setItem(TOKEN, jwtToken);
}

export const removeToken = () => {
    localStorage.removeItem(TOKEN);
}

export const getToken = () => {
    return localStorage.getItem(TOKEN);
}

export const getUser = () => {
    try {
        const myToken = getToken();
        if (myToken) {
            return jwtDecode(myToken);
        }
        return null;
    } catch (err) {
        return null;
    }
};

export const getLoginAttempts = () => {
    const attempts = localStorage.getItem(LOGIN_ATTEMPTS_KEY);
    return attempts ? JSON.parse(attempts) : { count: 0, firstAttempt: null };
};

export const incrementLoginAttempts = () => {
    const attempts = getLoginAttempts();
    if (!attempts.firstAttempt) {
        attempts.firstAttempt = Date.now();
    }
    attempts.count += 1;
    localStorage.setItem(LOGIN_ATTEMPTS_KEY, JSON.stringify(attempts));
};

export const resetLoginAttempts = () => {
    localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
};

export const getLockStatus = () => {
    const attempts = getLoginAttempts();
    if (attempts.count >= MAX_ATTEMPTS) {
        const lockTimestamp = new Date(attempts.firstAttempt).getTime() + LOCK_DURATION_MS;
        if (Date.now() < lockTimestamp) {
            return { locked: true, unlockTime: lockTimestamp };
        } else {
            resetLoginAttempts();
        }
    }
    return { locked: false };
};
