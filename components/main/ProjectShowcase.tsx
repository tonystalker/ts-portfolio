"use client";

import { ProjectCardEditorial } from "@/components/main/ProjectCardEditorial";
import type { NotionProject } from "@/lib/notion/models";

interface ProjectShowcaseProps {
  projects?: NotionProject[];
}

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const displayProjects = projects || [];

  if (displayProjects.length === 0) {
    return (
      <div 
        className="w-full p-10 sm:p-14 rounded-2xl border text-center flex flex-col items-center justify-center gap-3 my-4"
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

  // Display top 3 projects (prioritizing featured ones)
  const featured = displayProjects.filter(p => p.featured);
  const showcaseItems = featured.length > 0 ? featured.slice(0, 3) : displayProjects.slice(0, 3);

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-10">
      {showcaseItems.map((project, index) => (
        <ProjectCardEditorial
          key={project.slug || project.id}
          project={project}
          index={index}
        />
      ))}
    </div>
  );
}
