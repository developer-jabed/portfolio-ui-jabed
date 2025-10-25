"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import axios from "axios";

export interface UserType {
    [x: string]: ReactNode;
    name?: string;
    role: "Admin" | "User";
}

interface AuthContextType {
    isLoggedIn: boolean;
    user: UserType | null;
    loading: boolean; // added loading
    checkUser: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true); // loading starts as true

    const checkUser = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
                withCredentials: true,
            });
            if (res.data.data) {
                setIsLoggedIn(true);
                setUser(res.data.data);
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        } catch (err) {
            console.error("Error fetching user:", err);
            setIsLoggedIn(false);
            setUser(null);
        }
    };

    useEffect(() => {
        const runCheck = async () => {
            await checkUser(); // fetch user
            // keep loading true for 5 seconds
            const timer = setTimeout(() => setLoading(false), 5000);
            return () => clearTimeout(timer);
        };
        runCheck();
    }, []);

    const logout = async () => {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
                {},
                { withCredentials: true }
            );
            setIsLoggedIn(false);
            setUser(null);
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, loading, checkUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside an AuthProvider");
    return context;
};
