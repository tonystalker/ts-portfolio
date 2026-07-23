"use client";

import { useState } from "react";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { BrowserMockup } from "@/components/main/BrowserMockup";
import { ProjectDrawer } from "@/components/main/ProjectDrawer";
import type { NotionProject } from "@/lib/notion/models";

export function ProjectShowcase({ projects }: { projects: NotionProject[] }) {
  const [selectedProject, setSelectedProject] = useState<NotionProject | null>(null);

  return (
    <LazyMotion features={domAnimation}>
      <div className="w-full flex flex-col gap-4">
        {projects.map((project, index) => {
          return (
            <m.div
              key={project.slug || project.id || index}
              layout
              className="w-full overflow-hidden transition-all duration-300 ease-out cursor-pointer group"
              style={{
                borderRadius: "20px",
                border: "1px solid var(--border)",
                background: "var(--glass)",
                backdropFilter: "blur(28px) saturate(180%)",
                WebkitBackdropFilter: "blur(28px) saturate(180%)",
              }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Header (Always Visible) */}
              <div className="p-4 sm:p-5 flex items-start sm:items-center justify-between">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <h3
                      className="text-[16px] font-semibold tracking-[-0.01em] transition-colors group-hover:text-[var(--accent)]"
                      style={{ color: "var(--text)", fontFamily: "var(--font-sans)" }}
                    >
                      {project.title}
                    </h3>
                    <div
                      className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[9px] font-bold tracking-widest uppercase border"
                      style={{
                        background: project.status === "LIVE" ? "rgba(16, 185, 129, 0.1)" : "var(--border)",
                        borderColor: project.status === "LIVE" ? "rgba(16, 185, 129, 0.2)" : "transparent",
                        color: project.status === "LIVE" ? "rgb(16, 185, 129)" : "var(--text-muted)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {project.status === "LIVE" && (
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </span>
                      )}
                      {project.status}
                    </div>
                  </div>
                  
                  {/* One line desc */}
                  <p
                    className="text-[12.5px] sm:text-[13px] leading-relaxed max-w-full sm:max-w-[80%]"
                    style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Open Indicator */}
                <div
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-transform duration-300 mt-1 sm:mt-0 flex-shrink-0"
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                  }}
                >
                  ↗
                </div>
              </div>
            </m.div>
          );
        })}

        <ProjectDrawer 
          project={selectedProject} 
          isOpen={!!selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />

        <style>{`
          @keyframes glass-sweep {
            0% { transform: translateX(-150%) skewX(12deg); }
            100% { transform: translateX(150%) skewX(12deg); }
          }
        `}</style>
      </div>
    </LazyMotion>
  );
}
