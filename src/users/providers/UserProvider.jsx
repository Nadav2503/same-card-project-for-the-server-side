// UserProvider.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, getUser } from '../services/localStorageService';

const UserContext = createContext();

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(getToken());

    useEffect(() => {
        if (token) {
            const userFromLocalStorage = getUser();
            setUser(userFromLocalStorage);
        }
    }, [token]);

    return (
        <UserContext.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </UserContext.Provider>
    );
}

export const useCurrentUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useCurrentUser must be used within UserProvider");
    }
    return context;
};
