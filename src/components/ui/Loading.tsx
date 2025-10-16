"use client";

import { motion } from "framer-motion";
import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-gradient-to-b from-black via-[#0a0a0a] to-[#1a0a0a] text-white">
      {/* Floating Glow Orbs */}
      <motion.div
        className="absolute w-80 h-80 bg-pink-500/20 rounded-full blur-3xl top-10 left-[-100px]"
        animate={{ x: [0, 80, -80, 0], y: [0, -50, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-purple-600/20 rounded-full blur-3xl bottom-10 right-[-120px]"
        animate={{ x: [0, -80, 80, 0], y: [0, 50, -50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Animated Loader Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [1, 1.1, 1], opacity: 1, rotate: 360 }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "loop",
        }}
      >
        <Loader className="w-14 h-14 text-pink-400 animate-spin drop-shadow-[0_0_20px_rgba(255,0,85,0.5)]" />
      </motion.div>

      {/* Animated Loading Text */}
      <motion.span
        className="mt-6 text-2xl md:text-3xl font-semibold tracking-wider bg-gradient-to-r from-pink-400 via-red-500 to-orange-400 bg-clip-text text-transparent"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        Loading...
      </motion.span>

      {/* Sub Text */}
      <motion.p
        className="mt-4 text-sm text-gray-400"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        Preparing something awesome for you ✨
      </motion.p>
    </div>
  );
};

export default Loading;
