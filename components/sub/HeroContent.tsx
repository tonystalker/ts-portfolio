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
      className="flex flex-col lg:flex-row items-center justify-center px-6 md:px-20 mt-20 md:mt-40 w-full z-[20] gap-8 lg:gap-0"
    >
      <div className="h-full w-full lg:w-1/2 flex flex-col gap-8 justify-center m-auto text-start px-4">
        <motion.div className="space-y-4">
          <motion.div className="space-y-2">
            <motion.h1
              variants={slideInFromLeft(0.5)}
              className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight"
            >
              Hi, I&apos;m
            </motion.h1>
            
            <motion.h2
              variants={slideInFromLeft(0.6)}
              className="text-4xl md:text-7xl font-extrabold leading-tight tracking-tight"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 animate-gradient">
                Ayush Tripathi
              </span>
            </motion.h2>
          </motion.div>
          
          <motion.div
            variants={slideInFromLeft(0.7)}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-gradient-to-r from-purple-900/10 to-pink-900/10 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-4 md:p-8">
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-medium">
                I&apos;m a developer who loves building  full-stack apps, backend systems, and Web3 tooling.
              </p>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed mt-4">
                Engineering student at IIT (BHU), currently exploring crypto, systems design, and everything that helps products scale.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.8)}
          className="flex flex-wrap gap-4 mt-8"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300"
          >
            <span className="relative z-10">View Projects</span>
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.a>
          
          <motion.a
            href="/22035017_Ayush _Tripathi _sdc (3).pdf"
            download="Ayush_Tripathi_Resume.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 border-2 border-purple-500 text-purple-300 font-semibold rounded-full hover:bg-purple-500/10 hover:border-purple-400 hover:text-white transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download CV</span>
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        variants={slideInFromRight(0.6)}
        className="w-full lg:w-1/2 h-full flex justify-center items-center mt-8 lg:mt-0"
      >
        <div className="relative">
          {/* Animated background orbs */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-32 md:w-64 h-32 md:h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute w-32 md:w-64 h-32 md:h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute w-32 md:w-64 h-32 md:h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>
          
          {/* Main icon with enhanced effects */}
          <div className="relative transform hover:scale-110 transition-transform duration-700">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <Image
              src="/mainIconsdark.svg"
              alt="work icons"
              height={400}
              width={400}
              className="relative drop-shadow-2xl animate-float w-full h-auto max-w-[400px]"
              loading="eager"
              priority={true}
              sizes="(max-width: 768px) 300px, (max-width: 1024px) 350px, 400px"
            />
          </div>
          
          {/* Floating particles */}
          <div className="absolute top-10 left-10 w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-3 h-3 bg-pink-400 rounded-full animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-10 left-20 w-5 h-5 bg-cyan-400 rounded-full animate-pulse"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
