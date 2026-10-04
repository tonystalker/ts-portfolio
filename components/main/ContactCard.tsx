"use client";

import { useState } from "react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiCheck } from "react-icons/fi";

export function ContactCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("707ayushtripathi@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="w-full py-12 sm:py-16 px-6 sm:px-10 rounded-2xl flex flex-col items-start justify-between relative overflow-hidden"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
      }}
    >
      <div className="flex flex-col gap-3 max-w-xl">
        <span 
          className="text-[11px] font-mono uppercase tracking-[0.14em]"
          style={{ color: "var(--accent)" }}
        >
          CONTACT & COLLABORATION
        </span>

        <h2 
          className="text-[26px] sm:text-[34px] md:text-[38px] font-semibold tracking-[-0.02em] leading-[1.18]"
          style={{ color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}
        >
          Have a hard product or systems problem?
          <span className="block text-[var(--text-secondary)] font-normal mt-1">
            Let’s make it reliable.
          </span>
        </h2>
      </div>

      <div className="flex flex-wrap items-start gap-3 mt-8 w-full">
        {/* Prominent Mail Link */}
        <a
          href="mailto:707ayushtripathi@gmail.com"
          className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-[12px] sm:text-[13px] md:text-[14px] font-medium transition-all min-w-0 shrink-0"
          style={{
            background: "var(--text-primary)",
            color: "var(--canvas)",
            fontFamily: "var(--font-sans)",
          }}
        >
          <span className="truncate">707ayushtripathi@gmail.com</span>
          <span className="text-[14px] flex-shrink-0">↗</span>
        </a>

        {/* Book a Call Link */}
        <a
          href="https://cal.com/ayush-tripathi/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-[13px] sm:text-[14px] font-medium transition-all duration-200 cursor-pointer hover:border-[var(--line-strong)] flex-shrink-0"
          style={{
            background: "var(--surface-raised)",
            color: "var(--text-primary)",
            border: "1px solid var(--line)",
            fontFamily: "var(--font-sans)",
          }}
        >
          <span>Book a call</span>
          <span className="text-[13px]">↗</span>
        </a>

        <button
          onClick={handleCopy}
          className="text-[12px] font-mono transition-colors cursor-pointer py-1 inline-flex items-center gap-1.5 flex-shrink-0"
          style={{ color: "var(--text-secondary)" }}
          aria-label="Copy email address"
        >
          {copied ? (
            <>
              <FiCheck className="text-emerald-400" size={13} />
              <span>Copied to clipboard</span>
            </>
          ) : (
            "Click to copy"
          )}
        </button>

        {/* Small secondary links */}
        <div className="flex items-center gap-5 ml-auto pt-0 border-t-0 w-auto" style={{ borderColor: "var(--line)" }}>
          <a 
            href="https://github.com/tonystalker" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="GitHub profile"
          >
            <SiGithub size={18} />
          </a>
          <a 
            href="https://x.com/TonyStalkerr" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="X profile"
          >
            <FaXTwitter size={17} />
          </a>
          <a 
            href="https://www.linkedin.com/in/ayush-tripathi-4a062b1b4/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="LinkedIn profile"
          >
            <FaLinkedin size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
