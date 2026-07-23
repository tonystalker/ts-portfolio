"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { RxTwitterLogo } from "react-icons/rx";

export function ContactCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("707ayushtripathi@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="w-full relative overflow-hidden group"
      style={{
        borderRadius: "24px",
        border: "1px solid var(--border)",
        background: "var(--glass)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
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

      <div className="p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center text-center relative z-10">
        
        {/* Availability Badge */}
        <div 
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
          style={{ 
            background: "var(--bg)", 
            border: "1px solid var(--border)",
            fontFamily: "var(--font-mono)",
          }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-medium uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            Available for hire
          </span>
        </div>

        {/* Heading */}
        <h2 
          className="text-[28px] sm:text-[32px] md:text-[40px] font-semibold tracking-[-0.03em] mb-4"
          style={{ color: "var(--text)", fontFamily: "var(--font-sans)" }}
        >
          Let&apos;s build something.
        </h2>
        
        <p 
          className="text-[14px] max-w-sm mb-8"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
        >
          I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
        </p>

        {/* Email Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 rounded-full transition-all duration-200 ease-out hover:scale-105 active:scale-95 w-[90%] sm:w-auto max-w-full"
          style={{
            background: "var(--text)",
            color: "var(--bg)",
            fontFamily: "var(--font-sans)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
          }}
        >
          <span className="text-[13px] sm:text-[14px] font-medium tracking-tight truncate">
            {copied ? "Copied to clipboard!" : "707ayushtripathi@gmail.com"}
          </span>
          {!copied && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          )}
          {copied && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </button>

        {/* Social Links */}
        <div className="flex items-center gap-6 mt-10">
          <a href="https://github.com/tonystalker" target="_blank" rel="noopener noreferrer" className="social-icon-link hover:-translate-y-1 transition-all duration-200">
            <SiGithub size={20} />
          </a>
          <a href="https://x.com/TonyStalkerr" target="_blank" rel="noopener noreferrer" className="social-icon-link hover:-translate-y-1 transition-all duration-200">
            <RxTwitterLogo size={20} />
          </a>
          <a href="https://www.linkedin.com/in/ayush-tripathi-4a062b1b4/" target="_blank" rel="noopener noreferrer" className="social-icon-link hover:-translate-y-1 transition-all duration-200">
            <FaLinkedin size={20} />
          </a>
        </div>

        {/* Response Time Indicator */}
        <div 
          className="mt-8 text-[11px] flex items-center gap-2"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          Responds within 24 hours
        </div>

      </div>
    </div>
  );
}
