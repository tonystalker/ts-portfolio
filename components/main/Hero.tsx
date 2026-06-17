"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KineticHeading } from "@/components/main/KineticHeading";
import { SpotifyHoverCard } from "@/components/main/SpotifyHoverCard";
import Image from "next/image";

const words = ["ship fast", "learn faster", "break things"];

function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[idx];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setIdx((i) => (i + 1) % words.length);
        }
      }
    }, isDeleting ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [displayText, idx, isDeleting]);

  return (
    <span className="text-[var(--accent)] font-bold font-mono ml-1">
      {displayText}<span className="animate-[pulse_0.8s_ease-in-out_infinite] ml-[2px]">█</span>
    </span>
  );
}

export function Hero() {
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

        <p className="text-[15px] text-[var(--text)] opacity-50 whitespace-nowrap flex items-center gap-1.5 h-[1.1em]">
          i <Typewriter />
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
