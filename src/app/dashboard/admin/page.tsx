"use client";
import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/components/modules/Auth/context/AuthContext";

export default function AdminHome() {
    const { user } = useAuth();

    if (!user) return <p className="text-center mt-10 text-red-500">User not found</p>;

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white p-6">
            <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 mb-6 text-center"
            >
                Welcome, {user.name || "Admin"}!
            </motion.h1>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 w-full max-w-md mb-10 shadow-lg"
            >
                <h2 className="text-2xl font-semibold mb-4">Your Details</h2>
                <p><span className="font-semibold text-pink-400">Name:</span> {user.name}</p>
                <p><span className="font-semibold text-pink-400">Role:</span> {user.role}</p>
                <p><span className="font-semibold text-pink-400">Email:</span> {user.email}</p>
                {/* Add more fields here if your API provides them */}
            </motion.div>
        </div>
    );
}
