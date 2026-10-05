import type { Metadata } from "next";
import Link from "next/link";
import { ProjectsChiragView } from "@/components/main/ProjectsChiragView";
import { getProjects } from "@/lib/notion/service";

export const metadata: Metadata = {
  title: "Projects | AI Agent & Backend Systems",
  description:
    "AI agents, multi-agent orchestration systems, and backend platforms built by Ayush Tripathi, including FlowDesk and Voiceflow.",
  alternates: { canonical: "https://www.ayush-tripathi.in/projects" },
  openGraph: {
    title: "Projects | Ayush Tripathi | AI Agent & Backend Systems",
    description:
      "AI agents, multi-agent orchestration systems, and backend platforms built by Ayush Tripathi, including FlowDesk and Voiceflow.",
    url: "https://www.ayush-tripathi.in/projects",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Projects by Ayush Tripathi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Ayush Tripathi | AI Agent & Backend Systems",
    description:
      "AI agents, multi-agent orchestration systems, and backend platforms built by Ayush Tripathi, including FlowDesk and Voiceflow.",
    images: ["/og-image.png"],
  },
};

export const revalidate = 3600;

export default async function ProjectsPage() {
  const PROJECTS = await getProjects();
  const totalCount = String(PROJECTS.length).padStart(2, "0");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Projects by Ayush Tripathi",
            "description": "Production products up top, each with adoption, business impact, and the engineering decisions that made it work.",
            "url": "https://www.ayush-tripathi.in/projects",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": PROJECTS.map((p, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "item": {
                  "@type": "SoftwareSourceCode",
                  "name": p.title,
                  "description": p.shortDescription || p.description,
                  "codeRepository": p.githubUrl || undefined,
                  "url": p.liveDemoUrl || undefined,
                  "programmingLanguage": p.technologies || p.tags || [],
                  "author": {
                    "@type": "Person",
                    "name": "Ayush Tripathi",
                    "url": "https://www.ayush-tripathi.in"
                  }
                }
              }))
            }
          })
        }}
      />
      <main className="min-h-dvh flex justify-center w-full overflow-x-hidden bg-[#0a0a0b]" itemScope itemType="https://schema.org/CollectionPage">
        <div className="w-full max-w-[1080px] px-5 sm:px-8 md:px-12 pt-16 sm:pt-24 pb-36 flex flex-col items-start relative">
          {/* ── Editorial Header ─────────────────────────────────────────── */}
          <header className="w-full mb-12 sm:mb-16 flex flex-col gap-4" aria-label="Projects header">
            <div className="flex items-center justify-between w-full">
              <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--text-muted)]">
                WORK · 01 - {totalCount}
              </span>
              <Link
                href="/"
                className="text-[12px] font-mono text-[var(--text-secondary)] hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5"
              >
                <span>←</span>
                <span>home</span>
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <h1
                className="text-[42px] sm:text-[54px] md:text-[62px] font-normal italic leading-[1.02] tracking-[-0.03em] text-white"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                things I&apos;ve built
              </h1>
              <p
                className="text-[14px] sm:text-[15px] leading-relaxed max-w-[620px] text-[var(--text-secondary)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Production products up top, each with adoption, business impact, and the engineering decisions that made it work. Smaller systems and experiments follow in the catalogue.
              </p>
            </div>
          </header>

          {/* ── Main Projects Spotlight & Catalogue ────────────────────── */}
          <div className="w-full">
            <ProjectsChiragView projects={PROJECTS} />
          </div>
        </div>
      </main>
    </>
  );
}
