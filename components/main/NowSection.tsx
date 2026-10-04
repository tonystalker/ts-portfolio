"use client";

import Link from "next/link";

const NOW_ITEMS = [
  {
    topic: "Building",
    title: "Local Agent Workflows & MCP Integrations",
    content: "Exploring low-latency streaming turn-taking, open-weight local inference, and Model Context Protocol tool routing.",
    status: "Active Sprint",
  },
  {
    topic: "Researching",
    title: "Deterministic State Machines in LLM Systems",
    content: "Investigating structured agent supervisor patterns, citation grounding thresholds, and failure-recovery boundaries.",
    status: "Ongoing Eval",
  },
  {
    topic: "Reading",
    title: "Distributed Memory & Systems Architecture",
    content: "Studying CRDT-based state reconciliation for autonomous agent swarms and tree-sitter AST queries for code generation.",
    status: "Notes in /reads",
    link: "/reads",
  },
];

export function NowSection() {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* 3 Editorial Now cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {NOW_ITEMS.map((item) => (
          <div
            key={item.topic}
            className="p-5 rounded-xl flex flex-col justify-between gap-4"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--line)",
            }}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="uppercase tracking-wider font-semibold" style={{ color: "var(--accent)" }}>
                  {item.topic}
                </span>
                <span style={{ color: "var(--text-secondary)" }}>
                  {item.status}
                </span>
              </div>
              <h4 
                className="text-[14px] font-medium leading-snug tracking-tight"
                style={{ color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}
              >
                {item.title}
              </h4>
              <p 
                className="text-[12px] leading-relaxed"
                style={{ color: "var(--text-body)", fontFamily: "var(--font-mono)" }}
              >
                {item.content}
              </p>
            </div>

            {item.link && (
              <Link
                href={item.link}
                className="text-[11px] font-mono hover:underline inline-flex items-center gap-1"
                style={{ color: "var(--accent)" }}
              >
                Explore reading list →
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
