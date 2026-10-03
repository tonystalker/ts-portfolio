"use client";

import { useState, useEffect, useRef } from "react";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { SpotifyHoverCard } from "@/components/main/SpotifyHoverCard";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  settings?: Record<string, string>;
}

export function Hero({ settings = {} }: HeroProps) {
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

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex flex-col"
      >
        {/* Two-column layout on desktop: Thesis left, Evidence module right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full">
          
          {/* ── Left Column: Thesis & Call to Action (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Eyebrow */}
            <div 
              className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.14em] mb-4 sm:mb-5 flex items-center gap-2"
              style={{ color: "var(--text-secondary)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--accent)" }} />
              AI SYSTEMS · PRODUCT ENGINEERING · INDIA
            </div>

            {/* Main Thesis Heading */}
            <h1 
              className="text-[32px] sm:text-[42px] lg:text-[46px] font-semibold tracking-[-0.03em] leading-[1.12] mb-6 text-balance"
              style={{ color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}
            >
              I build AI products and systems that hold up after the demo.
            </h1>

            {/* Supporting Copy */}
            <p 
              className="text-[15px] sm:text-[16px] leading-[1.65] mb-8 text-pretty max-w-[560px]"
              style={{ color: "var(--text-body)", fontFamily: "var(--font-sans)" }}
            >
              I work across agent workflows, backend infrastructure, and thoughtful interfaces—turning unclear ideas into software people can actually use.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#projects"
                onClick={scrollToProjects}
                className="inline-flex items-center justify-center px-4 sm:px-5 py-2.5 rounded-lg text-[13px] sm:text-[14px] font-medium transition-all duration-200 cursor-pointer"
                style={{
                  background: "var(--text-primary)",
                  color: "var(--canvas)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                View selected work
                <span className="ml-2 text-[14px]">↓</span>
              </a>

              <a
                href="mailto:707ayushtripathi@gmail.com"
                className="inline-flex items-center justify-center px-4 sm:px-5 py-2.5 rounded-lg text-[13px] sm:text-[14px] font-medium transition-all duration-200"
                style={{
                  background: "var(--surface)",
                  color: "var(--text-primary)",
                  border: "1px solid var(--line-strong)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Let&apos;s build something
                <span className="ml-1.5 text-[14px]" style={{ color: "var(--accent)" }}>↗</span>
              </a>
            </div>
          </div>

          {/* ── Right Column: Quiet Evidence / Status Module (5 cols) ── */}
          <div className="lg:col-span-5 w-full mt-2 lg:mt-0">
            <div 
              className="p-5 sm:p-6 rounded-2xl flex flex-col gap-5 relative overflow-hidden"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {/* Top row: Portrait + Identity info */}
              <div className="flex items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: "var(--line)" }}>
                <div className="flex items-center gap-3.5">
                  <div
                    ref={pfpRef}
                    className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer group"
                    style={{ border: "1px solid var(--line-strong)" }}
                    onMouseEnter={() => setIsHoveringPfp(true)}
                    onMouseLeave={() => setIsHoveringPfp(false)}
                    onClick={() => setIsHoveringPfp((v) => !v)}
                  >
                    <Image
                      src="/heroimage.png"
                      alt="Ayush Tripathi"
                      fill
                      className="object-cover grayscale contrast-125 transition-all duration-300 group-hover:grayscale-0"
                      sizes="48px"
                      priority
                    />
                    <AnimatePresence>
                      {isHoveringPfp && <SpotifyHoverCard data={spotifyData} />}
                    </AnimatePresence>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[14px] font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
                      Ayush Tripathi
                    </span>
                    <span className="text-[11px] font-mono" style={{ color: "var(--text-secondary)" }}>
                      IIT (BHU) · Software & AI
                    </span>
                  </div>
                </div>

                {/* Status Dot */}
                <div 
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider"
                  style={{
                    background: "rgba(200, 214, 106, 0.10)",
                    border: "1px solid rgba(200, 214, 106, 0.25)",
                    color: "var(--accent)",
                  }}
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: "var(--accent)" }}></span>
                  </span>
                  Available
                </div>
              </div>

              {/* NOW Block */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-mono uppercase tracking-[0.14em] font-semibold" style={{ color: "var(--accent)" }}>
                  NOW
                </span>
                <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}>
                  Building applied-AI products, learning systems design by shipping.
                </p>
              </div>

              {/* PRINCIPLE Block */}
              <div className="flex flex-col gap-1.5 pt-3 border-t" style={{ borderColor: "var(--line)" }}>
                <span className="text-[10px] font-mono uppercase tracking-[0.14em] font-semibold" style={{ color: "var(--text-secondary)" }}>
                  PRINCIPLE
                </span>
                <p className="text-[13px] font-medium leading-relaxed" style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>
                  Move fast. Make it hold.
                </p>
              </div>

              {/* Verified Metrics / Focus points */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t" style={{ borderColor: "var(--line)" }}>
                <div className="flex flex-col p-2.5 rounded-lg" style={{ background: "var(--surface-raised)", border: "1px solid var(--line)" }}>
                  <span className="text-[16px] sm:text-[18px] font-semibold tabular-nums" style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>
                    &lt;150ms
                  </span>
                  <span className="text-[10px] font-mono mt-0.5" style={{ color: "var(--text-secondary)" }}>
                    voice latency
                  </span>
                </div>

                <div className="flex flex-col p-2.5 rounded-lg" style={{ background: "var(--surface-raised)", border: "1px solid var(--line)" }}>
                  <span className="text-[16px] sm:text-[18px] font-semibold tabular-nums" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                    100%
                  </span>
                  <span className="text-[10px] font-mono mt-0.5" style={{ color: "var(--text-secondary)" }}>
                    local execution
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </m.div>
    </LazyMotion>
  );
}
