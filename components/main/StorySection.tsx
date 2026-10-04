"use client";

import Link from "next/link";
import { portfolioConfig } from "@/config/portfolio";

interface StorySectionProps {
  compact?: boolean;
}

export function StorySection({ compact = true }: StorySectionProps) {
  const { shortAbout, fullStory, personalDetail } = portfolioConfig.about;

  if (compact) {
    return (
      <div className="w-full flex flex-col gap-5 select-text">
        {/* Short About: 2-3 clear, grounded editorial paragraphs */}
        <div className="flex flex-col gap-3.5 text-[15px] sm:text-[16px] leading-[1.7] max-w-[760px]" style={{ color: "var(--text-body)", fontFamily: "var(--font-sans)" }}>
          {shortAbout.map((para, i) => (
            <p key={i} className="text-pretty">
              {para}
            </p>
          ))}
        </div>

        {/* Concise Story Highlight: 2 GB Android Studio Moment (Section 4 of revise.md) */}
        <div 
          className="p-4 sm:p-5 rounded-xl border flex items-start gap-3.5 max-w-[760px] my-1"
          style={{
            background: "var(--surface)",
            borderColor: "var(--line)",
          }}
        >
          <span 
            className="text-[11px] font-mono px-2 py-0.5 rounded font-bold shrink-0 mt-0.5" 
            style={{ background: "var(--surface-raised)", color: "var(--accent)", border: "1px solid var(--line)" }}
          >
            02
          </span>
          <div className="flex flex-col gap-1">
            <span className="text-[13px] sm:text-[13.5px] font-semibold" style={{ color: "var(--text-primary)" }}>
              The 2 GB Android Studio Moment
            </span>
            <p className="text-[12.5px] sm:text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
              Installing Android Studio on a 2 GB RAM computer and crashing emulators taught an early, practical lesson: ambition and available memory are not the same thing. The constraint didn&apos;t end the interest; it taught resourcefulness.
            </p>
          </div>
        </div>

        {/* Link to dedicated /about route */}
        <div className="pt-2">
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-[12.5px] sm:text-[13px] font-mono hover:underline transition-colors"
            style={{ color: "var(--accent)" }}
          >
            <span>Read the full route into systems &amp; AI</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    );
  }

  // Full Story View (for /about)
  return (
    <div className="w-full flex flex-col gap-8 select-text">
      {/* Short About intro */}
      <div className="flex flex-col gap-4 text-[15px] sm:text-[16px] leading-[1.7] max-w-[760px]" style={{ color: "var(--text-body)", fontFamily: "var(--font-sans)" }}>
        {shortAbout.map((para, i) => (
          <p key={i} className="text-pretty">
            {para}
          </p>
        ))}
      </div>

      <div 
        className="mt-4 p-6 sm:p-8 rounded-2xl flex flex-col gap-8"
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
          {fullStory.chapters.map((chapter) => (
            <div key={chapter.num} className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start">
              <span 
                className="text-[12px] font-mono font-bold px-2 py-0.5 rounded shrink-0" 
                style={{ background: "var(--surface-raised)", color: "var(--accent)", border: "1px solid var(--line)" }}
              >
                {chapter.num}
              </span>
              <div className="flex flex-col gap-1.5 flex-1">
                <h3 className="text-[15px] font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
                  {chapter.title}
                </h3>
                <div className="text-[14px] leading-[1.7] text-pretty flex flex-col gap-3" style={{ color: "var(--text-body)" }}>
                  {chapter.content.split("\n\n").map((chunk, idx) => (
                    <p key={idx}>{chunk}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pull Quote */}
        <blockquote 
          className="my-2 p-5 sm:p-6 rounded-xl border-l-2 flex flex-col gap-2"
          style={{
            background: "var(--surface-raised)",
            borderColor: "var(--accent)",
          }}
        >
          <p className="text-[15px] sm:text-[16px] italic leading-relaxed" style={{ color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}>
            {fullStory.quote.text}
          </p>
          <cite className="text-[11px] font-mono not-italic uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
            - {fullStory.quote.author}
          </cite>
        </blockquote>

        {/* Closing Principle & Footnote */}
        <div className="pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderColor: "var(--line)" }}>
          <p className="text-[14px] font-semibold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>
            {fullStory.closing}
          </p>

          {/* Small personal footnote */}
          <span className="text-[11px] font-mono max-w-[400px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {personalDetail}
          </span>
        </div>
      </div>
    </div>
  );
}
