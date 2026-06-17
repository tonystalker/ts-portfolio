"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KineticHeading } from "@/components/main/KineticHeading";
import { SpotifyHoverCard } from "@/components/main/SpotifyHoverCard";
import Image from "next/image";

const words = ["ship fast", "learn faster", "break things"];

export function Hero() {
  const [idx, setIdx] = useState(0);
  const [isHoveringPfp, setIsHoveringPfp] = useState(false);
  const pfpRef = useRef<HTMLDivElement>(null);
  const [spotifyData, setSpotifyData] = useState<{ isPlaying: boolean; title?: string; artist?: string; songUrl?: string } | null>(null);

  useEffect(() => {
    fetch("/api/spotify")
      .then((res) => res.json())
      .then((data) => setSpotifyData(data))
      .catch(() => setSpotifyData(null));
  }, []);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 1800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (pfpRef.current && !pfpRef.current.contains(e.target as Node)) {
        setIsHoveringPfp(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className="flex flex-row items-center justify-between w-full select-none"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <div className="flex flex-col gap-4 sm:gap-6">
        <h1 className="sr-only">Ayush Tripathi</h1>
        <KineticHeading
          as="div"
          className="flex flex-wrap text-[48px] sm:text-[64px] leading-[0.95] tracking-tight text-[var(--text)] mt-[-4px]"
        >
          ayush
        </KineticHeading>

        <p className="text-[15px] text-[var(--text)] opacity-50 whitespace-nowrap flex items-center gap-1.5">
          i{" "}
          <span className="inline-block relative overflow-hidden h-[1.1em] w-[7.5rem]">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[idx]}
                className="absolute inset-0 flex items-center"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {words[idx]}
              </motion.span>
            </AnimatePresence>
          </span>
        </p>
      </div>

      {/* Profile photo */}
      <div
        ref={pfpRef}
        className="group relative w-20 h-20 sm:w-28 sm:h-28 flex-shrink-0 cursor-crosshair"
        onMouseEnter={() => setIsHoveringPfp(true)}
        onMouseLeave={() => setIsHoveringPfp(false)}
        onClick={() => setIsHoveringPfp((v) => !v)}
      >
        <div suppressHydrationWarning className="w-full h-full border border-[var(--text)]/20 p-1 bg-[var(--bg)] shadow-[2px_2px_0px_var(--text)] transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:border-[var(--text)] overflow-hidden relative">
          <Image
            src="/heroimage.png"
            alt="Ayush Tripathi – Software Engineer"
            fill
            className="object-cover grayscale mix-blend-luminosity transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 80px, 112px"
            priority
          />
        </div>

        {/* Hover card — "now playing" style */}
        <AnimatePresence>
          {isHoveringPfp && <SpotifyHoverCard data={spotifyData} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
