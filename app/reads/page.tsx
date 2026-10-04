import type { Metadata } from "next";
import Link from "next/link";
import { getReads } from "@/lib/notion/service";
import { ReadsChiragView } from "@/components/main/ReadsChiragView";

export const metadata: Metadata = {
  title: "Reads | Ayush Tripathi | AI Engineer",
  description: "Books, research papers, systems essays, and rabbit holes that changed how I think about building, distributed systems, and craft.",
  alternates: { canonical: "/reads" },
  openGraph: {
    title: "Reads | Ayush Tripathi",
    description: "Curated collection of foundational papers, books, and articles on systems and AI.",
    url: "https://www.ayush-tripathi.in/reads",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Reads | Ayush Tripathi",
    description: "Curated shelf of papers, systems books, and articles.",
  }
};

export const revalidate = 3600;

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
            "description": "Curated collection of foundational papers, books, and articles on systems and AI.",
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
      <main className="min-h-dvh flex justify-center w-full overflow-x-hidden bg-[#0a0a0b]" itemScope itemType="https://schema.org/CollectionPage">
        <div className="w-full max-w-[1080px] px-5 sm:px-8 md:px-12 pt-16 sm:pt-24 pb-36 flex flex-col items-start relative">
          {/* ── Editorial Header ─────────────────────────────────────────── */}
          <header className="w-full mb-12 sm:mb-16 flex flex-col gap-4" aria-label="Reads header">
            <div className="flex items-center justify-between w-full">
              <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--text-muted)]">
                READS · CURATED SHELF
              </span>
              <Link
                href="/"
                className="text-[12px] font-mono text-[var(--text-secondary)] hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5"
              >
                <span>←</span>
                <span>home</span>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
              <div className="flex items-baseline gap-4 flex-wrap">
                <h1
                  className="text-[42px] sm:text-[54px] md:text-[62px] font-normal italic leading-[1.02] tracking-[-0.03em] text-white"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  worth keeping open
                </h1>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
                  {reads.length || 8} ITEMS
                </span>
              </div>
              <p
                className="text-[14px] leading-relaxed max-w-[500px] text-[var(--text-secondary)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Books, essays, papers, and rabbit holes that changed how I think about building, systems, and craft.
              </p>
            </div>
          </header>

          {/* ── Main Reads View ────────────────────────────────────────── */}
          <div className="w-full">
            <ReadsChiragView reads={reads} />
          </div>
        </div>
      </main>
    </>
  );
}
