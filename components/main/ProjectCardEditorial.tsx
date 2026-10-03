"use client";

import { useState } from "react";
import { SiGithub } from "react-icons/si";
import { Project } from "@/config/portfolio";

// ── Custom Technical Visual 1: Voiceflow Waveform & Tool Routing ────────────────
function VoiceflowVisual() {
  return (
    <div 
      className="w-full h-44 sm:h-52 rounded-xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden select-none"
      style={{
        background: "radial-gradient(ellipse at center, rgba(200, 214, 106, 0.04) 0%, rgba(17, 17, 17, 0.95) 80%)",
        border: "1px solid var(--line)",
      }}
    >
      {/* Top status bar */}
      <div className="flex items-center justify-between text-[11px] font-mono" style={{ color: "var(--text-secondary)" }}>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full inline-block animate-pulse" style={{ background: "var(--accent)" }} />
          PORCUPINE_WAKE_WORD :: ACTIVE
        </span>
        <span className="tabular-nums" style={{ color: "var(--accent)" }}>LATENCY: 142ms</span>
      </div>

      {/* Waveform graphic */}
      <div className="flex items-center justify-center gap-1 sm:gap-1.5 my-auto h-20">
        {[20, 45, 75, 30, 90, 60, 100, 40, 85, 55, 95, 35, 70, 50, 80, 25, 65, 45, 90, 30, 50].map((h, i) => (
          <div
            key={i}
            className="w-1 sm:w-1.5 rounded-full transition-all duration-300"
            style={{
              height: `${h}%`,
              background: i >= 6 && i <= 14 ? "var(--accent)" : "rgba(240, 238, 233, 0.2)",
              opacity: i >= 6 && i <= 14 ? 1 : 0.4,
            }}
          />
        ))}
      </div>

      {/* Tool flow pipeline */}
      <div className="flex items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono border-t pt-3" style={{ borderColor: "var(--line)" }}>
        <span className="px-2 py-0.5 rounded bg-[var(--surface-raised)] border border-[var(--line)] text-[var(--text-body)]">
          &quot;Hey Ayush, reorder biryani&quot;
        </span>
        <span className="text-[var(--text-secondary)]">→</span>
        <span className="px-2 py-0.5 rounded bg-[var(--surface-raised)] border border-[var(--line)] text-[var(--accent)]">
          MCP :: swiggy_cart_add()
        </span>
        <span className="text-[var(--text-secondary)]">→</span>
        <span className="px-2 py-0.5 rounded bg-[var(--surface-raised)] border border-[var(--line)] text-emerald-400">
          STT :: 100% Local
        </span>
      </div>
    </div>
  );
}

// ── Custom Technical Visual 2: FlowDesk Hybrid RAG & Escalation ──────────────────
function FlowdeskVisual() {
  return (
    <div 
      className="w-full h-44 sm:h-52 rounded-xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden select-none"
      style={{
        background: "radial-gradient(ellipse at center, rgba(140, 179, 255, 0.04) 0%, rgba(17, 17, 17, 0.95) 80%)",
        border: "1px solid var(--line)",
      }}
    >
      <div className="flex items-center justify-between text-[11px] font-mono" style={{ color: "var(--text-secondary)" }}>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#60a5fa" }} />
          LANGGRAPH_SUPERVISOR :: MULTI-AGENT
        </span>
        <span className="tabular-nums text-emerald-400">GROUNDING CONFIDENCE: 98.4%</span>
      </div>

      {/* Architecture Routing Diagram */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 my-auto items-center text-[10px] sm:text-[11px] font-mono">
        <div className="p-2 rounded bg-[var(--surface-raised)] border border-[var(--line)] flex flex-col items-center text-center">
          <span className="text-[9px] uppercase tracking-wider text-[var(--text-secondary)]">INCOMING</span>
          <span className="font-semibold text-[var(--text-primary)] mt-1">Intent Classify</span>
          <span className="text-[9px] text-[var(--accent)] mt-0.5">Llama 3 (Groq)</span>
        </div>

        <div className="p-2 rounded bg-[var(--surface-raised)] border border-[var(--line)] flex flex-col items-center text-center border-l-2 border-l-blue-400">
          <span className="text-[9px] uppercase tracking-wider text-[var(--text-secondary)]">HYBRID RETRIEVAL</span>
          <span className="font-semibold text-[var(--text-primary)] mt-1">Pinecone + BM25</span>
          <span className="text-[9px] text-emerald-400 mt-0.5">Top-4 Chunks Cited</span>
        </div>

        <div className="p-2 rounded bg-[var(--surface-raised)] border border-[var(--line)] flex flex-col items-center text-center">
          <span className="text-[9px] uppercase tracking-wider text-[var(--text-secondary)]">DECISION</span>
          <span className="font-semibold text-emerald-400 mt-1">Deterministic Output</span>
          <span className="text-[9px] text-[var(--text-secondary)] mt-0.5">Escalate if &lt;0.85</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono border-t pt-3" style={{ borderColor: "var(--line)" }}>
        <span className="text-[var(--text-secondary)]">Automated Resolution: 70%+</span>
        <span className="text-[var(--text-secondary)]">Human Escalation Webhook: Supabase</span>
      </div>
    </div>
  );
}

// ── Custom Technical Visual 3: CodeSentinel AST & Sandbox Pipeline ───────────────
function CodeSentinelVisual() {
  return (
    <div 
      className="w-full h-44 sm:h-52 rounded-xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden select-none"
      style={{
        background: "radial-gradient(ellipse at center, rgba(239, 182, 109, 0.04) 0%, rgba(17, 17, 17, 0.95) 80%)",
        border: "1px solid var(--line)",
      }}
    >
      <div className="flex items-center justify-between text-[11px] font-mono" style={{ color: "var(--text-secondary)" }}>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: "var(--lamp)" }} />
          TREE_SITTER_AST :: E2B_ISOLATION
        </span>
        <span className="tabular-nums" style={{ color: "var(--lamp)" }}>SANDBOX STATUS: PASS</span>
      </div>

      {/* Terminal / Code Inspection visual */}
      <div className="p-2.5 rounded bg-[var(--surface-raised)] border border-[var(--line)] font-mono text-[10px] sm:text-[11px] flex flex-col gap-1">
        <div className="flex items-center justify-between text-[9px] text-[var(--text-secondary)] pb-1 border-b border-[var(--line)]">
          <span>PR #42 :: auth_middleware.py</span>
          <span className="text-amber-400">VULN_DETECTED: CWE-287</span>
        </div>
        <div className="text-red-400/80 truncate">- token = request.headers.get(&quot;X-Auth&quot;) # Missing signature check</div>
        <div className="text-emerald-400/90 truncate">+ token = verify_jwt_signature(request.headers.get(&quot;X-Auth&quot;))</div>
      </div>

      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono border-t pt-3" style={{ borderColor: "var(--line)" }}>
        <span className="text-[var(--text-secondary)]">Isolated Test Run: E2B Pytest Container</span>
        <span className="text-emerald-400">14/14 Tests Passed (0.8s)</span>
      </div>
    </div>
  );
}

interface ProjectCardEditorialProps {
  project: Project;
  index: number;
}

export function ProjectCardEditorial({ project, index }: ProjectCardEditorialProps) {
  const num = String(index + 1).padStart(2, "0");
  const year = project.year || 2026;

  // Render appropriate bespoke visual
  const renderVisual = () => {
    if (project.slug.toLowerCase().includes("voice")) {
      return <VoiceflowVisual />;
    }
    if (project.slug.toLowerCase().includes("flow")) {
      return <FlowdeskVisual />;
    }
    return <CodeSentinelVisual />;
  };

  return (
    <article 
      className="w-full p-6 sm:p-8 rounded-2xl flex flex-col gap-6 relative transition-all duration-300"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
      }}
    >
      {/* ── Top Bar: Num + Year + Live Status ── */}
      <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: "var(--line)" }}>
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-mono font-semibold" style={{ color: "var(--text-secondary)" }}>
            {num} — {year}
          </span>
          <span className="w-1 h-1 rounded-full opacity-30" style={{ background: "var(--text-secondary)" }} />
          <span className="text-[11px] font-mono uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
            {project.tags?.[0] || "AI System"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span 
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider"
            style={{
              background: "rgba(200, 214, 106, 0.10)",
              border: "1px solid rgba(200, 214, 106, 0.25)",
              color: "var(--accent)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--accent)" }} />
            {project.status}
          </span>
        </div>
      </div>

      {/* ── Heading & Outcome ── */}
      <div className="flex flex-col gap-2">
        <h3 
          className="text-[22px] sm:text-[26px] font-semibold tracking-tight"
          style={{ color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}
        >
          {project.title}
        </h3>
        <p 
          className="text-[14px] sm:text-[15px] leading-relaxed"
          style={{ color: "var(--text-body)", fontFamily: "var(--font-sans)" }}
        >
          {project.description}
        </p>
      </div>

      {/* ── Custom Technical Visual ── */}
      <div className="w-full">
        {renderVisual()}
      </div>

      {/* ── Why it matters & Under the hood ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Why it matters */}
        <div className="flex flex-col gap-2">
          <h4 className="text-[11px] font-mono uppercase tracking-wider font-semibold" style={{ color: "var(--text-secondary)" }}>
            Why it matters
          </h4>
          <p className="text-[13px] sm:text-[13.5px] leading-relaxed" style={{ color: "var(--text-body)" }}>
            {project.whyItMatters || project.shortDescription || project.description}
          </p>
        </div>

        {/* Under the hood */}
        <div className="flex flex-col gap-2">
          <h4 className="text-[11px] font-mono uppercase tracking-wider font-semibold" style={{ color: "var(--text-secondary)" }}>
            Under the hood
          </h4>
          <ul className="flex flex-col gap-1.5 text-[12.5px] sm:text-[13px]" style={{ color: "var(--text-body)" }}>
            {project.underTheHood ? (
              project.underTheHood.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[var(--accent)] select-none">▹</span>
                  <span>{item}</span>
                </li>
              ))
            ) : (
              project.tech?.map((t, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-[var(--accent)] select-none">▹</span>
                  <span>{t}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {/* ── Links / Actions ── */}
      <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: "var(--line)" }}>
        {project.website && (
          <a
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px] font-medium transition-all"
            style={{
              background: "var(--surface-raised)",
              color: "var(--text-primary)",
              border: "1px solid var(--line-strong)",
              fontFamily: "var(--font-sans)",
            }}
          >
            <span>Live site</span>
            <span style={{ color: "var(--accent)" }}>↗</span>
          </a>
        )}

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-[12px] font-medium transition-all"
            style={{
              background: "transparent",
              color: "var(--text-secondary)",
              border: "1px solid var(--line)",
              fontFamily: "var(--font-sans)",
            }}
          >
            <SiGithub size={14} />
            <span>Source</span>
          </a>
        )}
      </div>
    </article>
  );
}
