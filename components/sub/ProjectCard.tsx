"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Props {
  src: string;
  title: string;
  description: string;
  link: string;
  tech: string[];
  featured: boolean;
  index: number;
}

const ProjectCard = ({ src, title, description, link, tech, featured, index }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="group relative w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute -top-3 -right-3 z-30 transform translate-z-20" style={{ transform: "translateZ(20px)" }}>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Featured
          </div>
        </div>
      )}

      <div
        className="relative h-full bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-400/40 flex flex-col"
        style={{ transform: "translateZ(0px)" }}
      >
        {/* Image container with overlay */}
        <div className="relative h-48 overflow-hidden shrink-0">
          <Link href={link} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
            {/* Skeleton loader */}
            {!isLoaded && (
              <div className="absolute inset-0 bg-gray-700/50 animate-pulse" />
            )}
            <Image
              src={src}
              alt={title}
              width={1000}
              height={1000}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* View project overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-white font-semibold flex items-center gap-2">
                  View Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-3 flex-grow">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300 font-heading">
              {title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>

          {/* Technology tags */}
          <div className="flex flex-wrap gap-2 mb-4 mt-auto">
            {tech.map((technology, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-1 bg-purple-500/10 border border-purple-400/30 rounded-full text-xs text-purple-200 font-medium hover:bg-purple-500/20 transition-colors duration-300"
              >
                {technology}
              </span>
            ))}
          </div>

          {/* Link button */}
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-purple-300 hover:text-white text-sm font-medium transition-colors duration-300 group/link mt-2"
          >
            <span>Explore Project</span>
            <svg className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Animated border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
