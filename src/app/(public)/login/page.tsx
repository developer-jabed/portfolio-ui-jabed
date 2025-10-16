"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type LoginFormValues = {
    email: string;
    password: string;
};

export default function Login() {
    const { register, handleSubmit } = useForm<LoginFormValues>({
        defaultValues: {
            email: "jabed1780@gmal.com",
            password: "jabed1780",
        },
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (values: LoginFormValues) => {
        setError("");
        setLoading(true);

        try {
            const res = await axios.post(
                "http://localhost:5000/api/v1/auth/login",
                values,
                { withCredentials: true }
            );

            // ✅ Store token
            localStorage.setItem("accessToken", res.data.data.accessToken);

            // ✅ Success toast
            toast.success(res.data.message || "Login successful");

            // ✅ Redirect & reload to refresh navbar
            router.push("/");
            setTimeout(() => {
                router.push("/");
                window.location.reload();

            }, 300);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Login error:", err);
            toast.error(err.response?.data?.message || "Login failed");
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-black via-gray-900 to-black px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-pink-500/20"
            >
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img
                        src="https://i.postimg.cc/2yCFrQfq/jab-logo-jab-letter-jab-letter-logo-design-initials-jab-logo-linked-with-circle-and-uppercase-monogr.jpg"
                        alt="Logo"
                        className="w-20 h-20 rounded-full border-2 border-pink-500"
                    />
                </div>

                <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-6">
                    Login
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-pink-400" />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email")}
                            className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-pink-400 focus:ring focus:ring-pink-400 transition"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-pink-400" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...register("password")}
                            className="w-full pl-10 pr-10 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-pink-400 focus:ring focus:ring-pink-400 transition"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-gray-400 hover:text-pink-400"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>

                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded-lg bg-gradient-to-r from-pink-400 to-purple-400 hover:from-purple-400 hover:to-pink-400 text-black font-medium shadow-lg transition disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-gray-400 mt-4 text-sm">
                    Don’t have an account?{" "}
                    <Link href="/register" className="text-pink-400 hover:underline">
                        Register
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
