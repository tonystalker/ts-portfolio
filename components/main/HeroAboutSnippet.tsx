"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface PhilosophyItem {
  id: string;
  name: string;
  quote: string;
}

const PHILOSOPHIES: PhilosophyItem[] = [
  {
    id: "elon-musk",
    name: "Elon Musk",
    quote: "When something is important enough, you do it even if the odds are not in your favor.",
  },
  {
    id: "ms-dhoni",
    name: "MS Dhoni",
    quote: "Don't think about the result. Focus on the process.",
  },
  {
    id: "iron-man",
    name: "Iron Man",
    quote: "Tony Stark was able to build this in a cave! With a box of scraps!",
  },
];

export function HeroAboutSnippet() {
  const [selectedIndex, setSelectedIndex] = useState(2); // Default to Iron Man or first item
  const current = PHILOSOPHIES[selectedIndex];

  return (
    <div
      className="w-full rounded-2xl p-5 sm:p-6 border flex flex-col gap-5 transition-all duration-200"
      style={{
        background: "var(--surface)",
        borderColor: "var(--line)",
      }}
    >
      {/* Header Row: Title & Philosopher Tabs */}
      <div
        className="flex flex-col gap-3 pb-3 border-b"
        style={{ borderColor: "var(--line)" }}
      >
        <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.06em] text-[var(--text-secondary)]">
          PHILOSOPHIES I BELIEVE IN
        </span>

        {/* Tab Switcher Pills - scrollable on mobile */}
        <div className="flex items-center gap-1 bg-[#141416] p-1 rounded-xl border border-white/[0.08] overflow-x-auto scrollbar-none">
          {PHILOSOPHIES.map((item, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`text-[11.5px] sm:text-[12.5px] px-2.5 sm:px-3.5 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap flex-shrink-0 flex-1 text-center ${
                  isSelected
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-white"
                }`}
                title={item.name}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quote Body with Smooth Animation */}
      <div className="min-h-[58px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="w-full"
          >
            <p
              className="text-[16px] sm:text-[18px] font-medium leading-[1.55] text-pretty text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              &ldquo;{current.quote}&rdquo;
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Link */}
      <div className="flex items-center justify-end w-full pt-1">
        <Link
          href="/about"
          className="text-[13px] text-[var(--text-secondary)] hover:text-white transition-colors inline-flex items-center gap-1 group font-medium"
        >
          <span>Read full story</span>
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </div>
  );
}
