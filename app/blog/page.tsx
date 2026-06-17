import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog | Ayush Tripathi",
  description:
    "Engineering notes, deep dives into Web3 protocols, systems design, and full-stack development by Ayush Tripathi.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Ayush Tripathi",
    description:
      "Engineering notes and deep dives by Ayush Tripathi — Web3, systems design, and full-stack development.",
    url: "https://www.ayush-tripathi.in/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-svh flex justify-center">
      <div
        className="flex flex-col relative w-full items-center"
        style={{ maxWidth: "700px" }}
      >
        <div className="w-full max-w-[640px] px-4 pb-24 flex flex-col items-start">

          {/* ── Header ──────────────────────────────────────────────── */}
          <section className="mt-24 sm:mt-32 w-full" aria-label="Blog header">
            <div className="flex flex-row items-end justify-between w-full">
              <h1
                className="text-[48px] sm:text-[64px] leading-[0.95] tracking-tight text-[var(--text)] font-bold cursor-crosshair"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                blogs
              </h1>
              <Link
                href="/"
                className="text-[13px] opacity-50 hover:opacity-100 transition-opacity no-underline text-[var(--text)] mb-1"
              >
                ← back
              </Link>
            </div>
            <p
              className="mt-6 text-[15px] text-[var(--text)] opacity-50 leading-relaxed"
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              engineering notes, deep dives, and things i figured out by
              breaking stuff
            </p>
          </section>

          {/* ── Divider ─────────────────────────────────────────────── */}
          <div className="w-full mt-8 sm:mt-12 border-b border-[var(--text)]/20" />

          {/* ── Posts List ──────────────────────────────────────────── */}
          <section
            className="w-full mt-0"
            aria-label="Blog posts"
            style={{ fontFamily: "var(--font-mono, monospace)" }}
          >
            <div className="flex flex-col">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block w-full border-b border-[var(--text)]/20 hover:bg-[var(--text)]/5 transition-colors no-underline"
                >
                  <div className="flex items-start justify-between py-5 px-2 gap-4">
                    <div className="flex flex-col gap-2 flex-1 min-w-0">
                      <div className="flex items-center gap-4">
                        <span className="text-[12px] opacity-40 flex-shrink-0">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] tracking-widest uppercase opacity-40 border border-[var(--text)]/20 px-1.5 py-0.5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-[15px] font-bold tracking-tight text-[var(--text)] uppercase leading-snug">
                        {post.title}
                      </span>
                      <p className="text-[13px] opacity-60 leading-relaxed line-clamp-2">
                        {post.description}
                      </p>
                      <span className="text-[11px] opacity-40 mt-1">
                        {post.readTime} min read
                      </span>
                    </div>
                    <span className="text-[var(--text)] text-[18px] leading-none flex-shrink-0 mt-1 opacity-40 group-hover:opacity-100 inline-block transition-all duration-500 group-hover:rotate-45">
                      ↗
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Write CTA ───────────────────────────────────────────── */}
          <div
            className="mt-16 w-full p-6 border border-[var(--text)]/20 bg-[var(--text)]/[0.02]"
            style={{ fontFamily: "var(--font-mono, monospace)" }}
          >
            <p className="text-[13px] opacity-60 leading-relaxed">
              more posts coming soon. i write when i build something interesting
              or figure out something non-obvious.{" "}
              <a
                href="https://x.com/TonyStalkerr"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-100 underline underline-offset-2"
              >
                follow on x
              </a>{" "}
              to know when i ship.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
