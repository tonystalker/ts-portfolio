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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 select-none">
      <div className="nav-pill flex items-center gap-1 px-2 py-2 relative overflow-hidden">
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
                className="relative px-4 py-1.5 text-[13px] font-medium no-underline transition-all duration-200 ease-out rounded-full"
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
          className="w-[1px] h-4 mx-1"
          style={{ background: "var(--border)" }}
        />

        <ThemeToggle />
      </div>
    </div>
  );
}
