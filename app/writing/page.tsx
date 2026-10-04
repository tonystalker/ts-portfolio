import type { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/lib/notion/service";
import { WritingsChiragView } from "@/components/main/WritingsChiragView";

export const metadata: Metadata = {
  title: "Writing | Ayush Tripathi | AI Engineer",
  description: "Technical essays, teardowns, and engineering notes on systems design, AI workflows, and software architecture.",
  alternates: { canonical: "/writing" },
  openGraph: {
    title: "Writing | Ayush Tripathi | AI Engineer",
    description: "Technical essays, teardowns, and engineering notes on systems design, AI workflows, and software architecture.",
    url: "https://www.ayush-tripathi.in/writing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing | Ayush Tripathi",
    description: "Technical essays, teardowns, and engineering notes on systems design, AI workflows, and software architecture.",
  }
};

export const revalidate = 3600;

export default async function WritingPage() {
  const articles = await getArticles();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Writing | Ayush Tripathi",
            "description": "Technical essays, teardowns, and engineering notes on systems design, AI workflows, and software architecture.",
            "url": "https://www.ayush-tripathi.in/writing",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": articles.map((article, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "item": {
                  "@type": "BlogPosting",
                  "headline": article.title,
                  "url": `https://www.ayush-tripathi.in/writing/${article.slug}`,
                  "datePublished": article.publishedDate
                }
              }))
            }
          })
        }}
      />
      <main className="min-h-dvh flex justify-center w-full overflow-x-hidden bg-[#0a0a0b]" itemScope itemType="https://schema.org/CollectionPage">
        <div className="w-full max-w-[1080px] px-5 sm:px-8 md:px-12 pt-16 sm:pt-24 pb-36 flex flex-col items-start relative">
          {/* ── Editorial Header ─────────────────────────────────────────── */}
          <header className="w-full mb-12 sm:mb-16 flex flex-col gap-4" aria-label="Writing header">
            <div className="flex items-center justify-between w-full">
              <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--text-muted)]">
                WRITING · ESSAYS & TEARDOWNS
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
                  writings
                </h1>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
                  {articles.length} {articles.length === 1 ? "ARTICLE" : "ARTICLES"}
                </span>
              </div>
              <p
                className="text-[14px] leading-relaxed max-w-[500px] text-[var(--text-secondary)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Essays, technical notes, and write-ups on engineering, systems design, and software architecture.
              </p>
            </div>
          </header>

          {/* ── Main Writings View ─────────────────────────────────────── */}
          <div className="w-full">
            <WritingsChiragView articles={articles} />
          </div>
        </div>
      </main>
    </>
  );
}
