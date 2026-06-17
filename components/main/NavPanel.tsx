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
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <div
        className="w-full flex items-center justify-between px-5 py-4"
        style={{ maxWidth: "700px" }}
      >
        <nav aria-label="Primary Navigation" className="flex items-center gap-8 sm:gap-12">
          {links.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] tracking-widest no-underline transition-opacity duration-200 ${
                  active
                    ? "text-[var(--text)] opacity-100"
                    : "text-[var(--text)] opacity-40 hover:opacity-100"
                }`}
              >
                {active ? `[${link.label}]` : link.label}
              </Link>
            );
          })}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
