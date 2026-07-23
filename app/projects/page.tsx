import type { Metadata } from "next";
import Link from "next/link";
import { FlightBoard } from "@/components/main/FlightBoard";

export const metadata: Metadata = {
  title: "Projects | Ayush Tripathi | AI Engineer",
  description: "A showcase of production-grade systems, AI applications, and Web3 protocols built by Ayush Tripathi.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | Ayush Tripathi | AI Engineer",
    description: "A showcase of production-grade systems, AI applications, and Web3 protocols.",
    url: "https://www.ayush-tripathi.in/projects",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Ayush Tripathi",
    description: "Production-grade systems, AI applications, and Web3 protocols.",
  }
};

import { getProjects } from "@/lib/notion/service";

export default async function ProjectsPage() {
  const PROJECTS = await getProjects();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Projects by Ayush Tripathi",
            "description": "Production-grade systems, AI applications, and Web3 protocols.",
            "url": "https://www.ayush-tripathi.in/projects",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": PROJECTS.map((p, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "item": {
                  "@type": "SoftwareSourceCode",
                  "name": p.title,
                  "description": p.description,
                  "codeRepository": p.githubUrl || undefined,
                  "url": p.liveDemoUrl || undefined,
                  "programmingLanguage": p.technologies || []
                }
              }))
            }
          })
        }}
      />
      <main className="min-h-svh flex justify-center" itemScope itemType="https://schema.org/CollectionPage">
        <div
        className="flex flex-col relative w-full items-center"
        style={{ maxWidth: "700px" }}
      >
        <div className="w-full max-w-[640px] px-5 pb-36 flex flex-col items-start">
          {/* ── Header ──────────────────────────────────────────────── */}
          <header className="mt-24 sm:mt-32 w-full" aria-label="Projects header">
            <h1 className="sr-only">Ayush Tripathi Projects - Software and AI Engineering</h1>
            <div className="flex flex-row items-end justify-between w-full">
              <h2
                className="text-[48px] sm:text-[64px] font-semibold tracking-[-0.03em] leading-[0.95]"
                style={{ color: "var(--text)", fontFamily: "var(--font-sans)" }}
                aria-hidden="true"
              >
                work
              </h2>
              <Link
                href="/"
                className="blog-nav-link text-[13px] no-underline transition-colors duration-200 mb-2"
              >
                ← back
              </Link>
            </div>
            <p
              className="mt-6 text-[14px] leading-relaxed"
              style={{ color: "var(--text-body)", fontFamily: "var(--font-mono)" }}
            >
              production-grade systems, experiments, and protocols i&apos;ve built.
            </p>
          </header>

          {/* ── Projects List ──────────────────────────────────────────── */}
          <section className="w-full mt-12" aria-label="Projects list">
            <FlightBoard projects={PROJECTS} />
          </section>
        </div>
      </div>
    </main>
    </>
  );
}
