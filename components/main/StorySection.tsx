"use client";

import { useState } from "react";
import { portfolioConfig } from "@/config/portfolio";
import { motion, AnimatePresence } from "framer-motion";

interface StorySectionProps {
  initialExpanded?: boolean;
}

export function StorySection({ initialExpanded = false }: StorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const { shortAbout, fullStory, personalDetail } = portfolioConfig.about;

  return (
    <div className="w-full flex flex-col gap-6 select-text">
      {/* Short About — 3 clear, grounded editorial paragraphs */}
      <div className="flex flex-col gap-4 text-[15px] sm:text-[16px] leading-[1.7] max-w-[720px]" style={{ color: "var(--text-body)", fontFamily: "var(--font-sans)" }}>
        {shortAbout.map((para, i) => (
          <p key={i} className="text-pretty">
            {para}
          </p>
        ))}
      </div>

      {/* Toggle Button for Full Story */}
      <div className="pt-2 flex items-center gap-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-mono px-3.5 py-1.5 rounded-md transition-all duration-200 cursor-pointer"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line-strong)",
            color: "var(--text-primary)",
          }}
          aria-expanded={isExpanded}
          aria-controls="full-story-content"
        >
          <span style={{ color: "var(--accent)" }}>{isExpanded ? "−" : "+"}</span>
          <span>{isExpanded ? "Close story" : "Read how I got here (chapters 01–06)"}</span>
        </button>

        <span className="text-[11px] font-mono" style={{ color: "var(--text-secondary)" }}>
          {isExpanded ? "Complete route into systems & AI" : "Java → Android Studio on 4GB → JEE → Crypto → Go → Applied AI"}
        </span>
      </div>

      {/* Expandable Full Story */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id="full-story-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div 
              className="mt-6 p-6 sm:p-8 rounded-2xl flex flex-col gap-8"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
              }}
            >
              {/* Opening Lead */}
              <div className="flex flex-col gap-2 pb-6 border-b" style={{ borderColor: "var(--line)" }}>
                <span className="text-[11px] font-mono uppercase tracking-[0.14em]" style={{ color: "var(--accent)" }}>
                  {fullStory.heading}
                </span>
                <p className="text-[16px] sm:text-[17px] font-medium leading-[1.65]" style={{ color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}>
                  {fullStory.opening}
                </p>
              </div>

              {/* Chapters Flow */}
              <div className="flex flex-col gap-8">
                {/* 01 — The first compiler */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start">
                  <span className="text-[12px] font-mono font-bold px-2 py-0.5 rounded" style={{ background: "var(--surface-raised)", color: "var(--accent)" }}>
                    {fullStory.chapters[0].num}
                  </span>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <h3 className="text-[15px] font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
                      {fullStory.chapters[0].title}
                    </h3>
                    <p className="text-[14px] leading-[1.7] text-pretty" style={{ color: "var(--text-body)" }}>
                      {fullStory.chapters[0].content}
                    </p>
                  </div>
                </div>

                {/* 02 — Building with what I had */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start">
                  <span className="text-[12px] font-mono font-bold px-2 py-0.5 rounded" style={{ background: "var(--surface-raised)", color: "var(--accent)" }}>
                    {fullStory.chapters[1].num}
                  </span>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <h3 className="text-[15px] font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
                      {fullStory.chapters[1].title}
                    </h3>
                    <p className="text-[14px] leading-[1.7] text-pretty" style={{ color: "var(--text-body)" }}>
                      {fullStory.chapters[1].content}
                    </p>
                  </div>
                </div>

                {/* Recommended Single External Pull Quote — Tony Stark (Iron Man 2008) */}
                <blockquote 
                  className="my-2 p-5 sm:p-6 rounded-xl border-l-2 flex flex-col gap-2"
                  style={{
                    background: "rgba(200, 214, 106, 0.04)",
                    borderColor: "var(--accent)",
                  }}
                >
                  <p className="text-[15px] sm:text-[16px] italic leading-relaxed" style={{ color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}>
                    {fullStory.quote.text}
                  </p>
                  <cite className="text-[11px] font-mono not-italic uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                    — {fullStory.quote.author}
                  </cite>
                </blockquote>

                {/* 03 — The detour */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start">
                  <span className="text-[12px] font-mono font-bold px-2 py-0.5 rounded" style={{ background: "var(--surface-raised)", color: "var(--accent)" }}>
                    {fullStory.chapters[2].num}
                  </span>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <h3 className="text-[15px] font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
                      {fullStory.chapters[2].title}
                    </h3>
                    <p className="text-[14px] leading-[1.7] text-pretty" style={{ color: "var(--text-body)" }}>
                      {fullStory.chapters[2].content}
                    </p>
                  </div>
                </div>

                {/* 04 — Python, crypto, and a small bet */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start">
                  <span className="text-[12px] font-mono font-bold px-2 py-0.5 rounded" style={{ background: "var(--surface-raised)", color: "var(--accent)" }}>
                    {fullStory.chapters[3].num}
                  </span>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <h3 className="text-[15px] font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
                      {fullStory.chapters[3].title}
                    </h3>
                    <div className="text-[14px] leading-[1.7] text-pretty flex flex-col gap-3" style={{ color: "var(--text-body)" }}>
                      {fullStory.chapters[3].content.split("\n\n").map((chunk, idx) => (
                        <p key={idx}>{chunk}</p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 05 — Web3 to systems */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start">
                  <span className="text-[12px] font-mono font-bold px-2 py-0.5 rounded" style={{ background: "var(--surface-raised)", color: "var(--accent)" }}>
                    {fullStory.chapters[4].num}
                  </span>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <h3 className="text-[15px] font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
                      {fullStory.chapters[4].title}
                    </h3>
                    <div className="text-[14px] leading-[1.7] text-pretty flex flex-col gap-3" style={{ color: "var(--text-body)" }}>
                      {fullStory.chapters[4].content.split("\n\n").map((chunk, idx) => (
                        <p key={idx}>{chunk}</p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 06 — What I build now */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start">
                  <span className="text-[12px] font-mono font-bold px-2 py-0.5 rounded" style={{ background: "var(--surface-raised)", color: "var(--accent)" }}>
                    {fullStory.chapters[5].num}
                  </span>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <h3 className="text-[15px] font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
                      {fullStory.chapters[5].title}
                    </h3>
                    <div className="text-[14px] leading-[1.7] text-pretty flex flex-col gap-3" style={{ color: "var(--text-body)" }}>
                      {fullStory.chapters[5].content.split("\n\n").map((chunk, idx) => (
                        <p key={idx}>{chunk}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Closing Principle */}
              <div className="pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderColor: "var(--line)" }}>
                <p className="text-[14px] font-semibold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>
                  {fullStory.closing}
                </p>

                {/* Small personal footnote */}
                <span className="text-[11px] font-mono max-w-[400px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {personalDetail}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
