import type { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/lib/notion/service";
import Image from "next/image";
import { FiClock, FiCalendar } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Writing | Ayush Tripathi",
  description: "Technical articles, tutorials, and engineering essays.",
  alternates: { canonical: "/writing" },
  openGraph: {
    title: "Writing | Ayush Tripathi",
    description: "Technical articles, tutorials, and engineering essays.",
    url: "https://www.ayush-tripathi.in/writing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing | Ayush Tripathi",
    description: "Technical articles, tutorials, and engineering essays.",
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
            "description": "Technical articles, tutorials, and engineering essays.",
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
      <main className="min-h-dvh flex justify-center" itemScope itemType="https://schema.org/CollectionPage">
      <div
        className="flex flex-col relative w-full items-center"
        style={{ maxWidth: "700px" }}
      >
        <div className="w-full max-w-[640px] px-5 pb-36 flex flex-col items-start">
          {/* ── Header ──────────────────────────────────────────────── */}
          <section className="mt-24 sm:mt-32 w-full" aria-label="Writing header">
            <div className="flex flex-row items-end justify-between w-full">
              <h1
                className="text-[48px] sm:text-[64px] font-semibold tracking-[-0.03em] leading-[0.95]"
                style={{ color: "var(--text)", fontFamily: "var(--font-sans)" }}
              >
                writing
              </h1>
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
              technical articles, tutorials, and engineering essays.
            </p>
          </section>

          {/* ── Articles List ──────────────────────────────────────────── */}
          <section className="w-full mt-12 flex flex-col gap-6" aria-label="Articles List">
            {articles.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center opacity-50">
                <p className="text-[14px]" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  No articles found.
                </p>
              </div>
            ) : (
              articles.map((article) => (
                <Link 
                  key={article.id} 
                  href={`/writing/${article.slug}`}
                  className="group flex flex-col sm:flex-row gap-5 p-4 rounded-2xl border transition-all duration-300 hover:border-gray-400/50"
                  style={{ borderColor: "var(--border)", background: "rgba(255,255,255,0.01)" }}
                >
                  {article.coverImage && (
                    <div className="w-full sm:w-40 h-32 sm:h-auto relative rounded-xl overflow-hidden bg-black/10 flex-shrink-0">
                      <Image src={article.coverImage} alt={article.title} fill className="object-cover" />
                    </div>
                  )}
                  
                  <div className="flex flex-col flex-1 justify-center">
                    {article.featured && (
                      <span className="text-[10px] uppercase tracking-wider mb-2 font-medium" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                        Featured
                      </span>
                    )}
                    <h2 className="text-[18px] font-medium leading-tight mb-2 group-hover:text-blue-400 transition-colors" style={{ color: "var(--text)" }}>
                      {article.title}
                    </h2>
                    <p className="text-[13px] leading-relaxed mb-4 line-clamp-2" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-4 text-[11px]" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      <div className="flex items-center gap-1.5">
                        <FiCalendar />
                        <span>{article.publishedDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FiClock />
                        <span>{article.readingTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </section>
        </div>
      </div>
    </main>
    </>
  );
}
