"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import { SiGithub } from "react-icons/si";
import { ProjectDrawer } from "@/components/main/ProjectDrawer";
import type { NotionProject } from "@/lib/notion/models";

interface FlightBoardProps {
  projects: NotionProject[];
}
export function FlightBoard({ projects }: FlightBoardProps) {
  const [selectedProject, setSelectedProject] = useState<NotionProject | null>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const hoveredProject = projects.find((p) => p.slug === hoveredSlug);

  const statusConfig: Record<string, { color: string; label: string }> = {
    LIVE:     { color: "var(--live-badge)", label: "Live" },
    BUILDING: { color: "#F59E0B",           label: "Building" },
    ARCHIVED: { color: "var(--text-muted)", label: "Archived" },
  };

  return (
    <div className="w-full flex flex-col relative">
      {projects.map((project, i) => {
        const isHovered = hoveredSlug === project.slug;
        const { color, label } = statusConfig[project.status ?? "ARCHIVED"] ?? statusConfig.ARCHIVED;

        return (
          <div
            key={project.slug || project.id || i}
            ref={(el) => { rowRefs.current[project.slug || project.id] = el as HTMLDivElement | null; }}
            className="group flex items-center justify-between py-4 no-underline transition-all duration-200 ease-out rounded-xl px-3 -mx-3 cursor-pointer"
            style={{
              borderTop: i === 0 ? "1px solid var(--border)" : "none",
              borderBottom: "1px solid var(--border)",
              background: isHovered ? "var(--glass)" : "transparent",
            }}
            onClick={() => setSelectedProject(project as NotionProject)}
            onMouseEnter={() => setHoveredSlug(project.slug)}
            onMouseLeave={() => setHoveredSlug(null)}
          >
            <div className="flex items-center gap-5 min-w-0">
              {/* Year */}
              <span
                className="text-[12px] tabular-nums flex-shrink-0"
                style={{
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {project.year || "—"}
              </span>

              {/* Title + description */}
              <div className="flex flex-col gap-0.5 min-w-0">
                <span
                  className="text-[14px] font-medium tracking-[-0.01em] truncate transition-colors duration-200"
                  style={{
                    color: isHovered ? "var(--accent)" : "var(--text)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {project.title}
                </span>
                {project.description && (
                  <span
                    className="text-[12px] truncate hidden sm:block"
                    style={{
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {project.description}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 flex-shrink-0 ml-4">
              {/* Tags */}
              <div className="hidden sm:flex gap-1.5">
                {project.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{
                      color: "var(--text-muted)",
                      background: "var(--border)",
                      fontFamily: "var(--font-mono)",
                      border: "1px solid var(--border-secondary)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Status */}
              <div className="flex items-center gap-1.5">
                <span
                  className="inline-flex w-[6px] h-[6px] rounded-full flex-shrink-0"
                  style={{ background: color }}
                />
                <span
                  className="text-[11px] hidden sm:inline"
                  style={{ color, fontFamily: "var(--font-mono)" }}
                >
                  {label}
                </span>
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center transition-colors duration-200 hover:text-[var(--accent)]"
                    style={{ color: "var(--text-muted)" }}
                    aria-label="GitHub Repository"
                  >
                    <SiGithub size={16} />
                  </a>
                )}
                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 transition-colors duration-200 hover:text-[var(--accent)]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span className="text-[13px] font-medium hidden sm:inline" style={{ fontFamily: "var(--font-sans)" }}>visit</span>
                    <span className="text-[16px] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Floating preview — clean, minimal */}
      {hoveredProject && (
        <div
          className="fixed right-8 z-40 pointer-events-none hidden lg:block"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <div
            className="overflow-hidden"
            style={{
              width: "280px",
              borderRadius: "24px",
              border: "1px solid var(--border)",
              background: "var(--glass-elevated)",
              backdropFilter: "blur(28px) saturate(180%)",
              WebkitBackdropFilter: "blur(28px) saturate(180%)",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            <div className="relative w-full" style={{ height: "160px" }}>
              {hoveredProject.coverImage ? (
                <Image
                  src={hoveredProject.coverImage}
                  alt={hoveredProject.title}
                  fill
                  className="object-cover"
                  style={{ borderRadius: "0" }}
                  sizes="280px"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--bg-secondary)] gap-2">
                  <SiGithub className="text-4xl text-[var(--text-muted)] opacity-30" />
                  <span className="text-xs text-[var(--text-muted)] font-mono opacity-40">Source Code</span>
                </div>
              )}
              {/* Subtle overlay at bottom */}
              <div
                className="absolute inset-x-0 bottom-0 h-16"
                style={{
                  background: "linear-gradient(to top, var(--glass-elevated), transparent)",
                }}
              />
            </div>
            <div className="px-4 py-3">
              <p
                className="text-[12px] leading-relaxed"
                style={{ color: "var(--text-body)", fontFamily: "var(--font-mono)" }}
              >
                {hoveredProject.description ?? "—"}
              </p>
            </div>
          </div>
        </div>
      )}

      <ProjectDrawer 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
}
