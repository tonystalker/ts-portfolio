import type { Metadata } from "next";
import Link from "next/link";
import { StorySection } from "@/components/main/StorySection";
import { ContactCard } from "@/components/main/ContactCard";

export const metadata: Metadata = {
  title: "About | AI Agent & Backend Engineer",
  description:
    "Background and engineering journey of Ayush Tripathi, an AI agent and backend engineer from IIT (BHU) Varanasi building LangGraph multi-agent systems and FastAPI backends.",
  alternates: { canonical: "https://www.ayush-tripathi.in/about" },
  openGraph: {
    title: "About | Ayush Tripathi | AI Agent & Backend Engineer",
    description:
      "Background and engineering journey of Ayush Tripathi, an AI agent and backend engineer from IIT (BHU) Varanasi.",
    url: "https://www.ayush-tripathi.in/about",
    type: "profile",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About Ayush Tripathi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Ayush Tripathi | AI Agent & Backend Engineer",
    description:
      "Background and engineering journey of Ayush Tripathi, an AI agent and backend engineer from IIT (BHU) Varanasi.",
    images: ["/og-image.png"],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Ayush Tripathi",
            "description": "How Ayush Tripathi got into programming, systems, and applied AI.",
            "url": "https://www.ayush-tripathi.in/about",
            "mainEntity": {
              "@type": "Person",
              "name": "Ayush Tripathi",
              "alumniOf": "Indian Institute of Technology (BHU) Varanasi",
              "jobTitle": "AI Systems & Product Engineer",
              "url": "https://www.ayush-tripathi.in"
            }
          })
        }}
      />
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

            {/* ── Editorial Story (Full chapters open) ─────────────── */}
            <section className="w-full mt-10" aria-label="Personal narrative and story">
              <StorySection compact={false} />
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
