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
import { portfolioConfig } from "@/config/portfolio";

export default async function ProjectsPage() {
  const notionProjects = await getProjects();
  const PROJECTS = notionProjects.length > 0 ? notionProjects : portfolioConfig.projects.map(p => ({
    id: p.slug,
    title: p.title,
    slug: p.slug,
    published: true,
    featured: p.featured ?? false,
    shortDescription: p.shortDescription || p.description,
    description: p.description,
    coverImage: p.image,
    galleryImages: [],
    demoVideo: "",
    architectureImage: "",
    technologies: p.tech || p.tags,
    category: "AI Systems",
    status: p.status,
    githubUrl: p.github || "",
    liveDemoUrl: p.website || "",
    year: p.year,
    role: "Software & AI Engineer",
    metrics: "",
    tags: p.tags,
    seoTitle: p.title,
    seoDescription: p.description,
    content: "",
  }));
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
                  "description": p.shortDescription || p.description,
                  "codeRepository": p.githubUrl || undefined,
                  "url": p.liveDemoUrl || undefined,
                  "programmingLanguage": p.technologies || [],
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
      <main className="min-h-dvh flex justify-center w-full overflow-x-hidden" itemScope itemType="https://schema.org/CollectionPage">
        <div
        className="flex flex-col relative w-full items-center"
        style={{ maxWidth: "760px" }}
      >
        <div className="w-full max-w-[680px] px-4 sm:px-6 pb-36 flex flex-col items-start relative">
          {/* ── Header ──────────────────────────────────────────────── */}
          <header className="mt-20 sm:mt-28 w-full" aria-label="Projects header">
            <h1 className="sr-only">Ayush Tripathi Projects - Software and AI Engineering</h1>
            <div className="flex flex-row items-end justify-between w-full pb-4 border-b" style={{ borderColor: "var(--line)" }}>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.14em]" style={{ color: "var(--accent)" }}>
                  Selected work
                </span>
                <h2
                  className="text-[36px] sm:text-[48px] font-semibold tracking-[-0.03em] leading-[1.05] mt-1"
                  style={{ color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}
                  aria-hidden="true"
                >
                  work
                </h2>
              </div>
              <Link
                href="/"
                className="text-[13px] font-mono no-underline transition-colors duration-200 mb-2"
                style={{ color: "var(--text-secondary)" }}
              >
                ← back
              </Link>
            </div>
            <p
              className="mt-4 text-[14px] sm:text-[15px] leading-relaxed max-w-[560px]"
              style={{ color: "var(--text-body)", fontFamily: "var(--font-sans)" }}
            >
              Things I built to make difficult workflows simpler, faster, or more reliable.
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
