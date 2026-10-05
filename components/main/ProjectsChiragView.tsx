"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiGithub } from "react-icons/si";
import { ProjectDrawer } from "@/components/main/ProjectDrawer";
import type { NotionProject } from "@/lib/notion/models";
import type { Project } from "@/config/portfolio";

interface ProjectsChiragViewProps {
  projects: (Project | NotionProject)[];
}

// 12-bar equalizer pattern generator based on string seed
function EqualizerGraphic({ seed }: { seed: string }) {
  // Deterministic bar heights based on characters in seed
  const heights = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0;
    }
    const result: number[] = [];
    for (let i = 0; i < 12; i++) {
      const val = Math.abs(Math.sin((hash + i * 17) * 0.45));
      // heights between 22% and 88%
      result.push(Math.round(22 + val * 66));
    }
    return result;
  }, [seed]);

  return (
    <div className="w-full h-28 sm:h-32 bg-[#09090b] rounded-lg border border-white/[0.05] relative overflow-hidden flex items-end px-4 pb-2 pt-3">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "16px 16px"
        }}
      />

      {/* 12 Vertical Equalizer Bars */}
      <div className="w-full h-full flex items-end justify-between gap-1 sm:gap-1.5 relative z-10">
        {heights.map((h, idx) => (
          <div
            key={idx}
            className="flex-1 rounded-t-sm transition-all duration-300 group-hover:brightness-125"
            style={{
              height: `${h}%`,
              background: `linear-gradient(to top, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.18) 100%)`,
              borderTop: "1px solid rgba(255,255,255,0.3)",
              boxShadow: "0 0 10px rgba(255,255,255,0.02)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function ProjectsChiragView({ projects }: ProjectsChiragViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeDrawerProject, setActiveDrawerProject] = useState<NotionProject | null>(null);

  // Normalize project data
  const normalizedProjects = useMemo(() => {
    return projects.map((p) => {
      const isNotion = "published" in p;
      const np = p as any;
      
      const category = (np.category || "ai").toLowerCase();
      const featured = Boolean(np.featured);
      const metrics = Array.isArray(np.metrics)
        ? np.metrics
        : typeof np.metrics === "string" && np.metrics
        ? [{ label: "Metric", value: np.metrics }]
        : [
            { label: "Execution", value: "Production" },
            { label: "Status", value: "Verified" },
            { label: "Architecture", value: "Engineered" }
          ];

      const whyItMatters = np.whyItMatters || np.shortDescription || np.description;
      const underTheHood = Array.isArray(np.underTheHood) 
        ? np.underTheHood.join(" ") 
        : np.underTheHood || "Production architecture engineered with deterministic state handling, high throughput pipelines, and automated reliability checks.";

      return {
        slug: np.slug || np.id,
        title: np.title,
        year: np.year || 2026,
        status: np.status || "LIVE",
        category,
        description: np.description,
        shortDescription: np.shortDescription || np.description,
        whyItMatters,
        underTheHood,
        image: np.coverImage || np.image || "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80",
        website: np.liveDemoUrl || np.website || "",
        github: np.githubUrl || np.github || "",
        tags: np.technologies || np.tags || np.tech || [],
        metrics,
        featured,
        raw: np
      };
    });
  }, [projects]);

  // Split into Spotlight (Featured) and Catalogue
  const spotlightProjects = useMemo(() => {
    const feat = normalizedProjects.filter(p => p.featured);
    return feat.length > 0 ? feat.slice(0, 3) : normalizedProjects.slice(0, 3);
  }, [normalizedProjects]);

  // Categories & counts for catalogue
  const categories = useMemo(() => {
    const map = new Map<string, number>();
    map.set("all", normalizedProjects.length);
    normalizedProjects.forEach((p) => {
      const cat = p.category;
      map.set(cat, (map.get(cat) || 0) + 1);
    });
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, [normalizedProjects]);

  // Filtered catalogue projects
  const catalogueProjects = useMemo(() => {
    if (selectedCategory === "all") return normalizedProjects;
    return normalizedProjects.filter(p => p.category === selectedCategory);
  }, [normalizedProjects, selectedCategory]);

  if (normalizedProjects.length === 0) {
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
          No projects published yet
        </h3>
        <p className="text-[13px] font-mono text-[var(--text-secondary)] max-w-[420px] leading-relaxed">
          Projects added and marked as Published in your Notion database will appear here automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-16 sm:gap-20">
      {/* ── §01 SPOTLIGHT ────────────────────────────────────────────── */}
      <section className="w-full flex flex-col gap-6" aria-label="Featured Projects Spotlight">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-[11px] font-mono text-[var(--text-muted)] tracking-[0.14em] uppercase">
          <span className="flex items-center gap-2 text-[var(--text-secondary)]">
            <span className="text-[var(--accent)] font-semibold">§01</span>
            <span>SPOTLIGHT</span>
          </span>
          <span>{spotlightProjects.length} FEATURED</span>
        </div>

        {/* Spotlight Cards Stack */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {spotlightProjects.map((p, index) => {
            const numStr = `NO.0${index + 1}`;
            return (
              <div
                key={p.slug}
                className="w-full rounded-2xl border border-white/[0.08] bg-[#111113] p-5 sm:p-7 md:p-8 relative overflow-hidden transition-all duration-300 hover:border-white/[0.18]"
                style={{
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  {/* Left Column: Frame with Live Badge + Screenshot */}
                  <div className="lg:col-span-5 flex flex-col gap-2.5 w-full">
                    {/* Frame Top Bar */}
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono px-1">
                      <span className="text-[var(--text-muted)] tracking-wider">{numStr}</span>
                      <div className="flex items-center gap-1.5 text-white/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span className="tracking-wider uppercase text-[10px] font-medium">LIVE</span>
                      </div>
                    </div>

                    {/* Image Mockup Frame */}
                    <div 
                      onClick={() => setActiveDrawerProject(p.raw)}
                      className="w-full aspect-[16/10] rounded-xl border border-white/[0.08] bg-[#0c0c0e] relative overflow-hidden group cursor-pointer"
                    >
                      <Image
                        src={p.image}
                        alt={`${p.title} - AI and systems architecture by Ayush Tripathi`}
                        fill
                        className="object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e]/80 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Interactive Inspect Overlay on Hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 backdrop-blur-[2px]">
                        <span className="text-[11px] font-mono px-3 py-1.5 rounded-full bg-white text-black font-medium tracking-wider shadow-lg">
                          INSPECT ARCHITECTURE
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Title, Impact Stats, Deep Technical Notes */}
                  <div className="lg:col-span-7 flex flex-col gap-4">
                    {/* Category & Year */}
                    <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--text-muted)] tracking-widest uppercase">
                      <span>{p.category}</span>
                      <span>·</span>
                      <span>{p.year}</span>
                    </div>

                    {/* Title */}
                    <div className="flex items-center justify-between">
                      <h3 
                        onClick={() => setActiveDrawerProject(p.raw)}
                        className="text-[22px] sm:text-[26px] font-bold text-white tracking-[-0.02em] hover:text-[var(--accent)] transition-colors cursor-pointer inline-flex items-center gap-2"
                      >
                        <span>{p.title}</span>
                        <svg className="w-4 h-4 opacity-70 group-hover:opacity-100" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" />
                        </svg>
                      </h3>
                    </div>

                    {/* One-liner Tagline */}
                    <p className="text-[13px] sm:text-[14px] text-[var(--text-secondary)] leading-relaxed">
                      {p.shortDescription}
                    </p>

                    {/* Impact / Stats Grid (3 columns) */}
                    {p.metrics && p.metrics.length > 0 && (
                      <div className="grid grid-cols-3 gap-3 py-3 border-y border-white/[0.06] my-1">
                        {p.metrics.map((m: any, i: number) => (
                          <div key={i} className="flex flex-col gap-0.5">
                            <span className="text-[16px] sm:text-[18px] font-bold text-white tracking-tight">
                              {m.value}
                            </span>
                            <span className="text-[10px] sm:text-[11px] font-mono text-[var(--text-muted)] truncate">
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Detailed Metadata rows */}
                    <div className="flex flex-col gap-2.5 text-[12px] leading-relaxed">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                        <span className="text-[10px] font-mono tracking-wider text-[var(--text-secondary)] font-semibold w-28 shrink-0 uppercase">
                          WHY IT MATTERS
                        </span>
                        <span className="text-[var(--text-body)]">
                          {p.whyItMatters}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                        <span className="text-[10px] font-mono tracking-wider text-[var(--text-secondary)] font-semibold w-28 shrink-0 uppercase">
                          UNDER THE HOOD
                        </span>
                        <span className="text-[var(--text-body)]">
                          {p.underTheHood}
                        </span>
                      </div>
                    </div>

                    {/* Tech Stack Pills & Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 mt-auto">
                      <div className="flex flex-wrap gap-2 text-[11px] font-mono text-[var(--text-muted)]">
                        {p.tags.slice(0, 5).map((t: string) => (
                          <span key={t} className="hover:text-[var(--text-secondary)] transition-colors">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2.5">
                        {p.slug && (
                          <Link
                            href={`/projects/${p.slug}`}
                            className="text-[11px] font-mono px-3 py-1.5 rounded-lg border border-white/20 hover:border-white/40 text-white/90 hover:text-white transition-all inline-flex items-center gap-1.5"
                          >
                            <span>CASE STUDY</span>
                          </Link>
                        )}
                        {p.github && (
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-mono px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/30 text-white/80 hover:text-white transition-colors inline-flex items-center gap-1.5"
                          >
                            <SiGithub size={12} />
                            <span>SOURCE</span>
                          </a>
                        )}
                        {p.website && (
                          <a
                            href={p.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-mono px-3 py-1.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-white transition-all inline-flex items-center gap-1.5"
                          >
                            <span>LIVE SITE</span>
                            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── §02 THE CATALOGUE ────────────────────────────────────────── */}
      <section className="w-full flex flex-col gap-6" aria-label="Project Catalogue and Experiments">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-[11px] font-mono text-[var(--text-muted)] tracking-[0.14em] uppercase">
          <span className="flex items-center gap-2 text-[var(--text-secondary)]">
            <span className="text-[var(--accent)] font-semibold">§02</span>
            <span>THE CATALOGUE</span>
          </span>
          <span>{normalizedProjects.length} PROJECTS</span>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-col gap-3">
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

          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
            SHOWING {catalogueProjects.length} PROJECT{catalogueProjects.length !== 1 ? "S" : ""}
          </span>
        </div>

        {/* Catalogue Cards 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {catalogueProjects.map((p, idx) => {
            const numStr = `NO.${String(idx + 1).padStart(2, "0")}`;
            return (
              <div
                key={p.slug}
                className="group flex flex-col justify-between p-5 rounded-xl border border-white/[0.07] bg-[#111113] hover:border-white/[0.18] transition-all duration-300 relative overflow-hidden"
                style={{
                  boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                }}
              >
                {/* Top Row: NO.01 + Source link */}
                <div className="flex items-center justify-between text-[11px] font-mono pb-3">
                  <span className="text-[var(--text-muted)] tracking-wider">{numStr}</span>
                  <div className="flex items-center gap-3">
                    {p.slug && (
                      <Link
                        href={`/projects/${p.slug}`}
                        className="text-[var(--text-muted)] hover:text-white transition-colors inline-flex items-center gap-1"
                      >
                        <span className="text-[10px] tracking-wider uppercase">DETAILS</span>
                      </Link>
                    )}
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-muted)] hover:text-white transition-colors inline-flex items-center gap-1.5"
                      >
                        <SiGithub size={11} />
                        <span className="text-[10px] tracking-wider uppercase">SOURCE</span>
                      </a>
                    )}
                    {p.website && (
                      <a
                        href={p.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-muted)] hover:text-white transition-colors inline-flex items-center gap-1"
                      >
                        <span className="text-[10px] tracking-wider uppercase">DEMO</span>
                        <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Equalizer Visual Graphic */}
                <div className="my-2 cursor-pointer" onClick={() => setActiveDrawerProject(p.raw)}>
                  <EqualizerGraphic seed={p.slug + p.title} />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 pt-3">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                    <span>{p.category}</span>
                    <span>·</span>
                    <span>{p.year}</span>
                  </div>

                  <h4 
                    onClick={() => setActiveDrawerProject(p.raw)}
                    className="text-[16px] font-semibold text-white tracking-tight group-hover:text-[var(--accent)] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>{p.title}</span>
                    <svg className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" />
                    </svg>
                  </h4>

                  <p className="text-[12px] sm:text-[13px] text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                    {p.shortDescription}
                  </p>
                </div>

                {/* Bottom Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-4 mt-2 border-t border-white/[0.05] text-[10px] sm:text-[11px] font-mono text-[var(--text-muted)]">
                  {p.tags.slice(0, 4).map((t: string) => (
                    <span key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Slide-out Drawer for deep technical architecture specs */}
      {activeDrawerProject && (
        <ProjectDrawer
          isOpen={!!activeDrawerProject}
          project={activeDrawerProject}
          onClose={() => setActiveDrawerProject(null)}
        />
      )}
    </div>
  );
}
