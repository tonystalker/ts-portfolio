"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import type { NotionExperience } from "@/lib/notion/models";
import { portfolioConfig } from "@/config/portfolio";

interface ExperienceProps {
  roles?: NotionExperience[];
}

export function Experience({ roles }: ExperienceProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Fallback to portfolioConfig if Notion roles is empty
  const displayRoles = roles && roles.length > 0 ? roles : portfolioConfig.experience.map(e => ({
    id: e.id,
    role: e.title,
    company: e.company,
    duration: e.duration,
    overview: e.summary,
    contributions: e.details,
    techStack: e.tech,
    companyUrl: "",
    published: true,
    order: 1,
  }));

  if (!displayRoles || displayRoles.length === 0) return null;

  return (
    <div className="w-full flex flex-col relative pl-2 sm:pl-4">
      {/* Timeline track */}
      <div 
        className="absolute left-0 sm:left-1 top-2 bottom-2 w-[1px]" 
        style={{ background: "var(--line)" }} 
      />

      <div className="flex flex-col gap-6 sm:gap-8">
        {displayRoles.map((role) => {
          const isExpanded = expandedId === role.id;

          return (
            <article
              key={role.id}
              className="relative pl-6 sm:pl-8 group cursor-pointer"
              onClick={() => setExpandedId(isExpanded ? null : role.id)}
            >
              {/* Timeline marker node */}
              <div 
                className="absolute left-[-4.5px] sm:left-[-3.5px] top-1.5 w-2.5 h-2.5 rounded-full border transition-colors duration-200"
                style={{
                  background: isExpanded ? "var(--accent)" : "var(--surface)",
                  borderColor: isExpanded ? "var(--accent)" : "var(--line-strong)",
                }}
              />

              <div 
                className="p-5 sm:p-6 rounded-xl transition-all duration-200"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                }}
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <h3 
                      className="text-[15px] sm:text-[16px] font-semibold tracking-tight"
                      style={{ color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}
                    >
                      {role.role}
                    </h3>
                    <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
                      @ <span className="font-medium text-[var(--text-primary)]">{role.company}</span>
                    </span>
                  </div>

                  <span 
                    className="text-[11px] sm:text-[12px] font-mono tabular-nums"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {role.duration}
                  </span>
                </div>

                {/* One-line impact statement */}
                <p 
                  className="text-[13px] sm:text-[13.5px] leading-relaxed"
                  style={{ color: "var(--text-body)", fontFamily: "var(--font-sans)" }}
                >
                  {role.overview}
                </p>

                {/* Expand / Collapse toggle prompt */}
                <div className="mt-3 flex items-center justify-between">
                  <span 
                    className="text-[11px] font-mono text-[var(--accent)] hover:underline inline-flex items-center gap-1"
                  >
                    {isExpanded ? "Collapse details ↑" : "Expand details ↓"}
                  </span>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-4 border-t flex flex-col gap-4" style={{ borderColor: "var(--line)" }}>
                        <ul className="space-y-2.5">
                          {role.contributions.map((detail, idx) => (
                            <li 
                              key={idx} 
                              className="flex items-start gap-2.5 text-[13px] leading-relaxed" 
                              style={{ color: "var(--text-body)" }}
                            >
                              <span className="text-[var(--accent)] select-none mt-0.5">▹</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech tags */}
                        {role.techStack && role.techStack.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {role.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-0.5 rounded text-[10.5px] font-mono"
                                style={{
                                  background: "var(--surface-raised)",
                                  border: "1px solid var(--line)",
                                  color: "var(--text-secondary)",
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
