"use client";

import { useState, useEffect, useRef } from "react";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { SpotifyHoverCard } from "@/components/main/SpotifyHoverCard";
import Image from "next/image";

function SubtitleCycler({ subtitles }: { subtitles: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % subtitles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [subtitles]);

  return (
    <div className="relative h-[24px] overflow-hidden inline-block w-[200px]" style={{ verticalAlign: "bottom" }}>
      <AnimatePresence mode="popLayout">
        <m.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0"
          style={{ color: "var(--accent)" }}
        >
          {subtitles[index]}
        </m.div>
      </AnimatePresence>
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function Hero({ settings }: { settings: Record<string, string> }) {
  const name = settings["About Name"] || "Ayush Tripathi";
  const title = settings["About Title"] || "hey i'm ayush";
  const subtitles = settings["About Subtitles"] ? settings["About Subtitles"].split(",") : ["I build fast", "I ship fast"];
  const availability = settings["Availability"] || "Available for new opportunities";

  const [isHoveringPfp, setIsHoveringPfp] = useState(false);
  const pfpRef = useRef<HTMLDivElement>(null);
  const [spotifyData, setSpotifyData] = useState<{
    isPlaying: boolean;
    title?: string;
    artist?: string;
    songUrl?: string;
  } | null>(null);

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
    <LazyMotion features={domAnimation}>
      {/* Cursor blink keyframe */}
      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>

      <div className="flex flex-col w-full">
        {/* Top Section: Text & Portrait */}
        <m.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-row items-center justify-between w-full"
        >
          <div className="flex flex-col gap-4">
            <h1 className="sr-only">{name}</h1>

            {/* Dynamic Greeting */}
            <div 
              className="text-[13px] tracking-wide uppercase"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
            >
              {getGreeting()}
            </div>

            <div
              className="text-[48px] sm:text-[64px] font-semibold tracking-[-0.03em] leading-[1]"
              style={{ color: "var(--text)", fontFamily: "var(--font-sans)" }}
            >
              {title}
            </div>

            {/* Subtitle Cycler */}
            <div
              className="text-[15px] flex items-center gap-1.5"
              style={{
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.01em",
              }}
            >
              <SubtitleCycler subtitles={subtitles} />
            </div>
          </div>

          {/* Profile photo */}
          <div
            ref={pfpRef}
            className="relative flex-shrink-0 cursor-pointer"
            style={{ width: "80px", height: "80px" }}
            onMouseEnter={() => setIsHoveringPfp(true)}
            onMouseLeave={() => setIsHoveringPfp(false)}
            onClick={() => setIsHoveringPfp((v) => !v)}
          >
            {/* Ambient glow behind profile pic */}
            <div 
              className="absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none"
              style={{
                background: "var(--accent)",
                filter: "blur(20px)",
                opacity: isHoveringPfp ? 0.3 : 0.1,
                transform: "scale(1.2)"
              }}
            />

            <div
              suppressHydrationWarning
              className="w-full h-full overflow-hidden transition-all duration-300 ease-out relative z-10"
              style={{
                borderRadius: "28px",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-md)",
                transform: isHoveringPfp ? "scale(1.05) translateY(-2px)" : "scale(1) translateY(0)",
              }}
            >
              <Image
                src="/heroimage.png"
                alt="Ayush Tripathi – Software Engineer"
                fill
                className="object-cover transition-all duration-500 ease-out grayscale mix-blend-luminosity hover:grayscale-0 hover:mix-blend-normal"
                sizes="80px"
                priority
              />
            </div>

            <AnimatePresence>
              {isHoveringPfp && <SpotifyHoverCard data={spotifyData} />}
            </AnimatePresence>
          </div>
        </m.div>

        {/* Editorial Bio Block */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden group w-full mt-16 mb-12"
          style={{
            borderRadius: "24px",
            border: "1px solid var(--border)",
            background: "var(--glass)",
          }}
        >
          {/* Subtle Background Glow */}
          <div 
            className="absolute -top-32 -right-32 w-64 h-64 rounded-full pointer-events-none transition-opacity duration-500 opacity-20 group-hover:opacity-40"
            style={{
              background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          
          <div className="p-8 sm:p-10 flex flex-col relative z-10">
            <div 
              className="text-[10px] font-medium uppercase tracking-widest mb-6"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
            >
              CURRENTLY
            </div>

            <div className="flex flex-col gap-5 mb-8">
              <p
                className="text-[15px] leading-[1.7]"
                style={{ color: "var(--text)", fontFamily: "var(--font-sans)" }}
              >
                studied ceramic engineering at IIT (BHU).
              </p>
              <p
                className="text-[15px] leading-[1.7]"
                style={{ color: "var(--text)", fontFamily: "var(--font-sans)" }}
              >
                took the mandatory detour through blockchain.
              </p>
              <p
                className="text-[15px] leading-[1.7]"
                style={{ color: "var(--text)", fontFamily: "var(--font-sans)" }}
              >
                now heavily obsessed with AI, agents, and building software that scales.
              </p>
            </div>
            
            <div 
              className="text-[13px]"
              style={{ 
                color: "var(--text-muted)", 
                fontFamily: "var(--font-mono)",
              }}
            >
              generalist engineer · aspiring founder
            </div>
          </div>
        </m.div>

        {/* Availability Badge */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full w-fit"
            style={{ 
              background: "var(--glass)", 
              border: "1px solid var(--border)",
              fontFamily: "var(--font-mono)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-medium" style={{ color: "var(--text-body)" }}>
              {availability}
            </span>
          </div>
        </m.div>
      </div>
    </LazyMotion>
  );
}
