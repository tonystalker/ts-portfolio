"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import Image from "next/image";

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
        ></motion.div>

        <motion.h1
          variants={slideInFromLeft(0.8)}
          className="text-5xl font-extrabold bg-gradient-to-r from-white via-purple-400 to-pink-600 text-transparent bg-clip-text leading-tight tracking-wide"
        >
          Hi, I&apos;m
        </motion.h1>

        <motion.h2
          variants={slideInFromLeft(0.8)}
          className="text-5xl font-extrabold leading-tight tracking-wide bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text"
        >
          Ayush Tripathi
        </motion.h2>

        <motion.p
          variants={slideInFromLeft(0.9)}
          className="text-base text-gray-400 mt-4 max-w-[600px] leading-relaxed"
        >
          A Web3 developer with experience in full stack development and a
          passion for decentralized tech. I&apso;m an engineering student and a
          degen, I love building innovative products and exploring the world of
          crypto. Let&apos;s shape the future of Web3!
        </motion.p>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center"
      >
        <Image
          src="/mainIconsdark.svg"
          alt="work icons"
          height={650}
          width={650}
          className="transform hover:scale-105 transition-transform duration-500"
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
