"use client";

import Link from "next/link";
import { GithubActivity } from "@/components/main/GithubActivity";

const NOW_ITEMS = [
  {
    topic: "Building",
    title: "Local MCP Tool Protocols & Low-Latency Voice",
    content: "Optimizing Voiceflow for sub-150ms streaming turn-taking using open-weight local Whisper/Porcupine pipelines and Model Context Protocol servers.",
    status: "Active Sprint",
  },
  {
    topic: "Researching",
    title: "Deterministic Grounding in Multi-Agent Support",
    content: "Evaluating LangGraph supervisor nodes against edge-case hallucinations in FlowDesk — enforcing strict citation overlap thresholds before response generation.",
    status: "Ongoing Eval",
  },
  {
    topic: "Reading",
    title: "Distributed Memory & AST-Guided Fix Generation",
    content: "Studying CRDT-based state reconciliation for autonomous agent swarms and Tree-sitter semantic queries for automated PR patch validation.",
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

      {/* GitHub Activity as real-world evidence */}
      <div 
        className="p-5 sm:p-6 rounded-xl flex flex-col gap-4"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--line)",
        }}
      >
        <div className="flex items-center justify-between text-[11px] font-mono" style={{ color: "var(--text-secondary)" }}>
          <span className="uppercase tracking-wider">GitHub Contribution Proof</span>
          <a 
            href="https://github.com/tonystalker" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline flex items-center gap-1"
            style={{ color: "var(--accent)" }}
          >
            @tonystalker ↗
          </a>
        </div>
        <div className="w-full overflow-x-auto scrollbar-hide py-1">
          <GithubActivity />
        </div>
      </div>
    </div>
  );
}
