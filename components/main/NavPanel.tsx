"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/main/ThemeToggle";

const links = [
  { href: "/", label: "~" },
  { href: "/projects", label: "work" },
  { href: "/blog", label: "blogs" },
];

export function NavPanel() {
  const pathname = usePathname();

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <div className="flex items-center gap-6 px-6 py-3 rounded-full border border-[var(--text)]/20 bg-[var(--bg)]/80 backdrop-blur-md shadow-lg transition-all duration-300">
        <nav aria-label="Primary Navigation" className="flex items-center gap-6">
          {links.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] tracking-widest no-underline transition-all duration-300 relative ${
                  active
                    ? "text-[var(--accent)] font-bold scale-110 drop-shadow-[0_0_8px_var(--accent)]"
                    : "text-[var(--text)] opacity-50 hover:opacity-100 hover:scale-105"
                }`}
              >
                {active ? `[${link.label}]` : link.label}
              </Link>
            );
          })}
        </nav>
        <div className="w-[1px] h-4 bg-[var(--text)]/20" />
        <ThemeToggle />
      </div>
    </div>
  );
}
