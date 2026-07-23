import type { Metadata } from "next";
import Link from "next/link";
import { getReads } from "@/lib/notion/service";
import { ReadsLibrary } from "@/components/main/ReadsLibrary";

export const metadata: Metadata = {
  title: "Reads | Ayush Tripathi | AI Engineer",
  description: "Curated collection of interesting research papers, articles, and protocols on AI, Web3, and Software Engineering bookmarked by Ayush Tripathi.",
  alternates: { canonical: "/reads" },
  openGraph: {
    title: "Reads | Ayush Tripathi",
    description: "Curated collection of interesting research papers, articles, and protocols on AI, Web3, and Software Engineering.",
    url: "https://www.ayush-tripathi.in/reads",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Reads | Ayush Tripathi",
    description: "Research papers, articles, and bookmarks on AI and Web3.",
  }
};

export const revalidate = 3600; // Revalidate every hour

export default async function ReadsPage() {
  const reads = await getReads();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Ayush Tripathi's Reading List",
            "description": "Curated collection of interesting research papers, articles, and protocols on AI, Web3, and Software Engineering.",
            "url": "https://www.ayush-tripathi.in/reads",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": reads.map((r, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "item": {
                  "@type": "CreativeWork",
                  "name": r.title,
                  "url": r.url,
                  "genre": r.category,
                  "author": r.author ? {
                    "@type": "Person",
                    "name": r.author
                  } : undefined
                }
              }))
            }
          })
        }}
      />
      <main className="min-h-dvh flex justify-center" itemScope itemType="https://schema.org/CollectionPage">
        <div
          className="flex flex-col relative w-full items-center"
          style={{ maxWidth: "800px" }}
        >
          <div className="w-full max-w-[760px] px-5 pb-36 flex flex-col items-start">
            {/* ── Header ──────────────────────────────────────────────── */}
            <header className="mt-24 sm:mt-32 w-full" aria-label="Reads header">
              <h1 className="sr-only">Ayush Tripathi&apos;s Reading List and Bookmarks</h1>
            <div className="flex flex-row items-end justify-between w-full">
                <h2
                  className="text-[48px] sm:text-[64px] font-semibold tracking-[-0.03em] leading-[0.95]"
                  style={{ color: "var(--text)", fontFamily: "var(--font-sans)" }}
                  aria-hidden="true"
                >
                  reads
                </h2>
              <Link
                href="/"
                className="blog-nav-link text-[13px] no-underline transition-colors duration-200 mb-2"
              >
                ← back
              </Link>
            </div>
              <p
                className="mt-6 text-[14px] leading-relaxed max-w-[500px]"
                style={{ color: "var(--text-body)", fontFamily: "var(--font-mono)" }}
              >
                Interesting things I&apos;ve read, watched and bookmarked throughout my AI engineering journey.
              </p>
            </header>

          {/* ── Library ──────────────────────────────────────────── */}
          <section className="w-full mt-12" aria-label="Reads Library">
            <ReadsLibrary reads={reads} />
          </section>
        </div>
      </div>
    </main>
    </>
  );
}
