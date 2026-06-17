import type { Metadata } from "next";
import Link from "next/link";
import { FlightBoard } from "@/components/main/FlightBoard";
import { KineticHeading } from "@/components/main/KineticHeading";

export const metadata: Metadata = {
  title: "Projects | Ayush Tripathi",
  description: "A showcase of full-stack, Web3, and backend systems built by Ayush Tripathi.",
  alternates: { canonical: "/projects" },
};

// ─── Data (Same as homepage, can be refactored into a shared file later) ──────
const PROJECTS = [
  {
    slug: "crowd-fund",
    title: "Crowd Fund",
    year: 2025,
    status: "LIVE",
    description: "decentralised crowdfunding marketplace with smart contract integration written in solidity",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
    link: "https://crowd-fund-me-i9j7.vercel.app/",
    tags: ["solidity", "next.js"],
  },
  {
    slug: "code-interview",
    title: "Code Interview",
    year: 2025,
    status: "LIVE",
    description: "real-time code interview platform with monaco editor and live sandboxed execution",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    link: "https://code-chat-sigma.vercel.app/",
    tags: ["react", "node.js"],
  },
  {
    slug: "web3-jobs",
    title: "Web3 Jobs",
    year: 2025,
    status: "LIVE",
    description: "web3 job portal where a single recruiter can post jobs across multiple companies",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80",
    link: "https://web3-jobs-1tnt.vercel.app/",
    tags: ["next.js", "web3"],
  },
  {
    slug: "defi-protocol",
    title: "DeFi Protocol",
    year: 2024,
    status: "ARCHIVED",
    description: "over-collateralised stablecoin protocol with dsc minting and liquidation engine in solidity",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    link: "https://github.com/tonystalker/defi_dsc_engine",
    tags: ["solidity", "defi"],
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-svh flex justify-center">
      <div
        className="flex flex-col relative w-full items-center"
        style={{ maxWidth: "700px" }}
      >
        <div className="w-full max-w-[640px] px-4 pb-24 flex flex-col items-start">
          {/* ── Header ──────────────────────────────────────────────── */}
          <section className="mt-24 sm:mt-32 w-full" aria-label="Projects header">
            <div className="flex flex-row items-end justify-between w-full">
              <KineticHeading
                as="h1"
                className="text-[48px] sm:text-[64px] leading-[0.95] tracking-tight text-[var(--text)] font-bold"
              >
                work
              </KineticHeading>
              <Link
                href="/"
                className="text-[13px] opacity-50 hover:opacity-100 transition-opacity no-underline text-[var(--text)] mb-1"
              >
                ← back
              </Link>
            </div>
            <p
              className="mt-6 text-[15px] text-[var(--text)] opacity-50 leading-relaxed"
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              production-grade systems, experiments, and protocols i&apos;ve built.
            </p>
          </section>

          {/* ── Divider ─────────────────────────────────────────────── */}
          <div className="w-full mt-8 sm:mt-12 border-b border-[var(--text)]/20" />

          {/* ── Projects List ──────────────────────────────────────────── */}
          <section className="w-full mt-0" aria-label="Projects list">
            <FlightBoard projects={PROJECTS} />
          </section>
        </div>
      </div>
    </main>
  );
}
