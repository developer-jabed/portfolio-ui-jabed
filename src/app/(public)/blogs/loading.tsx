"use client";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const BlogsLoadingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Floating blobs for background effect */}
      <motion.div
        className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
        animate={{
          x: [0, 100, -100, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>
      <motion.div
        className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
        animate={{
          x: [0, -120, 100, 0],
          y: [0, 50, -50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>

      {/* Loader Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        className="relative z-10"
      >
        <Loader2 className="w-16 h-16 text-pink-400 animate-spin" />
      </motion.div>

      {/* Fancy Loading Text */}
      <motion.h1
        className="mt-8 text-3xl md:text-4xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: [0, 1, 0.7, 1], y: [20, 0, 0, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
      >
        Loading Blogs...
      </motion.h1>

      {/* Sub Text */}
      <motion.p
        className="text-gray-400 mt-4 text-sm md:text-base tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.6, 1] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
      >
        Fetching inspiring stories & tech insights ✨
      </motion.p>
    </div>
  );
};

export default BlogsLoadingPage;
