"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import type { NotionRead } from "@/lib/notion/models";

interface ReadsChiragViewProps {
  reads: NotionRead[];
}

const DEFAULT_READS: NotionRead[] = [
  {
    id: "r1",
    title: "Designing Data-Intensive Applications",
    url: "https://dataintensive.net/",
    thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80",
    author: "Martin Kleppmann",
    source: "O'Reilly Media",
    type: "Book",
    category: "systems",
    tags: ["Distributed Systems", "Storage Engines", "Replication", "Consensus"],
    difficulty: "Advanced",
    myTake: "The single best technical book written about how large distributed systems fail, how data is stored on disk, and how consistency models trade off.",
    recommended: true,
    published: true,
    dateAdded: "2024-01-15"
  },
  {
    id: "r2",
    title: "Attention Is All You Need",
    url: "https://arxiv.org/abs/1706.03762",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    author: "Vaswani et al.",
    source: "Google Brain / Research",
    type: "Paper",
    category: "ai",
    tags: ["Transformers", "Self-Attention", "Deep Learning", "LLMs"],
    difficulty: "Intermediate",
    myTake: "The foundational architecture paper of modern AI. Replacing recurrent networks with parallel multi-head self-attention unlocked scaling laws.",
    recommended: true,
    published: true,
    dateAdded: "2024-02-10"
  },
  {
    id: "r3",
    title: "Time, Clocks, and the Ordering of Events in a Distributed System",
    url: "https://lamport.azurewebsites.net/pubs/time-clocks.pdf",
    thumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&q=80",
    author: "Leslie Lamport",
    source: "Communications of the ACM",
    type: "Paper",
    category: "systems",
    tags: ["Logical Clocks", "Concurrency", "Consensus"],
    difficulty: "Advanced",
    myTake: "Clarified once and for all that physical time cannot establish causal order in distributed networks, introducing Lamport timestamps and state machines.",
    recommended: true,
    published: true,
    dateAdded: "2024-03-05"
  },
  {
    id: "r4",
    title: "Out of the Tar Pit",
    url: "https://curtclifton.net/papers/MoseleyMarks06a.pdf",
    thumbnail: "",
    author: "Ben Moseley & Peter Marks",
    source: "Software Craft Paper",
    type: "Paper",
    category: "systems",
    tags: ["State Complexity", "Functional Programming", "Relational Model"],
    difficulty: "Intermediate",
    myTake: "Distinguishes essential complexity from accidental complexity, arguing that unconstrained mutable state is the root cause of software fragility.",
    recommended: false,
    published: true,
    dateAdded: "2024-04-12"
  },
  {
    id: "r5",
    title: "In Search of an Understandable Consensus Algorithm (Raft)",
    url: "https://raft.github.io/raft.pdf",
    thumbnail: "",
    author: "Diego Ongaro & John Ousterhout",
    source: "USENIX ATC",
    type: "Paper",
    category: "systems",
    tags: ["Consensus", "Raft", "Leader Election", "Log Replication"],
    difficulty: "Intermediate",
    myTake: "Deconstructs Paxos into intuitive decomposed phases: leader election, log replication, and safety invariants. Essential for distributed backends.",
    recommended: false,
    published: true,
    dateAdded: "2024-05-20"
  },
  {
    id: "r6",
    title: "A Philosophy of Software Design",
    url: "https://web.stanford.edu/~ouster/cgi-bin/book.php",
    thumbnail: "",
    author: "John Ousterhout",
    source: "Stanford University",
    type: "Book",
    category: "craft",
    tags: ["Deep Modules", "Information Hiding", "Abstraction"],
    difficulty: "Beginner",
    myTake: "Presents the case for 'deep modules': interfaces that are extremely simple while concealing profound internal complexity.",
    recommended: false,
    published: true,
    dateAdded: "2024-06-18"
  },
  {
    id: "r7",
    title: "Language Models are Few-Shot Learners (GPT-3)",
    url: "https://arxiv.org/abs/2005.14165",
    thumbnail: "",
    author: "Tom B. Brown et al.",
    source: "OpenAI Research",
    type: "Paper",
    category: "ai",
    tags: ["Few-Shot", "In-Context Learning", "Emergence"],
    difficulty: "Intermediate",
    myTake: "Demonstrated that scaling autoregressive models produces emergent general-purpose in-context problem-solving capabilities without gradient updates.",
    recommended: false,
    published: true,
    dateAdded: "2024-07-22"
  },
  {
    id: "r8",
    title: "The Architecture of Open Source Applications",
    url: "https://aosabook.org/",
    thumbnail: "",
    author: "Amy Brown & Greg Wilson",
    source: "AOSA Project",
    type: "Book",
    category: "craft",
    tags: ["Open Source", "System Design", "Nginx", "Git"],
    difficulty: "Intermediate",
    myTake: "Real-world engineering tear-downs of major open source codebases (Git, Nginx, LLVM) written by their original creators.",
    recommended: false,
    published: true,
    dateAdded: "2024-08-30"
  }
];

export function ReadsChiragView({ reads }: ReadsChiragViewProps) {
  const allReads = useMemo(() => {
    if (!reads || reads.length === 0) return DEFAULT_READS;
    if (reads.length < 4) {
      const existing = new Set(reads.map(r => r.title.toLowerCase()));
      const needed = DEFAULT_READS.filter(d => !existing.has(d.title.toLowerCase()));
      return [...reads, ...needed];
    }
    return reads;
  }, [reads]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Spotlight reads (top 3 recommended or first 3)
  const spotlightReads = useMemo(() => {
    const recs = allReads.filter(r => r.recommended);
    return recs.length > 0 ? recs.slice(0, 3) : allReads.slice(0, 3);
  }, [allReads]);

  // Categories & counts
  const categories = useMemo(() => {
    const map = new Map<string, number>();
    map.set("all", allReads.length);
    allReads.forEach((r) => {
      const cat = (r.category || r.type || "paper").toLowerCase();
      map.set(cat, (map.get(cat) || 0) + 1);
    });
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, [allReads]);

  // Filtered catalogue
  const filteredReads = useMemo(() => {
    return allReads.filter((r) => {
      const cat = (r.category || r.type || "paper").toLowerCase();
      const matchesCat = selectedCategory === "all" || cat === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.author.toLowerCase().includes(q) ||
        r.myTake.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q));

      return matchesCat && matchesSearch;
    });
  }, [allReads, selectedCategory, searchQuery]);

  return (
    <div className="w-full flex flex-col gap-16 sm:gap-20">
      {/* ── §01 SPOTLIGHT READS ──────────────────────────────────────── */}
      <section className="w-full flex flex-col gap-6" aria-label="Spotlight Reads">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-[11px] font-mono text-[var(--text-muted)] tracking-[0.14em] uppercase">
          <span className="flex items-center gap-2 text-[var(--text-secondary)]">
            <span className="text-[var(--accent)] font-semibold">§01</span>
            <span>SPOTLIGHT READS</span>
          </span>
          <span>{spotlightReads.length} CANONICAL</span>
        </div>

        {/* Spotlight Stack */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {spotlightReads.map((read, idx) => {
            const numStr = `NO.0${idx + 1}`;
            return (
              <div
                key={read.id}
                className="w-full rounded-2xl border border-white/[0.08] bg-[#111113] p-5 sm:p-7 md:p-8 relative overflow-hidden transition-all duration-300 hover:border-white/[0.18]"
                style={{
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  {/* Left Column: Visual Card Frame */}
                  <div className="lg:col-span-5 flex flex-col gap-2.5 w-full">
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono px-1">
                      <span className="text-[var(--text-muted)] tracking-wider">{numStr}</span>
                      <div className="flex items-center gap-1.5 text-white/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span className="tracking-wider uppercase text-[10px] font-medium">{read.type || "PAPER"}</span>
                      </div>
                    </div>

                    <a
                      href={read.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full aspect-[16/10] rounded-xl border border-white/[0.08] bg-[#0c0c0e] relative p-5 flex flex-col justify-between overflow-hidden group cursor-pointer"
                    >
                      {/* Grid pattern */}
                      <div 
                        className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{
                          backgroundImage: `
                            linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
                          `,
                          backgroundSize: "18px 18px"
                        }}
                      />

                      {read.thumbnail ? (
                        <Image
                          src={read.thumbnail}
                          alt={read.title}
                          fill
                          className="object-cover opacity-75 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                        />
                      ) : (
                        <div className="relative z-10 flex flex-col justify-between h-full">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] font-semibold">
                            {read.source || "CANONICAL TEXT"}
                          </span>
                          <span className="text-[16px] font-bold text-white tracking-tight line-clamp-2">
                            {read.title}
                          </span>
                          <span className="text-[11px] font-mono text-[var(--text-secondary)]">
                            by {read.author}
                          </span>
                        </div>
                      )}

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 backdrop-blur-[2px]">
                        <span className="text-[11px] font-mono px-3 py-1.5 rounded-full bg-white text-black font-medium tracking-wider shadow-lg">
                          READ SOURCE
                        </span>
                      </div>
                    </a>
                  </div>

                  {/* Right Column: Title, Author, Deep Reflection */}
                  <div className="lg:col-span-7 flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--text-muted)] tracking-widest uppercase">
                      <span>{read.category || "SYSTEMS"}</span>
                      <span>·</span>
                      <span>{read.source || "ACADEMIC / INDUSTRY"}</span>
                    </div>

                    <a
                      href={read.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[22px] sm:text-[26px] font-bold text-white tracking-[-0.02em] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-2"
                    >
                      <span>{read.title}</span>
                      <svg className="w-4 h-4 opacity-70 group-hover:opacity-100" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" />
                      </svg>
                    </a>

                    <div className="text-[12px] font-mono text-[var(--text-muted)]">
                      Author: <span className="text-white font-medium">{read.author}</span>
                    </div>

                    {/* Metadata stat row */}
                    <div className="grid grid-cols-3 gap-3 py-3 border-y border-white/[0.06] my-1">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[15px] sm:text-[16px] font-bold text-white tracking-tight">
                          {read.type}
                        </span>
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">
                          Format
                        </span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[15px] sm:text-[16px] font-bold text-white tracking-tight capitalize">
                          {read.difficulty || "Advanced"}
                        </span>
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">
                          Difficulty
                        </span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[15px] sm:text-[16px] font-bold text-white tracking-tight">
                          Essential
                        </span>
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">
                          Curated Status
                        </span>
                      </div>
                    </div>

                    {/* Reflection / Why it matters */}
                    <div className="flex flex-col gap-2 text-[12px] leading-relaxed">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                        <span className="text-[10px] font-mono tracking-wider text-[var(--text-secondary)] font-semibold w-28 shrink-0 uppercase">
                          WHY IT MATTERS
                        </span>
                        <span className="text-[var(--text-body)]">
                          {read.myTake}
                        </span>
                      </div>
                    </div>

                    {/* Tags & Action */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 mt-auto">
                      <div className="flex flex-wrap gap-2 text-[11px] font-mono text-[var(--text-muted)]">
                        {read.tags.slice(0, 4).map((tag: string) => (
                          <span key={tag} className="hover:text-[var(--text-secondary)] transition-colors">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <a
                        href={read.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-mono px-3.5 py-1.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-white transition-all inline-flex items-center gap-1.5"
                      >
                        <span>OPEN RESOURCE</span>
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── §02 THE ARCHIVE ──────────────────────────────────────────── */}
      <section className="w-full flex flex-col gap-6" aria-label="Reads Archive">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-[11px] font-mono text-[var(--text-muted)] tracking-[0.14em] uppercase">
          <span className="flex items-center gap-2 text-[var(--text-secondary)]">
            <span className="text-[var(--accent)] font-semibold">§02</span>
            <span>THE ARCHIVE</span>
          </span>
          <span>{allReads.length} TOTAL ITEMS</span>
        </div>

        {/* Filter Pills & Search */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const active = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`text-[11px] font-mono px-3 py-1 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      active
                        ? "bg-white text-black font-semibold shadow-sm"
                        : "bg-[#161618] text-[var(--text-secondary)] border border-white/[0.08] hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <span className="capitalize">{cat.name}</span>
                    <span className={`text-[10px] ${active ? "text-black/70" : "text-[var(--text-muted)]"}`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full sm:w-64">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs" />
              <input
                type="text"
                placeholder="Search reads or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-white/[0.08] bg-[#161618] text-[11px] font-mono text-white placeholder-gray-500 outline-none focus:border-white/30"
              />
            </div>
          </div>

          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
            SHOWING {filteredReads.length} RESOURCE{filteredReads.length !== 1 ? "S" : ""}
          </span>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {filteredReads.map((read, idx) => {
            const numStr = `NO.${String(idx + 1).padStart(2, "0")}`;
            return (
              <a
                key={read.id}
                href={read.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between p-5 rounded-xl border border-white/[0.07] bg-[#111113] hover:border-white/[0.18] transition-all duration-300 relative overflow-hidden"
                style={{
                  boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                }}
              >
                {/* Top Row: Number + Source */}
                <div className="flex items-center justify-between text-[11px] font-mono pb-2 text-[var(--text-muted)]">
                  <span className="tracking-wider">{numStr}</span>
                  <div className="flex items-center gap-1.5 text-[10px] uppercase">
                    <span>{read.type}</span>
                    <span>·</span>
                    <span className="text-[var(--text-secondary)]">{read.source || "Web"}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <h4 className="text-[16px] font-semibold text-white tracking-tight group-hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1.5">
                    <span>{read.title}</span>
                    <svg className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" />
                    </svg>
                  </h4>

                  <span className="text-[11px] font-mono text-[var(--text-muted)]">
                    by {read.author}
                  </span>

                  <p className="text-[12px] sm:text-[13px] text-[var(--text-secondary)] line-clamp-3 leading-relaxed mt-1">
                    {read.myTake}
                  </p>
                </div>

                {/* Bottom Tags */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-4 mt-3 border-t border-white/[0.05] text-[10px] sm:text-[11px] font-mono text-[var(--text-muted)]">
                  <div className="flex flex-wrap gap-2">
                    {read.tags.slice(0, 3).map((tag: string) => (
                      <span key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="uppercase text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                    {read.difficulty || "Intermediate"}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}
