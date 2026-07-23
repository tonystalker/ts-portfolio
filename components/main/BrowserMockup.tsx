"use client";

import { useState } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { SiGithub } from "react-icons/si";
export type BrowserVariant = "safari" | "chrome" | "arc";
export type PreviewType = "image" | "video" | "gallery" | "interactive";

interface BrowserMockupProps {
  variant?: BrowserVariant;
  src: string;
  alt: string;
  previewType?: PreviewType;
}

export function BrowserMockup({ variant = "safari", src, alt, previewType = "image" }: BrowserMockupProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Browser Top Bar Styles based on variant
  const renderTopBar = () => {
    switch (variant) {
      case "arc":
        return (
          <div className="flex items-center px-3 py-2 border-b border-[var(--border-secondary)] bg-[var(--glass-elevated)] backdrop-blur-md">
            <div className="flex gap-1.5 opacity-60">
              <div className="w-2.5 h-2.5 rounded-full border border-black/10 dark:border-white/10" />
              <div className="w-2.5 h-2.5 rounded-full border border-black/10 dark:border-white/10" />
              <div className="w-2.5 h-2.5 rounded-full border border-black/10 dark:border-white/10" />
            </div>
            {/* Arc style sidebar notch logic could go here, keeping it minimal for now */}
          </div>
        );
      case "chrome":
        return (
          <div className="flex items-center px-3 py-2 bg-[var(--border-secondary)]">
            <div className="flex gap-1.5 opacity-80">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="mx-auto flex-1 max-w-[60%] ml-4 bg-[var(--bg)] rounded-md h-5 px-3 flex items-center shadow-inner">
              <span className="text-[10px] text-[var(--text-muted)] truncate">{alt}</span>
            </div>
          </div>
        );
      case "safari":
      default:
        return (
          <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--border-secondary)] bg-[var(--glass-elevated)] backdrop-blur-md">
            <div className="flex gap-1.5 opacity-80">
              <div className="w-2.5 h-2.5 rounded-full bg-[#EC6A5E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#F4BF4F]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#61C554]" />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center bg-[var(--bg)] border border-[var(--border)] rounded-md h-5 px-6 opacity-70">
              <span className="text-[10px] text-[var(--text-muted)] truncate">{alt}</span>
            </div>
          </div>
        );
    }
  };

  return (
    <m.div
      className="relative w-full overflow-hidden flex flex-col group/mockup cursor-pointer"
      style={{
        borderRadius: "16px",
        border: "1px solid var(--border)",
        background: "var(--bg-secondary)",
        boxShadow: "var(--shadow-sm)",
      }}
      whileHover={{ y: -2, scale: 1.005 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {renderTopBar()}
      
      {/* Content Area */}
      <div className="relative aspect-video w-full overflow-hidden bg-[var(--border-secondary)]">
        {/* Content handling based on src presence */}
        {src ? (
          <>
            {/* Skeleton Base (Behind Image) */}
            <div className="absolute inset-0 animate-pulse bg-[var(--border)]" />
            
            {previewType === "image" && (
              <Image
                src={src}
                alt={alt}
                fill
                className={`object-cover transition-all duration-700 ease-out z-10 ${
                  isLoaded ? "opacity-100 blur-none" : "opacity-0 blur-xl scale-105"
                } group-hover/mockup:scale-[1.03]`}
                sizes="(max-width: 700px) 100vw, 700px"
                onLoad={() => setIsLoaded(true)}
                // This enables Next.js blur-up, but requires a blurDataURL in production if static.
                // Using placeholder="blur" requires an imported static image or explicit blurDataURL.
                // Since we pass strings from config, we rely on the CSS transition above for the fade/blur effect.
                unoptimized={src.includes("unsplash")}
              />
            )}

            {previewType === "video" && (
              <video
                src={src}
                loop
                muted
                playsInline
                preload="metadata"
                autoPlay={isHovered} // Autoplay on hover (desktop). 
                className={`object-cover w-full h-full transition-all duration-700 ease-out z-10 ${
                  isLoaded ? "opacity-100 blur-none" : "opacity-0 blur-xl scale-105"
                } group-hover/mockup:scale-[1.03]`}
                onLoadedData={() => setIsLoaded(true)}
              />
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--bg)] gap-3 z-10">
             <SiGithub className="text-4xl text-[var(--text-muted)] opacity-30" />
             <span className="text-sm text-[var(--text-muted)] font-mono opacity-40 tracking-wide">
               {alt || "Repository"}
             </span>
          </div>
        )}

        {/* Glass Sweep Reflection */}
        <div className="absolute inset-0 opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden z-20">
          <div className="absolute inset-0 -translate-x-full group-hover/mockup:animate-[glass-sweep_1.5s_ease-out] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
        </div>
      </div>
    </m.div>
  );
}
