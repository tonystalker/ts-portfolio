"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

interface Props {
  src: string;
  width: number;
  height: number;
  index: number;
}

const SkillDataProvider = ({ src, width, height, index }: Props) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const animationDelay = 0.3;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      variants={imageVariants}
      animate={inView ? "visible" : "hidden"}
      custom={index}
      transition={{
        delay: index * animationDelay,
        duration: 0.5,
        ease: "easeOut"
      }}
    >
      <div className="relative">
        {/* Skeleton loader */}
        {!isLoaded && (
          <div
            className="absolute inset-0 bg-gray-700/50 rounded-lg animate-pulse"
            style={{ width, height }}
          />
        )}
        <Image
          src={src}
          width={width}
          height={height}
          alt="skill image"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          sizes="(max-width: 768px) 60px, (max-width: 1024px) 70px, 80px"
        />
      </div>
    </motion.div>
  );
};

export default SkillDataProvider;
