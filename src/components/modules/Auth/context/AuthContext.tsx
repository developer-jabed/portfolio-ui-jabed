"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface AuthContextType {
    isLoggedIn: boolean;
    checkUser: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkUser = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/v1/user/me", {
                withCredentials: true,
            });
            setIsLoggedIn(!!res.data.data);
        } catch {
            setIsLoggedIn(false);
        }
    };

    const logout = async () => {
        try {
            await axios.post(
                "http://localhost:5000/api/v1/auth/logout",
                {},
                { withCredentials: true }
            );
            setIsLoggedIn(false);
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, checkUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used inside an AuthProvider");
    return context;
};
