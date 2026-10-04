"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { NotionArticle } from "@/lib/notion/models";

interface WritingsChiragViewProps {
  articles: NotionArticle[];
}

export function WritingsChiragView({ articles }: WritingsChiragViewProps) {
  const allArticles = useMemo(() => {
    return articles || [];
  }, [articles]);

  const [selectedTag, setSelectedTag] = useState<string>("all");

  const featuredArticle = useMemo(() => {
    return allArticles.find(a => a.featured) || allArticles[0];
  }, [allArticles]);

  const archiveArticles = useMemo(() => {
    return allArticles.filter(a => a.id !== featuredArticle?.id);
  }, [allArticles, featuredArticle]);

  const tags = useMemo(() => {
    const set = new Set<string>();
    allArticles.forEach(a => {
      a.tags?.forEach(t => set.add(t.toLowerCase()));
    });
    return ["all", ...Array.from(set)];
  }, [allArticles]);

  const filteredArchive = useMemo(() => {
    if (selectedTag === "all") return archiveArticles;
    return archiveArticles.filter(a => 
      a.tags?.some(t => t.toLowerCase() === selectedTag)
    );
  }, [archiveArticles, selectedTag]);

  if (allArticles.length === 0) {
    return (
      <div 
        className="w-full p-12 sm:p-16 rounded-2xl border text-center flex flex-col items-center justify-center gap-3 my-8"
        style={{
          background: "var(--surface)",
          borderColor: "var(--line)",
        }}
      >
        <span className="text-[11px] font-mono tracking-widest text-[var(--accent)] uppercase">
          [NOTION SYNC]
        </span>
        <h3 className="text-[18px] sm:text-[20px] font-medium text-white">
          No articles published yet
        </h3>
        <p className="text-[13px] font-mono text-[var(--text-secondary)] max-w-[420px] leading-relaxed">
          Articles added and marked as Published in your Notion database will appear here automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-14 sm:gap-18">
      {/* ── §01 FEATURED ESSAY (Chirag dave layout) ──────────────────── */}
      {featuredArticle && (
        <section className="w-full flex flex-col gap-5" aria-label="Featured Writing">
          {/* Section header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-[11px] font-mono text-[var(--text-muted)] tracking-[0.14em] uppercase">
            <span>PUBLISHED ESSAYS & WRITINGS</span>
            <span>FEATURED ESSAY</span>
          </div>

          {/* Large Featured Article Card */}
          <div 
            className="w-full rounded-2xl border border-white/[0.08] bg-[#111113] p-5 sm:p-7 md:p-8 relative overflow-hidden transition-all duration-300 hover:border-white/[0.18]"
            style={{
              boxShadow: "0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Graphic Bar Chart / Matrix Visualization */}
              <div className="lg:col-span-5 w-full aspect-[4/3] rounded-xl border border-white/[0.08] bg-[#0c0c0e] relative p-5 flex flex-col justify-between overflow-hidden">
                {/* Background grid */}
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
                    `,
                    backgroundSize: "20px 20px"
                  }}
                />

                {/* Top Watermark */}
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--text-muted)] relative z-10 font-semibold">
                  {featuredArticle.category || "SECURITY / AGENTS"}
                </span>

                {/* Vertical Bars Graphic Visualization */}
                <div className="w-full h-36 flex items-end justify-between gap-1.5 sm:gap-2 relative z-10 pt-4">
                  {[28, 42, 36, 60, 52, 75, 68, 86, 78, 92].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm"
                      style={{
                        height: `${height}%`,
                        background: `linear-gradient(to top, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.22) 100%)`,
                        borderTop: "1px solid rgba(255,255,255,0.35)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Right Column: Title, Summary, Stats, Read Action */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
                  {featuredArticle.category || "SECURITY · AGENTS"}
                </div>

                <Link
                  href={`/writing/${featuredArticle.slug}`}
                  className="text-[24px] sm:text-[30px] font-bold text-white tracking-[-0.02em] hover:text-[var(--accent)] transition-colors leading-tight"
                >
                  {featuredArticle.title}
                </Link>

                <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                  {featuredArticle.excerpt}
                </p>

                {/* Bottom Bar: Date & Read CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-[11px] font-mono text-[var(--text-muted)]">
                  <span>
                    {featuredArticle.publishedDate || "Jan 27, 2026"} · {featuredArticle.readingTime || "8 min read"}
                  </span>

                  <Link
                    href={`/writing/${featuredArticle.slug}`}
                    className="text-white hover:underline inline-flex items-center gap-1.5 font-medium group"
                  >
                    <span>READ ESSAY</span>
                    <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── §02 THE ARCHIVE / MORE ARTICLES ─────────────────────────── */}
      <section className="w-full flex flex-col gap-6" aria-label="Writing Archive">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-[11px] font-mono text-[var(--text-muted)] tracking-[0.14em] uppercase">
          <span className="flex items-center gap-2 text-[var(--text-secondary)]">
            <span className="text-[var(--accent)] font-semibold">§02</span>
            <span>THE ARCHIVE</span>
          </span>
          <span>{filteredArchive.length} ARTICLES</span>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((t) => {
            const active = selectedTag === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedTag(t)}
                className={`text-[11px] font-mono px-3 py-1 rounded-full transition-all duration-200 cursor-pointer capitalize ${
                  active
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "bg-[#161618] text-[var(--text-secondary)] border border-white/[0.08] hover:border-white/20 hover:text-white"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* 2-Column Catalogue Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {filteredArchive.map((article, idx) => {
            const numStr = `NO.${String(idx + 1).padStart(2, "0")}`;
            return (
              <Link
                key={article.slug}
                href={`/writing/${article.slug}`}
                className="group flex flex-col justify-between p-5 rounded-xl border border-white/[0.07] bg-[#111113] hover:border-white/[0.18] transition-all duration-300 relative overflow-hidden"
                style={{
                  boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                }}
              >
                {/* Top Row: Number + Date */}
                <div className="flex items-center justify-between text-[11px] font-mono pb-2 text-[var(--text-muted)]">
                  <span className="tracking-wider">{numStr}</span>
                  <span>{article.readingTime || "5 min read"}</span>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <h4 className="text-[17px] font-semibold text-white tracking-tight group-hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1.5">
                    <span>{article.title}</span>
                    <svg className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" />
                    </svg>
                  </h4>

                  <p className="text-[13px] text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                {/* Bottom Tags */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-4 mt-3 border-t border-white/[0.05] text-[10px] sm:text-[11px] font-mono text-[var(--text-muted)]">
                  <div className="flex flex-wrap gap-2">
                    {article.tags?.slice(0, 3).map(tag => (
                      <span key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span>{article.publishedDate}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
