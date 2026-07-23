import type { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/lib/notion/service";

export const metadata: Metadata = {
  title: "Blog | Ayush Tripathi | AI Engineer",
  description:
    "Engineering notes, deep dives into Web3 protocols, systems design, LLMs, and full-stack development by Ayush Tripathi.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Ayush Tripathi | AI Engineer",
    description:
      "Engineering notes, deep dives into Web3 protocols, systems design, LLMs, and full-stack development.",
    url: "https://www.ayush-tripathi.in/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Ayush Tripathi",
    description: "Engineering notes, LLMs, Web3 protocols, and systems design.",
  }
};

export default async function BlogPage() {
  const posts = await getArticles();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Ayush Tripathi's Engineering Blog",
              "description": "Deep dives into Web3, Generative AI, and software engineering.",
              "url": "https://www.ayush-tripathi.in/blog"
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.ayush-tripathi.in/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Blog",
                  "item": "https://www.ayush-tripathi.in/blog"
                }
              ]
            }
          ])
        }}
      />
      <main className="min-h-svh flex justify-center" itemScope itemType="https://schema.org/Blog">
        <div
        className="flex flex-col relative w-full items-center"
        style={{ maxWidth: "700px" }}
      >
        <div className="w-full max-w-[640px] px-5 pb-36 flex flex-col items-start">

          {/* ── Header ──────────────────────────────────────────────── */}
          <header className="mt-24 sm:mt-32 w-full" aria-label="Blog header">
            <h1 className="sr-only">Engineering Blog - Ayush Tripathi</h1>
            <div className="flex flex-row items-end justify-between w-full">
              <h2
                className="text-[48px] sm:text-[64px] font-semibold tracking-[-0.03em] leading-[0.95]"
                style={{ color: "var(--text)", fontFamily: "var(--font-sans)" }}
                aria-hidden="true"
              >
                writing
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
              engineering notes, deep dives, and things i figured out by
              breaking stuff
            </p>
          </header>

          {/* ── Posts List ──────────────────────────────────────────── */}
          <section className="w-full mt-12 flex flex-col" aria-label="Blog posts">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-3 py-6 no-underline transition-all duration-200 ease-out rounded-xl px-4 -mx-4 hover:bg-[var(--glass)]"
                style={{
                  borderTop: i === 0 ? "1px solid var(--border)" : "none",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-4">
                    <span
                      className="text-[12px] tabular-nums flex-shrink-0"
                      style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                    >
                      {post.publishedDate ? new Date(post.publishedDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }) : "Unknown Date"}
                    </span>
                    <div className="hidden sm:flex flex-wrap gap-1.5">
                      {post.tags && post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-full"
                          style={{
                            color: "var(--text-muted)",
                            background: "var(--border)",
                            fontFamily: "var(--font-mono)",
                            border: "1px solid var(--border-secondary)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[12px]">
                    <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      {post.readingTime || "5 min read"}
                    </span>
                    <span
                      className="text-[16px] transition-all duration-200 ease-out group-hover:rotate-45"
                      style={{ color: "var(--text-muted)" }}
                    >
                      ↗
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 mt-1">
                  <span
                    className="text-[16px] font-medium tracking-[-0.01em] transition-colors duration-200 group-hover:text-[var(--accent)]"
                    style={{ color: "var(--text)", fontFamily: "var(--font-sans)" }}
                  >
                    {post.title}
                  </span>
                  <p
                    className="text-[13px] leading-relaxed line-clamp-2"
                    style={{ color: "var(--text-body)", fontFamily: "var(--font-mono)" }}
                  >
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </section>

          {/* ── Write CTA ───────────────────────────────────────────── */}
          <div
            className="mt-16 w-full p-6"
            style={{
              borderRadius: "16px",
              background: "var(--glass)",
              border: "1px solid var(--border)",
            }}
          >
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: "var(--text-body)", fontFamily: "var(--font-mono)" }}
            >
              more posts coming soon. i write when i build something interesting
              or figure out something non-obvious.{" "}
              <a
                href="https://x.com/TonyStalkerr"
                target="_blank"
                rel="noopener noreferrer"
                className="blog-nav-link transition-colors underline underline-offset-4"
                style={{ textDecorationColor: "var(--border-secondary)" }}
              >
                follow on x
              </a>{" "}
              to know when i ship.
            </p>
          </div>

        </div>
      </div>
    </main>
    </>
  );
}
