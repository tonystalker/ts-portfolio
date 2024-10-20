"use client";
import React from "react";
import { motion } from "framer-motion";
import { slideInFromLeft } from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";

const SkillText = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <motion.div
        variants={slideInFromLeft(0.5)}
        className="text-center mb-[15px] relative"
      >
        <SparklesIcon className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-purple-400 w-8 h-8 animate-pulse" />

        <h2 className="text-[30px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mt-[10px]">
          Tools in my arsenal
        </h2>

        <motion.div
          animate={{ x: [0, 300, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-20 w-[80px] h-full rounded-full pointer-events-none"
        />
      </motion.div>
    </div>
  );
};

export default SkillText;
