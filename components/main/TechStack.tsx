"use client";

interface CapabilityGroup {
  category: string;
  description: string;
  tools: string[];
}

const CAPABILITIES: CapabilityGroup[] = [
  {
    category: "AI & agent systems",
    description: "Stateful agent graphs, local tool protocols, hybrid RAG retrieval, and deterministic runtime evaluation.",
    tools: ["Python", "LangGraph", "LangChain", "MCP (Model Context Protocol)", "E2B Sandboxes", "Groq", "Pinecone"],
  },
  {
    category: "Application layer",
    description: "Accessible, performance-oriented interfaces with tight component boundaries and low-latency interaction feedback.",
    tools: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Three.js"],
  },
  {
    category: "Backend & infrastructure",
    description: "Concurrent microservices, streaming WebSocket pipelines, containerized environments, and persistent storage.",
    tools: ["Go", "Node.js", "FastAPI", "Docker", "PostgreSQL", "Supabase", "Redis"],
  },
];

export function TechStack() {
  return (
    <div className="w-full flex flex-col gap-6">
      {CAPABILITIES.map((group) => (
        <div 
          key={group.category}
          className="p-5 sm:p-6 rounded-xl flex flex-col gap-3 transition-colors"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
          }}
        >
          {/* Capability Heading & summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h3 
              className="text-[14px] sm:text-[15px] font-semibold tracking-tight"
              style={{ color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}
            >
              {group.category}
            </h3>
            <span 
              className="text-[11px] font-mono sm:text-right"
              style={{ color: "var(--text-secondary)" }}
            >
              {group.tools.length} core tools
            </span>
          </div>

          <p 
            className="text-[12.5px] sm:text-[13px] leading-relaxed"
            style={{ color: "var(--text-body)", fontFamily: "var(--font-sans)" }}
          >
            {group.description}
          </p>

          {/* Text-forward tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {group.tools.map((tool) => (
              <span
                key={tool}
                className="px-2.5 py-1 rounded-md text-[11px] sm:text-[12px] font-mono transition-colors"
                style={{
                  background: "var(--surface-raised)",
                  border: "1px solid var(--line)",
                  color: "var(--text-primary)",
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
