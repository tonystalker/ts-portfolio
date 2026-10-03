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
      <main className="min-h-dvh flex justify-center w-full overflow-x-hidden" itemScope itemType="https://schema.org/CollectionPage">
        <div
          className="flex flex-col relative w-full items-center"
          style={{ maxWidth: "760px" }}
        >
          <div className="w-full max-w-[680px] px-4 sm:px-6 pb-36 flex flex-col items-start relative">
            {/* ── Header ──────────────────────────────────────────────── */}
            <header className="mt-20 sm:mt-28 w-full" aria-label="Reads header">
              <h1 className="sr-only">Ayush Tripathi&apos;s Reading List and Bookmarks</h1>
              <div className="flex flex-row items-end justify-between w-full pb-4 border-b" style={{ borderColor: "var(--line)" }}>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.14em]" style={{ color: "var(--accent)" }}>
                    Worth keeping open
                  </span>
                  <h2
                    className="text-[36px] sm:text-[48px] font-semibold tracking-[-0.03em] leading-[1.05] mt-1"
                    style={{ color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}
                    aria-hidden="true"
                  >
                    reads
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
                Books, essays, papers, and rabbit holes that changed how I think about building.
              </p>
            </header>

            {/* ── Library ──────────────────────────────────────────── */}
            <section className="w-full mt-10" aria-label="Reads Library">
              <ReadsLibrary reads={reads} />
            </section>

            {/* ── Personal Footnote ─────────────────────────────────── */}
            <footer className="w-full mt-16 pt-6 border-t" style={{ borderColor: "var(--line)" }}>
              <p className="text-[12px] font-mono leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Unrelated but true: I was the tallest kid in school until I stopped playing basketball. My height never negotiated another contract.
              </p>
            </footer>
          </div>
        </div>
      </main>
    </>
  );
}
