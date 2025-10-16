"use client";

import { motion } from "framer-motion";

const sliderTexts = [
    "Hello, I am Jabed",
    "I am a Fullstack Developer",
    "I create modern apps",
    "I love building web solutions with MERN & Next.js",
];

export default function AboutTextSlider() {
    return (
        <div className="overflow-hidden w-full mt-12 mb-12">
            <motion.div
                className="flex gap-10 whitespace-nowrap text-2xl md:text-3xl font-semibold text-pink-400"
                animate={{ x: ["100%", "-100%"] }}
                transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 15,
                    ease: "linear",
                }}
            >
                {sliderTexts.map((text, index) => (
                    <span key={index} className="mx-4">
                        {text}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
