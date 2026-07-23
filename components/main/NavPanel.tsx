"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/main/ThemeToggle";
import { motion, useScroll, useSpring } from "framer-motion";

const links = [
  { href: "/", label: "home" },
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

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-50 select-none flex justify-center pointer-events-none">
      <div className="nav-pill flex items-center justify-between sm:justify-start gap-1 sm:gap-1 px-1.5 sm:px-2 py-1.5 sm:py-2 relative overflow-hidden w-full sm:w-auto pointer-events-auto">
        {/* Scroll Progress Indicator */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px]"
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
                className="relative flex items-center justify-center flex-1 sm:flex-none px-2 sm:px-4 min-h-[44px] sm:min-h-0 py-2 sm:py-1.5 text-[12px] sm:text-[13px] font-medium no-underline transition-all duration-200 ease-out rounded-full"
                style={{
                  color: active ? "var(--accent)" : "var(--text-muted)",
                  background: active ? "rgba(94,139,255,0.10)" : "transparent",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "0.01em",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div
          className="w-[1px] h-4 mx-0.5 sm:mx-1 flex-shrink-0"
          style={{ background: "var(--border)" }}
        />

        <ThemeToggle />
      </div>
    </div>
  );
}
