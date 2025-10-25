"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { AuthProvider } from "@/components/modules/Auth/context/AuthContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {loading ? (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white overflow-hidden"
                >
                    {/* --- Animated Logo / Name --- */}
                    <motion.h1
                        className="text-4xl md:text-5xl font-extrabold tracking-wide"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="text-cyan-400">Jabed</span> Islam
                    </motion.h1>

                    {/* --- Subheading --- */}
                    <motion.p
                        className="mt-2 text-sm md:text-base text-gray-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        Full Stack Web Developer | MERN | Next.js | TypeScript
                    </motion.p>

                    {/* --- Rotating Loader --- */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                        className="mt-8"
                    >
                        <Loader2 className="w-14 h-14 text-cyan-400" />
                    </motion.div>

                    {/* --- Typing Text --- */}
                    <motion.div
                        className="mt-6 text-lg md:text-xl font-medium text-gray-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <TypingText text="Building digital experiences that inspire 🚀" speed={70} />
                    </motion.div>

                    {/* --- Progress Bar --- */}
                    <motion.div
                        className="w-64 md:w-80 h-2 bg-gray-700 rounded-full mt-8 overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <motion.div
                            className="h-2 bg-cyan-400 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2.5, ease: "easeInOut" }}
                        />
                    </motion.div>

                    {/* --- Footer Quote --- */}
                    <motion.p
                        className="absolute bottom-8 text-sm text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                    >
                       &quot;Good things take time — your experience is loading ✨&quot;
                    </motion.p>
                </motion.div>
            ) : (
                <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <AuthProvider>{children}</AuthProvider>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/* ----------------------------------------------------------
   ⌨️ Typing Effect Component
----------------------------------------------------------- */
function TypingText({ text, speed = 80 }: { text: string; speed?: number }) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText((prev) => prev + text.charAt(i));
            i++;
            if (i >= text.length) clearInterval(interval);
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed]);

    return <span>{displayedText}</span>;
}
