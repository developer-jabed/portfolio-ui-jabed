"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, User, Clock } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface MessageType {
    id: number;
    name: string;
    email: string;
    content: string;
    createdAt: string;
}

export default function MessagePage() {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch messages from backend
    const fetchMessages = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/message/get`);

            setMessages(res.data.data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to fetch messages");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white p-6 md:p-12">
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

            <h1 className="text-5xl font-bold text-center text-pink-400 mb-12 drop-shadow-lg">
                Messages
            </h1>

            {loading ? (
                <p className="text-center text-gray-400 animate-pulse">Loading messages...</p>
            ) : messages.length === 0 ? (
                <p className="text-center text-gray-400">No messages found.</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 1, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 1, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-pink-500/40 transition"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <User className="w-5 h-5 text-pink-400" />
                                    <p className="font-semibold text-pink-300">{msg.name}</p>
                                </div>

                                <div className="flex items-center gap-2 mb-2">
                                    <Mail className="w-5 h-5 text-pink-400" />
                                    <p className="text-gray-300 text-sm break-all">{msg.email}</p>
                                </div>

                                <p className="text-gray-200 mb-4 line-clamp-4">{msg.content}</p>

                                <div className="flex items-center gap-2 text-gray-400 text-xs">
                                    <Clock className="w-4 h-4" />
                                    <p>{new Date(msg.createdAt).toLocaleString()}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
