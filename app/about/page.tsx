import type { Metadata } from "next";
import Link from "next/link";
import { StorySection } from "@/components/main/StorySection";
import { ContactCard } from "@/components/main/ContactCard";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "About | AI Agent & Backend Engineer",
  description:
    "Background and journey of Ayush Tripathi, an AI agent and backend engineer from IIT (BHU) Varanasi building LangGraph systems and FastAPI backends.",
  alternates: { canonical: "https://www.ayush-tripathi.in/about" },
  openGraph: {
    title: "About | Ayush Tripathi | AI Agent & Backend Engineer",
    description:
      "Background and journey of Ayush Tripathi, an AI agent and backend engineer from IIT (BHU) Varanasi building LangGraph systems and FastAPI backends.",
    url: "https://www.ayush-tripathi.in/about",
    type: "profile",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About Ayush Tripathi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Ayush Tripathi | AI Agent & Backend Engineer",
    description:
      "Background and journey of Ayush Tripathi, an AI agent and backend engineer from IIT (BHU) Varanasi building LangGraph systems and FastAPI backends.",
    images: ["/og-image.png"],
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Ayush Tripathi",
  description:
    "Background and engineering journey of Ayush Tripathi, an AI agent and backend engineer from IIT (BHU) Varanasi.",
  url: "https://www.ayush-tripathi.in/about",
  mainEntity: {
    "@id": "https://www.ayush-tripathi.in/#person",
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutSchema} />
      <main className="min-h-dvh flex justify-center w-full overflow-x-hidden" itemScope itemType="https://schema.org/AboutPage">
        <div
          className="flex flex-col relative w-full items-center"
          style={{ maxWidth: "860px" }}
        >
          <div className="w-full max-w-[760px] px-5 sm:px-8 pb-36 flex flex-col items-start relative">
            
            {/* ── Header ──────────────────────────────────────────── */}
            <header className="mt-20 sm:mt-28 w-full" aria-label="About header">
              <div className="flex flex-row items-end justify-between w-full pb-4 border-b" style={{ borderColor: "var(--line)" }}>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.14em]" style={{ color: "var(--accent)" }}>
                    BACKGROUND & STORY
                  </span>
                  <h1
                    className="text-[36px] sm:text-[48px] font-semibold tracking-[-0.03em] leading-[1.05] mt-1"
                    style={{ color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}
                  >
                    about
                  </h1>
                </div>
                <Link
                  href="/"
                  className="text-[13px] font-mono no-underline transition-colors duration-200 mb-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  ← back
                </Link>
              </div>

              <div className="mt-4 flex items-center gap-3 text-[12px] font-mono" style={{ color: "var(--text-secondary)" }}>
                <span>IIT (BHU) Varanasi</span>
                <span>·</span>
                <span>India · UTC+5:30</span>
                <span>·</span>
                <span className="text-[var(--text-primary)]">Move fast. Make it hold.</span>
              </div>
            </header>

            {/* ── Factual Intro ─────────────────────────────────────────── */}
            <div className="mt-8 text-[15px] sm:text-[16px] leading-[1.65] text-pretty max-w-[680px]" style={{ color: "var(--text-body)", fontFamily: "var(--font-sans)" }}>
              <p>
                Ayush Tripathi is an AI agent and backend engineer from IIT (BHU) Varanasi, building LangGraph multi-agent systems, RAG pipelines, and FastAPI backends. Known online by the handle ayutripathi, he focuses on reliable multi-model orchestration, production-ready AI tools, and scalable architectures.
              </p>
            </div>

            {/* ── Editorial Story (Full chapters open) ─────────────── */}
            <section className="w-full mt-10" aria-label="Personal narrative and story">
              <StorySection compact={false} />
            </section>

            {/* ── Frequently Asked Questions ──────────────────────── */}
            <section className="w-full mt-16 pt-10 border-t" style={{ borderColor: "var(--line)" }} aria-label="Frequently asked questions">
              <div className="flex flex-col gap-2 mb-8">
                <span className="text-[11px] font-mono uppercase tracking-[0.14em]" style={{ color: "var(--accent)" }}>
                  FREQUENTLY ASKED QUESTIONS
                </span>
                <h2 
                  className="text-[24px] sm:text-[28px] font-semibold tracking-[-0.02em]"
                  style={{ color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}
                >
                  Quick facts
                </h2>
              </div>

              <div className="flex flex-col gap-6 w-full">
                <div className="flex flex-col gap-1.5 pb-6 border-b" style={{ borderColor: "var(--line)" }}>
                  <h3 className="text-[15px] sm:text-[16px] font-medium" style={{ color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}>
                    Who is Ayush Tripathi?
                  </h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
                    Ayush Tripathi (also known as ayutripathi) is an AI agent and backend engineer based in India, and a graduate of the Indian Institute of Technology (BHU) Varanasi.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 pb-6 border-b" style={{ borderColor: "var(--line)" }}>
                  <h3 className="text-[15px] sm:text-[16px] font-medium" style={{ color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}>
                    What does Ayush Tripathi build?
                  </h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
                    He builds multi-agent systems, retrieval-augmented generation (RAG) pipelines, and robust backends using LangGraph, LangChain, FastAPI, Pinecone, Qdrant, Model Context Protocol (MCP), Groq, Gemini, and ElevenLabs. Highlighted projects include FlowDesk (a multi-agent customer support platform with hybrid RAG and multi-model routing) and Voiceflow (a local real-time AI voice assistant with wake-word detection and MCP tools).
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 pb-6 border-b" style={{ borderColor: "var(--line)" }}>
                  <h3 className="text-[15px] sm:text-[16px] font-medium" style={{ color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}>
                    Is Ayush Tripathi available for work?
                  </h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
                    Yes, he is open to internships, freelance projects, and full-time roles in AI agent engineering and backend development.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[15px] sm:text-[16px] font-medium" style={{ color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}>
                    Where can I see his work and profiles?
                  </h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
                    You can inspect his open-source code on GitHub (https://github.com/tonystalker), follow engineering notes on X (https://x.com/TonyStalkerr), and connect on LinkedIn (https://www.linkedin.com/in/ayush-tripathi-4a062b1b4/).
                  </p>
                </div>
              </div>
            </section>

            {/* ── Contact Section ─────────────────────────────────── */}
            <section className="w-full mt-20 pt-10 border-t" style={{ borderColor: "var(--line)" }} aria-label="Contact">
              <ContactCard />
            </section>

          </div>
        </div>
      </main>
    </>
  );
}
