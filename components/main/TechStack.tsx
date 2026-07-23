"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiGithub,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiGo,
  SiPython,
  SiSolidity,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiLangchain,
  SiLanggraph,
} from "react-icons/si";

type TechItem = {
  name: string;
  Icon: React.ElementType;
  description: string;
};

type TechCategory = {
  category: string;
  items: TechItem[];
};

const TECH_CATEGORIES: TechCategory[] = [
  {
    category: "AI & Agents",
    items: [
      { name: "Python", Icon: SiPython, description: "Core language for ML models and data pipelines." },
      { name: "LangChain", Icon: SiLangchain, description: "Orchestrating LLM workflows and RAG systems." },
      { name: "LangGraph", Icon: SiLanggraph, description: "Building stateful, multi-actor AI agents." },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", Icon: SiReact, description: "Building interactive, component-driven UIs." },
      { name: "Next.js", Icon: SiNextdotjs, description: "Server-side rendering and full-stack React framework." },
      { name: "TypeScript", Icon: SiTypescript, description: "Type-safe JavaScript for scalable codebases." },
    ],
  },
  {
    category: "Backend & Infra",
    items: [
      { name: "Go", Icon: SiGo, description: "High-performance microservices and concurrent systems." },
      { name: "Node.js", Icon: SiNodedotjs, description: "Fast, asynchronous event-driven backend." },
      { name: "Docker", Icon: SiDocker, description: "Containerizing applications for consistent deployment." },
    ],
  },
  {
    category: "Data & Web3",
    items: [
      { name: "PostgreSQL", Icon: SiPostgresql, description: "Primary relational database for structured data." },
      { name: "MongoDB", Icon: SiMongodb, description: "NoSQL document storage for flexible schemas." },
      { name: "Solidity", Icon: SiSolidity, description: "Writing secure smart contracts on the EVM." },
    ],
  }
];

export function TechStack() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col gap-8">
      {TECH_CATEGORIES.map((group) => (
        <div key={group.category} className="flex flex-col gap-3">
          <h4 
            className="text-[12px] font-semibold uppercase tracking-widest"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}
          >
            {group.category}
          </h4>
          <div className="flex flex-wrap gap-2">
            {group.items.map((tech) => (
              <div
                key={tech.name}
                className="relative group cursor-crosshair"
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
                onClick={() => setHoveredTech(hoveredTech === tech.name ? null : tech.name)}
              >
                <div
                  className="stack-chip flex items-center gap-2 px-3 py-1.5 transition-all duration-200 ease-out"
                  style={{
                    borderRadius: "999px",
                    border: "1px solid var(--border-secondary)",
                    background: "var(--glass)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  <tech.Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  {tech.name}
                </div>

                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredTech === tech.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 pointer-events-none"
                      style={{
                        borderRadius: "12px",
                        background: "var(--glass-elevated)",
                        backdropFilter: "blur(28px) saturate(180%)",
                        WebkitBackdropFilter: "blur(28px) saturate(180%)",
                        border: "1px solid var(--border)",
                        boxShadow: "var(--shadow-md)",
                      }}
                    >
                      <p 
                        className="text-[11px] leading-relaxed text-center"
                        style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                      >
                        {tech.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
