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
    checkUser: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<UserType | null>(null);
    // console.log("user:",user)

    const checkUser = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
                withCredentials: true,
            });
            if (res.data.data) {
                setIsLoggedIn(true);
                setUser(res.data.data); // store user object
               
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

    useEffect(() => {
        checkUser();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, checkUser, logout }}>
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
