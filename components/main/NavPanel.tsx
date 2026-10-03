"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/main/ThemeToggle";
import { motion, useScroll, useSpring } from "framer-motion";

const links = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/projects", label: "work" },
  { href: "/blog", label: "writing" },
  { href: "/reads", label: "reads" },
];

export function NavPanel() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const triggerCommandPalette = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
    );
  };

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-50 select-none flex justify-center pointer-events-none">
      <div 
        className="flex items-center justify-between sm:justify-start gap-1 px-2 py-1.5 relative overflow-hidden w-full sm:w-auto pointer-events-auto rounded-full"
        style={{
          background: "rgba(17, 17, 17, 0.90)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid var(--line-strong)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6), 0 1px 3px rgba(0, 0, 0, 0.4)",
        }}
      >
        {/* Scroll Progress Indicator */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1.5px]"
          style={{ 
            background: "var(--accent)", 
            scaleX, 
            transformOrigin: "0%" 
          }}
        />

        <nav aria-label="Primary Navigation" className="flex items-center">
          {links.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch={true}
                className="relative flex items-center justify-center px-2.5 sm:px-3.5 min-h-[44px] sm:min-h-[36px] py-1 text-[12px] sm:text-[13px] font-medium no-underline transition-all duration-200 ease-out rounded-full"
                style={{
                  color: active ? "var(--text-primary)" : "var(--text-secondary)",
                  background: active ? "rgba(240, 238, 233, 0.08)" : "transparent",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "0.01em",
                }}
              >
                {active && (
                  <span 
                    className="w-1.5 h-1.5 rounded-full mr-1.5 hidden sm:inline-block"
                    style={{ background: "var(--accent)" }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div
          className="w-[1px] h-4 mx-1 flex-shrink-0"
          style={{ background: "var(--line)" }}
        />

        {/* Command Palette Trigger */}
        <button
          onClick={triggerCommandPalette}
          className="flex items-center gap-1 px-2 min-h-[44px] sm:min-h-[36px] py-1 text-[11px] rounded-full transition-colors cursor-pointer"
          style={{
            color: "var(--text-secondary)",
            fontFamily: "var(--font-mono)",
          }}
          aria-label="Open command palette (Ctrl+K or ⌘K)"
          title="Command Palette (⌘K)"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span className="hidden sm:inline text-[10px] opacity-75">⌘K</span>
        </button>

        {/* Divider */}
        <div
          className="w-[1px] h-4 mx-0.5 flex-shrink-0"
          style={{ background: "var(--line)" }}
        />

        <ThemeToggle />
      </div>
    </div>
  );
}
