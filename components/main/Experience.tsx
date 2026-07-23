"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";

import type { NotionExperience } from "@/lib/notion/models";

export function Experience({ roles }: { roles: NotionExperience[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!roles || roles.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-4">
      {roles.map((role) => {
        const isExpanded = expandedId === role.id;

        return (
          <m.article
            key={role.id}
            layout
            itemScope
            itemType="https://schema.org/EmployeeRole"
            className="w-full overflow-hidden transition-all duration-300 ease-out cursor-pointer group"
            style={{
              borderRadius: "20px",
              border: "1px solid var(--border)",
              background: "var(--glass)",
              backdropFilter: "blur(28px) saturate(180%)",
              WebkitBackdropFilter: "blur(28px) saturate(180%)",
            }}
            onClick={() => setExpandedId(isExpanded ? null : role.id)}
          >
            {/* Header (Always Visible) */}
            <header className="p-4 sm:p-5 flex items-center justify-between">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-2 w-full mb-1 sm:mb-0">
                  <div className="flex items-center gap-3">
                    <h3
                      className="text-[16px] font-semibold tracking-[-0.01em] transition-colors group-hover:text-[var(--accent)]"
                      style={{ color: "var(--text)", fontFamily: "var(--font-sans)" }}
                      itemProp="roleName"
                    >
                      {role.role}
                    </h3>
                    <span 
                      className="text-[14px]"
                      style={{ color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}
                      itemProp="worksFor"
                      itemScope
                      itemType="https://schema.org/Organization"
                    >
                      @ <span itemProp="name">{role.company}</span>
                    </span>
                  </div>
                  <span 
                    className="text-[12px] tabular-nums"
                    style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                    itemProp="startDate"
                  >
                    {role.duration}
                  </span>
                </div>
                
                {/* One line summary */}
                <p
                  className="text-[13px] leading-relaxed max-w-[90%]"
                  style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                  itemProp="description"
                >
                  {role.overview}
                </p>
              </div>
            </header>

            {/* Expanded Content */}
            <AnimatePresence>
              {isExpanded && (
                <m.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="p-4 sm:p-5 pt-0 sm:pt-0 border-t flex flex-col gap-4 sm:gap-5" style={{ borderColor: "var(--border)" }}>
                    {/* Bullet Points */}
                    <ul className="mt-5 space-y-3">
                      {role.contributions.map((detail, idx) => (
                        <li key={idx} className="flex gap-3 text-[13.5px] leading-relaxed" style={{ color: "var(--text-body)", fontFamily: "var(--font-sans)" }}>
                          <span style={{ color: "var(--accent)", marginTop: "2px" }}>▹</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack for Role */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {role.techStack.map(t => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-md text-[11px]"
                          style={{
                            background: "var(--bg)",
                            border: "1px solid var(--border)",
                            color: "var(--text-muted)",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </m.article>
        );
      })}
    </div>
  );
}
