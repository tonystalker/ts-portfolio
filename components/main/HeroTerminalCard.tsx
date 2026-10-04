"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiMail, FiExternalLink } from "react-icons/fi";
import { GoGitCommit } from "react-icons/go";

interface CommitItem {
  id: string;
  sha: string;
  message: string;
  repo: string;
  type: "feat" | "fix" | "chore" | "docs";
  url: string;
  date?: string;
}

const DEFAULT_COMMITS: CommitItem[] = [
  {
    id: "2bf05f7",
    sha: "2bf05f7",
    message: "fix(today): make manual check-in metrics strictly opt-in",
    repo: "tonystalker/panal",
    type: "fix",
    url: "https://github.com/tonystalker/panal/commit/2bf05f7f25e266bfb0a5d2862238b313ed5e60b4",
  },
  {
    id: "caaef4c",
    sha: "caaef4c",
    message: "feat(today): make daily check-in metrics fully customizable",
    repo: "tonystalker/panal",
    type: "feat",
    url: "https://github.com/tonystalker/panal/commit/caaef4c1ec20b570f3aeef5ec093d40c801d7996",
  },
  {
    id: "302423b",
    sha: "302423b",
    message: "fix: resolve @/assets/logo-icon module and types for hero-8",
    repo: "tonystalker/panal",
    type: "fix",
    url: "https://github.com/tonystalker/panal/commit/302423b1c5963af41a3cb34e33c6adc878d8591f",
  },
  {
    id: "89ae9e5",
    sha: "89ae9e5",
    message: "feat(ui): update portfolio design system and dynamic components",
    repo: "tonystalker/ts-portfolio",
    type: "feat",
    url: "https://github.com/tonystalker",
  },
  {
    id: "b2573b9",
    sha: "b2573b9",
    message: "feat(deployment): optimize route handlers, CSP, and metadataBase for Vercel",
    repo: "tonystalker/panal",
    type: "feat",
    url: "https://github.com/tonystalker/panal/commit/b2573b907a9f5a1146597667da7d295e674a2cc7",
  },
  {
    id: "02b5d37",
    sha: "02b5d37",
    message: "fix(connectors): resolve LeetCode fetch error via API proxy",
    repo: "tonystalker/panal",
    type: "fix",
    url: "https://github.com/tonystalker/panal/commit/02b5d37b0812beebaf9b72aca288c07e9a127187",
  },
  {
    id: "4c718a2",
    sha: "4c718a2",
    message: "feat(notion): integrate dynamic database sync for work and writing",
    repo: "tonystalker/ts-portfolio",
    type: "feat",
    url: "https://github.com/tonystalker",
  },
  {
    id: "884ee8b",
    sha: "884ee8b",
    message: "chore(deps): install react-icons and provide @/assets/logo-icon",
    repo: "tonystalker/panal",
    type: "chore",
    url: "https://github.com/tonystalker/panal/commit/884ee8be73f8e037c7a2e8afc0c539feb8dd6bed",
  },
  {
    id: "9e112bc",
    sha: "9e112bc",
    message: "chore(perf): optimize font loading and asset bundles",
    repo: "tonystalker/ts-portfolio",
    type: "chore",
    url: "https://github.com/tonystalker",
  },
  {
    id: "66193e0",
    sha: "66193e0",
    message: "docs: record security audit, decisions, and verification in TASKS",
    repo: "tonystalker/panal",
    type: "docs",
    url: "https://github.com/tonystalker/panal/commit/66193e05d7eec62249f073818b48ec5ff7d9f773",
  },
];

export function HeroTerminalCard() {
  const [activeTab, setActiveTab] = useState<"ALL" | "FEAT" | "FIX" | "CHORE">("ALL");
  const [commits, setCommits] = useState<CommitItem[]>(DEFAULT_COMMITS);
  const [totalCommitCount, setTotalCommitCount] = useState<number>(560);
  const [pageIndex, setPageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch live commits from GitHub API
  useEffect(() => {
    fetch("https://api.github.com/search/commits?q=author:tonystalker&sort=author-date&order=desc&per_page=15", {
      headers: { Accept: "application/vnd.github.cloak-preview" }
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.items && data.items.length > 0) {
          if (data.total_count) {
            setTotalCommitCount(data.total_count);
          }
          const mapped: CommitItem[] = data.items.map((i: any) => {
            const rawMsg = i.commit?.message?.split("\n")[0] || "update";
            const lower = rawMsg.toLowerCase();
            let type: "feat" | "fix" | "chore" | "docs" = "feat";
            if (lower.startsWith("fix")) type = "fix";
            else if (lower.startsWith("chore") || lower.startsWith("build") || lower.startsWith("ci")) type = "chore";
            else if (lower.startsWith("doc")) type = "docs";

            return {
              id: i.sha,
              sha: i.sha.substring(0, 7),
              message: rawMsg,
              repo: i.repository?.full_name || "tonystalker/panal",
              type,
              url: i.html_url || `https://github.com/${i.repository?.full_name}/commit/${i.sha}`,
              date: i.commit?.author?.date,
            };
          });
          setCommits(mapped);
        }
      })
      .catch(() => {
        // Fallback to DEFAULT_COMMITS silently
      });
  }, []);

  const filteredCommits = activeTab === "ALL"
    ? commits
    : commits.filter((c) => c.type === activeTab.toLowerCase());

  const displayCommits = filteredCommits.length > 0 
    ? filteredCommits 
    : DEFAULT_COMMITS.filter((c) => activeTab === "ALL" || c.type === activeTab.toLowerCase());

  // Rolling feed effect: auto-cycles through items every 4 seconds unless hovered
  useEffect(() => {
    if (isPaused || displayCommits.length <= 3) return;
    const timer = setInterval(() => {
      setPageIndex((prev) => (prev + 1) % Math.max(1, displayCommits.length - 2));
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, displayCommits.length]);

  // Reset pageIndex when tab changes
  useEffect(() => {
    setPageIndex(0);
  }, [activeTab]);

  const visibleCommits = displayCommits.slice(pageIndex, pageIndex + 3);

  return (
    <div className="flex flex-col gap-3 w-full max-w-[420px] mx-auto lg:mx-0 select-text font-mono">
      {/* ── 1. Top Card: Terminal Status & Identity ── */}
      <div 
        className="w-full p-4 sm:p-5 rounded-2xl flex flex-col gap-3.5 relative overflow-hidden"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--line)",
        }}
      >
        {/* Top Command Line & Online Indicator */}
        <div className="flex items-center justify-between text-[11px] text-[var(--text-secondary)] border-b pb-2.5" style={{ borderColor: "var(--line)" }}>
          <div className="flex items-center gap-1.5 truncate">
            <span className="opacity-70">⌘</span>
            <span className="text-[var(--text-primary)] font-medium">tonystalker</span>
            <span className="opacity-40">~ %</span>
            <span className="text-[var(--text-secondary)]">status --live</span>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-[11px] text-[var(--text-primary)] font-medium">online</span>
          </div>
        </div>

        {/* Profile Row with PFP & Name */}
        <div className="flex items-center gap-3.5">
          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 group ring-1 ring-[var(--line-strong)]">
            <Image
              src="/heroimage.png"
              alt="Ayush Tripathi"
              fill
              className="object-cover grayscale contrast-125 transition-all duration-300 group-hover:grayscale-0"
              sizes="48px"
              priority
            />
          </div>

          <div className="flex flex-col">
            <span className="text-[15px] font-bold tracking-tight text-[var(--text-primary)]">
              ayush tripathi
            </span>
            <span className="text-[12px] text-[var(--text-secondary)]">
              software engineer
            </span>
          </div>
        </div>
      </div>

      {/* ── 2. Middle Row: 4 Action Buttons ── */}
      <div className="grid grid-cols-4 gap-2.5 w-full">
        {/* GitHub */}
        <a
          href="https://github.com/tonystalker"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center py-3 rounded-xl border transition-all duration-200 hover:scale-[1.02] cursor-pointer group"
          style={{
            background: "var(--surface)",
            borderColor: "var(--line)",
            color: "var(--text-secondary)",
          }}
          aria-label="GitHub Profile"
          title="GitHub (tonystalker)"
        >
          <SiGithub size={18} className="group-hover:text-[var(--text-primary)] transition-colors" />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/ayush-tripathi-4a062b1b4/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center py-3 rounded-xl border transition-all duration-200 hover:scale-[1.02] cursor-pointer group"
          style={{
            background: "var(--surface)",
            borderColor: "var(--line)",
            color: "var(--text-secondary)",
          }}
          aria-label="LinkedIn Profile"
          title="LinkedIn"
        >
          <FaLinkedin size={18} className="group-hover:text-[var(--text-primary)] transition-colors" />
        </a>

        {/* X */}
        <a
          href="https://x.com/TonyStalkerr"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center py-3 rounded-xl border transition-all duration-200 hover:scale-[1.02] cursor-pointer group"
          style={{
            background: "var(--surface)",
            borderColor: "var(--line)",
            color: "var(--text-secondary)",
          }}
          aria-label="X Profile"
          title="X (@TonyStalkerr)"
        >
          <FaXTwitter size={17} className="group-hover:text-[var(--text-primary)] transition-colors" />
        </a>

        {/* Mail */}
        <a
          href="mailto:707ayushtripathi@gmail.com"
          className="flex items-center justify-center py-3 rounded-xl border transition-all duration-200 hover:scale-[1.02] cursor-pointer group"
          style={{
            background: "var(--surface)",
            borderColor: "var(--line)",
            color: "var(--text-secondary)",
          }}
          aria-label="Send Email"
          title="Email (707ayushtripathi@gmail.com)"
        >
          <FiMail size={18} className="group-hover:text-[var(--text-primary)] transition-colors" />
        </a>
      </div>

      {/* ── 3. Bottom Card: Recent Commits Feed with + Pattern ── */}
      <div 
        className="w-full p-4 sm:p-5 rounded-2xl flex flex-col gap-3 relative overflow-hidden"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--line)",
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 9v6M9 12h6' stroke='rgba(255,255,255,0.05)' stroke-width='1'/%3E%3C/svg%3E")`,
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Header with Commit Icon & Total Count */}
        <div className="flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
          <div className="flex items-center gap-1.5 font-semibold tracking-wider uppercase">
            <GoGitCommit size={14} className="text-[var(--text-primary)]" />
            <span>RECENT COMMITS</span>
          </div>

          <span className="text-[11px] text-[var(--text-muted)] font-medium">
            {totalCommitCount}+
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 text-[10px]">
          {(["ALL", "FEAT", "FIX", "CHORE"] as const).map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2 py-0.5 rounded transition-all duration-150 cursor-pointer uppercase ${
                  active
                    ? "font-semibold text-[var(--text-primary)] bg-[var(--surface-raised)] border border-[var(--line-strong)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-secondary)] border border-transparent"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Commits List / Feed (Auto-rolling with pause on hover) */}
        <div className="flex flex-col gap-2.5 my-1 min-h-[148px]">
          <AnimatePresence mode="popLayout">
            {visibleCommits.map((commit) => (
              <motion.a
                key={commit.id}
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="flex items-start gap-2.5 group cursor-pointer no-underline"
              >
                <GoGitCommit 
                  size={14} 
                  className="text-[var(--text-muted)] mt-0.5 flex-shrink-0 group-hover:text-[var(--text-primary)] transition-colors" 
                />
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-[10px] text-[var(--accent)] bg-[var(--surface-raised)] px-1 py-0.5 rounded border border-[var(--line)] flex-shrink-0 font-mono">
                      {commit.sha}
                    </span>
                    <span className="text-[12px] font-medium text-[var(--text-primary)] truncate group-hover:underline">
                      {commit.message}
                    </span>
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)] truncate mt-0.5">
                    {commit.repo}
                  </span>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Link: View all on GitHub */}
        <div className="pt-2 border-t flex items-center justify-between" style={{ borderColor: "var(--line)" }}>
          <a
            href="https://github.com/tonystalker?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[10.5px] uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <span>VIEW ALL ON GITHUB</span>
            <FiExternalLink size={11} />
          </a>

          {displayCommits.length > 3 && (
            <div className="flex items-center gap-1 text-[9px] text-[var(--text-muted)]">
              <span>{pageIndex + 1}-{Math.min(pageIndex + 3, displayCommits.length)} of {displayCommits.length}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
