"use client";

import Image from "next/image";
import { SiGithub } from "react-icons/si";
import type { Project } from "@/config/portfolio";
import type { NotionProject } from "@/lib/notion/models";

interface ProjectCardEditorialProps {
  project: Project | NotionProject | any;
  index: number;
}

export function ProjectCardEditorial({ project, index }: ProjectCardEditorialProps) {
  const num = String(index + 1).padStart(2, "0");
  const year = project.year || 2026;
  const status = project.status || "LIVE";
  const title = project.title || "Untitled Project";
  const description = project.shortDescription || project.description || "";
  const credibleDetail = project.whyItMatters || project.metrics || "";
  const displayTags = (project.technologies || project.tags || project.tech || []).slice(0, 4);
  const website = project.liveDemoUrl || project.website || "";
  const github = project.githubUrl || project.github || "";
  const image = project.coverImage || project.image || "";

  return (
    <article 
      className="w-full p-5 sm:p-6 md:p-7 rounded-2xl relative transition-transform duration-200 hover:scale-[1.01]"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* ── Left Column: Metadata, Outcome, Tags, Links (7 cols) ── */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-3">
          
          {/* Top row: Number, Year, Status */}
          <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: "var(--line)" }}>
            <div className="flex items-center gap-2.5">
              <span className="text-[12px] font-mono font-semibold" style={{ color: "var(--text-primary)" }}>
                {num} · {year}
              </span>
              <span className="w-1 h-1 rounded-full opacity-30" style={{ background: "var(--text-secondary)" }} />
              <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                {displayTags[0] || "Software"}
              </span>
            </div>

            <span 
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider"
              style={{
                background: "rgba(213, 213, 208, 0.08)",
                border: "1px solid rgba(213, 213, 208, 0.20)",
                color: "var(--accent)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--accent)" }} />
              {status}
            </span>
          </div>

          {/* Title & One-sentence outcome */}
          <div className="flex flex-col gap-1">
            <h3 
              className="text-[20px] sm:text-[22px] font-semibold tracking-tight"
              style={{ color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}
            >
              {title}
            </h3>
            <p 
              className="text-[13.5px] sm:text-[14px] leading-relaxed text-pretty"
              style={{ color: "var(--text-body)", fontFamily: "var(--font-sans)" }}
            >
              {description}
            </p>
          </div>

          {/* Credible / Measurable detail */}
          {credibleDetail && (
            <p 
              className="text-[12px] sm:text-[12.5px] leading-relaxed font-mono"
              style={{ color: "var(--text-secondary)" }}
            >
              {credibleDetail}
            </p>
          )}

          {/* Stack tags & Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t" style={{ borderColor: "var(--line)" }}>
            <div className="flex flex-wrap gap-1.5">
              {displayTags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[10.5px] font-mono"
                  style={{
                    background: "var(--surface-raised)",
                    border: "1px solid var(--line)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[12px] font-medium font-mono hover:underline"
                  style={{ color: "var(--text-primary)" }}
                >
                  <span>Live</span>
                </a>
              )}

              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium font-mono hover:underline"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <SiGithub size={12} />
                  <span>Source</span>
                </a>
              )}
            </div>
          </div>

        </div>

        {/* ── Right Column: Project Media / Visual (5 cols, max 240px media) ── */}
        <div className="lg:col-span-5 w-full h-full min-h-[180px] max-h-[240px]">
          {image ? (
            <div className="w-full h-full min-h-[180px] max-h-[240px] rounded-xl relative overflow-hidden border border-[var(--line)] bg-[#0c0c0e] group">
              <Image
                src={image}
                alt={title ? `${title} - AI and systems project by Ayush Tripathi` : "Project preview"}
                fill
                className="object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          ) : (
            <div 
              className="w-full h-full min-h-[180px] max-h-[240px] rounded-xl p-4 flex flex-col justify-between relative overflow-hidden select-none"
              style={{
                background: "var(--surface-raised)",
                border: "1px solid var(--line)",
              }}
            >
              <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono" style={{ color: "var(--text-secondary)" }}>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--accent)" }} />
                  STATUS :: {status}
                </span>
                <span className="tabular-nums" style={{ color: "var(--text-primary)" }}>{year}</span>
              </div>

              <div className="p-3 rounded bg-[var(--surface)] border border-[var(--line)] font-mono text-[10px] flex flex-col gap-1.5 my-auto">
                <div className="flex items-center justify-between text-[9px] text-[var(--text-muted)] pb-1 border-b border-[var(--line)]">
                  <span className="truncate max-w-[140px]">{title}</span>
                  <span style={{ color: "var(--accent)" }}>{displayTags[0] || "Architecture"}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {displayTags.map((t: string) => (
                    <span key={t} className="px-1.5 py-0.5 rounded bg-[var(--surface-raised)] border border-[var(--line)] text-[9px] text-[var(--text-secondary)]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono border-t pt-2.5" style={{ borderColor: "var(--line)" }}>
                <span className="text-[var(--text-secondary)]">{github ? "Repository Linked" : "Architecture Verified"}</span>
                <span className="text-[var(--text-primary)] font-medium">{website ? "Live Demo" : "Production"}</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </article>
  );
}
