"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface ProjectData {
  title: string;
  slug: string;
  year?: number;
  status?: string;
  tags: string[];
  link?: string;
  description?: string;
  image?: string;
}

interface FlightBoardProps {
  projects: ProjectData[];
}

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

function ScrambleText({ text, isHovered }: { text: string; isHovered: boolean }) {
  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      return;
    }

    let frame = 0;
    const maxFrames = 15;

    const animate = () => {
      frame++;
      if (frame >= maxFrames) {
        setDisplayText(text);
        return;
      }
      const scrambled = text
        .split("")
        .map((char) => {
          if (char === " ") return " ";
          return Math.random() > 0.3
            ? CHARS[Math.floor(Math.random() * CHARS.length)]
            : char;
        })
        .join("");
      setDisplayText(scrambled);
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isHovered, text]);

  return <>{displayText}</>;
}

const STATUS_COLOR: Record<string, string> = {
  LIVE: "var(--live-badge)",
  BUILDING: "#FF3333",
  ARCHIVED: "#888888",
};

const PROJECT_IMAGES: Record<string, string> = {
  "crowd-fund": "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&q=80",
  "code-interview": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80",
  "web3-jobs": "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1200&q=80",
  "defi-protocol": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
};

export function FlightBoard({ projects }: FlightBoardProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [previewPos, setPreviewPos] = useState({ y: 0 });
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleRowEnter = (slug: string, el: HTMLDivElement | null) => {
    setHoveredSlug(slug);
    if (el) {
      const rect = el.getBoundingClientRect();
      setPreviewPos({ y: rect.top });
    }
  };

  const hoveredProject = projects.find((p) => p.slug === hoveredSlug);

  return (
    <div
      className="w-full border-t border-[var(--text)]/20 flex flex-col relative"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {projects.map((project) => {
        const isHovered = hoveredSlug === project.slug;
        const color = STATUS_COLOR[project.status ?? "ARCHIVED"] ?? "#888";

        return (
          <div
            key={project.slug}
            ref={(el) => { rowRefs.current[project.slug] = el; }}
            className="group w-full border-b border-[var(--text)]/20 hover:bg-[var(--text)]/5 transition-colors cursor-crosshair"
            onMouseEnter={() => handleRowEnter(project.slug, rowRefs.current[project.slug])}
            onMouseLeave={() => setHoveredSlug(null)}
          >
            <div className="flex items-center justify-between py-3.5 px-2 w-full select-none">
              <div className="flex items-center gap-4 sm:gap-8 min-w-0">
                <span className="text-[12px] opacity-40 flex-shrink-0">
                  [{project.year ?? "—"}]
                </span>
                <a
                  className="text-[14px] font-bold tracking-tight text-[var(--text)] uppercase hover:underline no-underline truncate"
                  href={project.link ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ScrambleText text={project.title} isHovered={isHovered} />
                </a>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                {/* Tags (hidden on mobile) */}
                <div className="hidden sm:flex gap-1.5">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] tracking-widest uppercase opacity-40 border border-[var(--text)]/20 px-1.5 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Status badge */}
                <div className="flex items-center gap-2">
                  <div className="relative flex items-center justify-center w-[6px] h-[6px]">
                    <span
                      className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping"
                      style={{ backgroundColor: color }}
                    />
                    <span
                      className="relative inline-flex w-[6px] h-[6px] rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                  <span
                    className="text-[10px] tracking-[0.1em] hidden sm:inline-block"
                    style={{ color, opacity: 0.8 }}
                  >
                    {project.status ?? "ARCHIVED"}
                  </span>
                </div>

                {/* Arrow */}
                <span className="text-[var(--text)] text-[15px] opacity-40 group-hover:opacity-100 inline-block transition-all duration-500 group-hover:rotate-45">
                  ↗
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Floating preview image — appears on hover, fixed to viewport right */}
      {hoveredProject && (
        <div
          className="fixed right-8 z-40 w-72 pointer-events-none hidden lg:block"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <div className="border border-[var(--text)] shadow-[4px_4px_0px_var(--text)] overflow-hidden bg-[var(--bg)]">
            <div className="relative w-full h-44">
              <Image
                src={
                  hoveredProject.image ??
                  PROJECT_IMAGES[hoveredProject.slug] ??
                  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80"
                }
                alt={hoveredProject.title}
                fill
                className="object-cover grayscale mix-blend-luminosity"
                sizes="288px"
                unoptimized
              />
            </div>
            <div className="p-3 border-t border-[var(--text)]/20">
              <p className="text-[11px] opacity-60 leading-relaxed" style={{ fontFamily: "var(--font-mono)" }}>
                {hoveredProject.description ?? "—"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
