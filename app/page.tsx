import { Hero } from "@/components/main/Hero";
import { FlightBoard } from "@/components/main/FlightBoard";
import { GithubActivity } from "@/components/main/GithubActivity";
import { KineticHeading } from "@/components/main/KineticHeading";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import {
  SiGithub,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiGo,
  SiPython,
  SiSolidity,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiLangchain,
  SiLanggraph,
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { RxTwitterLogo } from "react-icons/rx";
import type { IconType } from "react-icons";

// ─── Data ─────────────────────────────────────────────────────────────────────
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

const STACK: { name: string; Icon: IconType }[] = [
  { name: "react", Icon: SiReact },
  { name: "next.js", Icon: SiNextdotjs },
  { name: "typescript", Icon: SiTypescript },
  { name: "node.js", Icon: SiNodedotjs },
  { name: "go", Icon: SiGo },
  { name: "python", Icon: SiPython },
  { name: "solidity", Icon: SiSolidity },
  { name: "mongodb", Icon: SiMongodb },
  { name: "postgresql", Icon: SiPostgresql },
  { name: "docker", Icon: SiDocker },
  { name: "langchain", Icon: SiLangchain },
  { name: "langgraph", Icon: SiLanggraph },
];

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/tonystalker",
    Icon: SiGithub,
    sub: "@tonystalker",
    desc: "swe · web3 · building in public",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ayush-tripathi-4a062b1b4/",
    Icon: FaLinkedin,
    sub: "Ayush Tripathi",
    desc: "Engineering Student at IIT (BHU)",
  },
  {
    label: "X",
    href: "https://x.com/TonyStalkerr",
    Icon: RxTwitterLogo,
    sub: "@TonyStalkerr",
    desc: "building in public · web3 thoughts",
  },
];

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <main className="min-h-svh flex justify-center bg-[var(--bg)]" style={{ fontFamily: "var(--font-mono)" }}>
      <div className="flex flex-col relative w-full items-center" style={{ maxWidth: "700px", minHeight: "100svh" }}>
        <div className="w-full max-w-[640px] px-4 pb-32 flex flex-col items-start">

          {/* ── Hero ───────────────────────────────────────────────── */}
          <section className="mt-24 sm:mt-32 w-full" aria-label="Introduction">
            <Hero />
          </section>

          {/* ── Social bar ─────────────────────────────────────────── */}
          <div className="w-full flex items-center justify-between mt-8 sm:mt-12 py-6 sm:py-8 border-y border-[var(--text)]/20">
            <div className="flex gap-4 sm:gap-6 items-center">
              {SOCIALS.map(({ label, href, Icon, sub, desc }) => (
                <div key={label} className="group relative flex items-center justify-center">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} profile`}
                    className="text-[var(--text)] opacity-50 hover:opacity-100 transition-opacity"
                  >
                    <Icon size={18} />
                  </a>
                  {/* Tooltip card */}
                  <div
                    className="absolute z-50 w-64 p-4 bg-[var(--bg)] border border-[var(--text)] shadow-[4px_4px_0px_var(--text)] pointer-events-none opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 ease-out top-full mt-4 left-1/2 -translate-x-1/2 origin-top"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-[var(--text)]">{label}</span>
                        <span className="text-[12px] text-[var(--text)] opacity-50">{sub}</span>
                      </div>
                      <Icon size={18} className="text-[var(--text)]" />
                    </div>
                    <p className="text-[12px] leading-relaxed text-[var(--text)] opacity-70">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=707ayushtripathi@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 px-5 py-2.5 border border-[var(--text)]/20 bg-[var(--bg)] transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[2px_2px_0px_var(--text),inset_0_0_0_1px_var(--text)] hover:border-[var(--text)] active:translate-x-0 active:translate-y-0 active:shadow-none no-underline"
            >
              <span className="text-[13px] tracking-widest text-[var(--text)]">mail me</span>
              <span className="text-[var(--text)] text-[15px] inline-block transition-transform duration-[500ms] group-hover:rotate-45">↗</span>
            </a>
          </div>

          {/* ── About ──────────────────────────────────────────────── */}
          <section className="mt-16 w-full" id="about" aria-label="About">
            <KineticHeading
              as="h2"
              className="text-xl font-bold tracking-tight text-[var(--text)] mb-8"
            >
              a bit abt me
            </KineticHeading>
            <div className="space-y-5 leading-relaxed opacity-80 text-[15px]">
              <p>
                studied ceramic engineering at IIT (BHU). took the mandatory detour through blockchain. now heavily obsessed with ai & agents. the classic software pipeline.
              </p>
              <p>
                generalist engineer and aspiring founder who builds for scale.
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>go · python · c++ · typescript · docker · whatever the problem needs</li>
                <li>currently exploring: ai engineering, autonomous systems, and high-performance backend architecture.</li>
              </ul>
              <p>motto: ship fast, learn faster, break things intentionally.</p>
            </div>
          </section>

          <GithubActivity />

          {/* ── Projects ───────────────────────────────────────────── */}
          <section className="mt-20 w-full" id="projects" aria-label="Projects">
            <KineticHeading
              as="h2"
              className="text-xl font-bold tracking-tight text-[var(--text)] mb-8"
            >
              pinned projects
            </KineticHeading>
            <FlightBoard projects={PROJECTS} />
          </section>

          {/* ── Recent Blog Posts ───────────────────────────────────── */}
          <section className="mt-20 w-full" id="blogs" aria-label="Recent blog posts">
            <div className="flex items-center justify-between mb-8">
              <KineticHeading
                as="h2"
                className="text-xl font-bold tracking-tight text-[var(--text)]"
              >
                recent posts
              </KineticHeading>
              <Link
                href="/blog"
                className="text-[12px] tracking-widest opacity-50 hover:opacity-100 transition-opacity no-underline text-[var(--text)]"
              >
                see all →
              </Link>
            </div>
            <div className="w-full border-t border-[var(--text)]/20 flex flex-col">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex items-center justify-between py-4 border-b border-[var(--text)]/20 hover:bg-[var(--text)]/5 transition-colors px-2 no-underline"
                >
                  <div className="flex items-center gap-4 sm:gap-8">
                    <span className="text-[12px] opacity-40 flex-shrink-0">
                      [{new Date(post.date).getFullYear()}]
                    </span>
                    <span className="text-[14px] font-bold tracking-tight text-[var(--text)] uppercase">
                      {post.title}
                    </span>
                  </div>
                  <span className="text-[var(--text)] text-[15px] flex-shrink-0 ml-4 opacity-40 group-hover:opacity-100 inline-block transition-all duration-500 group-hover:rotate-45">↗</span>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Stack ──────────────────────────────────────────────── */}
          <section className="mt-20 w-full" aria-label="Tech stack">
            <KineticHeading
              as="h2"
              className="text-xl font-bold tracking-tight text-[var(--text)] mb-8"
            >
              stack
            </KineticHeading>
            <div className="flex flex-wrap gap-2.5 select-none">
              {STACK.map(({ name, Icon }) => (
                <div
                  key={name}
                  className="group flex justify-center items-center gap-2.5 px-3.5 py-2 border border-[var(--text)]/20 bg-[var(--bg)] transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[2px_2px_0px_var(--text),inset_0_0_0_1px_var(--text)] hover:border-[var(--text)] active:translate-x-0 active:translate-y-0 active:shadow-none cursor-crosshair"
                >
                  <Icon className="w-4 h-4 text-[var(--text)] transition-transform duration-[500ms] group-hover:scale-125 group-hover:rotate-12 group-active:scale-100" />
                  <span className="text-[12px] tracking-widest text-[var(--text)]">{name}</span>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
