"use client";

import { ProjectCardEditorial } from "@/components/main/ProjectCardEditorial";
import { portfolioConfig, Project } from "@/config/portfolio";
import type { NotionProject } from "@/lib/notion/models";

interface ProjectShowcaseProps {
  projects?: NotionProject[];
}

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  // Use portfolioConfig projects which contain full case-study data (Voiceflow, FlowDesk, CodeSentinel)
  const caseStudyProjects: Project[] = portfolioConfig.projects.slice(0, 3);

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-10">
      {caseStudyProjects.map((project, index) => (
        <ProjectCardEditorial
          key={project.slug}
          project={project}
          index={index}
        />
      ))}
    </div>
  );
}
