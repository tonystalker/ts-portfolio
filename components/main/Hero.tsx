"use client";

import { useState, useEffect } from "react";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { MascotEasterEgg } from "@/components/main/MascotEasterEgg";
import { portfolioConfig } from "@/config/portfolio";
import { HeroTerminalCard } from "@/components/main/HeroTerminalCard";
import { HeroAboutSnippet } from "@/components/main/HeroAboutSnippet";
import { LuHand } from "react-icons/lu";

interface HeroProps {
  settings?: Record<string, string>;
}

export function Hero({ settings = {} }: HeroProps) {
  const [isMascotPlaying, setIsMascotPlaying] = useState(false);

  const handleSayHiToMascot = () => {
    if (isMascotPlaying) return;
    setIsMascotPlaying(true);
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
            
            {/* 1. Tony Stark Quote (Section 2 of revise.md) */}
            <div className="mb-5 flex flex-col gap-1 max-w-[580px]">
              <p 
                className="text-[14px] sm:text-[15px] italic leading-snug"
                style={{ color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}
              >
                “Sometimes you gotta run before you can walk.”
              </p>
              <span 
                className="text-[11px] font-mono tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                - Tony Stark, Iron Man (2008)
              </span>
            </div>

            {/* Eyebrow */}
            <div 
              className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.14em] mb-4 flex items-center gap-2"
              style={{ color: "var(--text-secondary)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--accent)" }} />
              AI SYSTEMS · PRODUCT ENGINEERING · INDIA
            </div>

            {/* Main Thesis Heading */}
            <h1 
              className="font-semibold tracking-[-0.03em] leading-[1.12] mb-5 text-balance"
              style={{
                color: "var(--text-primary)",
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1.75rem, 4vw + 0.5rem, 2.875rem)",
              }}
            >
              I build AI products and systems that hold up after the demo.
            </h1>

            {/* Supporting Copy */}
            <p 
              className="text-[15px] sm:text-[16px] leading-[1.65] mb-8 text-pretty max-w-[560px]"
              style={{ color: "var(--text-body)", fontFamily: "var(--font-sans)" }}
            >
              I work across agent workflows, backend infrastructure, and thoughtful interfaces, turning unclear ideas into software people can actually use.
            </p>

            {/* Action buttons + Mascot wave button */}
            <div className="flex flex-col gap-5 w-full max-w-[580px]">
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="mailto:707ayushtripathi@gmail.com"
                  className="inline-flex items-center justify-center px-4 sm:px-5 py-2.5 min-h-[44px] rounded-lg text-[13px] sm:text-[14px] font-medium transition-all duration-200 cursor-pointer hover:opacity-90"
                  style={{
                    background: "var(--text-primary)",
                    color: "var(--canvas)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  <span>Let&apos;s build something</span>
                </a>

                <a
                  href={portfolioConfig.socials.cal || "https://cal.com/ayush-tripathi/30min"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 sm:px-5 py-2.5 min-h-[44px] rounded-lg text-[13px] sm:text-[14px] font-medium transition-all duration-200 cursor-pointer hover:border-[var(--line-strong)] hover:text-[var(--text-primary)]"
                  style={{
                    background: "var(--surface)",
                    color: "var(--text-primary)",
                    border: "1px solid var(--line)",
                    fontFamily: "var(--font-sans)",
                  }}
                  title="Book a 30-min call"
                >
                  <span>Book a call</span>
                </a>

                {/* Say Hi to Mascot Button */}
                <button
                  type="button"
                  onClick={handleSayHiToMascot}
                  disabled={isMascotPlaying}
                  className="inline-flex items-center justify-center px-4 py-2.5 min-h-[44px] rounded-lg text-[13px] sm:text-[14px] font-medium transition-all duration-200 cursor-pointer group active:scale-[0.98] disabled:cursor-default"
                  style={{
                    background: isMascotPlaying ? "var(--surface-raised)" : "var(--surface)",
                    color: "var(--text-primary)",
                    border: isMascotPlaying ? "1px solid var(--accent)" : "1px solid var(--line)",
                    fontFamily: "var(--font-sans)",
                  }}
                  title="Say Hi to mascot"
                >
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className={`absolute inline-flex h-full w-full rounded-full ${isMascotPlaying ? "bg-amber-400 animate-ping opacity-75" : "bg-emerald-400 opacity-75"}`} />
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${isMascotPlaying ? "bg-amber-400" : "bg-emerald-400"}`} />
                  </span>
                  <span>Say Hi to mascot</span>
                  <LuHand className={`ml-1.5 w-4 h-4 text-[var(--accent)] inline-block transition-transform ${isMascotPlaying ? "rotate-12 animate-pulse" : "group-hover:rotate-12"}`} />
                </button>
              </div>

              {/* Interesting Highlight from About Section */}
              <div className="w-full mt-1">
                <HeroAboutSnippet />
              </div>
            </div>

          </div>

          {/* ── Right Column: Terminal Status Card, Social Tiles & Recent PRs (5 cols) ── */}
          <div className="lg:col-span-5 w-full mt-6 lg:mt-0 flex justify-center lg:justify-end">
            <HeroTerminalCard />
          </div>

        </div>

        {/* Mascot Easter Egg (one-time interactive playback on button click) */}
        <MascotEasterEgg
          isPlaying={isMascotPlaying}
          onEnded={() => setIsMascotPlaying(false)}
        />
      </m.div>
    </LazyMotion>
  );
}
