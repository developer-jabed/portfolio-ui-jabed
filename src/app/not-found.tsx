"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Ghost, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Floating Background Orbs */}
      <motion.div
        className="absolute w-72 h-72 bg-pink-600/20 rounded-full blur-3xl top-20 left-10"
        animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl bottom-20 right-10"
        animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Ghost Icon */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="z-10"
      >
        <Ghost className="w-28 h-28 text-pink-400 drop-shadow-lg" />
      </motion.div>

      {/* 404 Text */}
      <motion.h1
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-8xl font-extrabold tracking-tight mt-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-3 text-2xl font-semibold"
      >
        Oops! Page not found 👀
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-2 text-gray-400 max-w-md text-center"
      >
        Looks like the page you’re looking for doesn’t exist or has been moved.
      </motion.p>

      {/* Home Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <Button
          asChild
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-pink-500/30 transition-all duration-300 flex items-center gap-2"
        >
          <Link href="/">
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
