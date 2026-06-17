import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

// ─── Static Paths (pre-renders every slug at build time) ─────────────────────
export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// ─── Per-Post SEO Metadata ────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Ayush Tripathi`,
    description: post.description,
    keywords: [...post.tags, "Ayush Tripathi", "Software Engineer", "IIT BHU"],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | Ayush Tripathi`,
      description: post.description,
      url: `https://www.ayush-tripathi.in/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["Ayush Tripathi"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Ayush Tripathi`,
      description: post.description,
    },
  };
}

// ─── JSON-LD Article Schema ───────────────────────────────────────────────────
function ArticleJsonLd({
  title,
  description,
  date,
  slug,
}: {
  title: string;
  description: string;
  date: string;
  slug: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    author: {
      "@type": "Person",
      name: "Ayush Tripathi",
      url: "https://www.ayush-tripathi.in",
    },
    url: `https://www.ayush-tripathi.in/blog/${slug}`,
    publisher: {
      "@type": "Person",
      name: "Ayush Tripathi",
      url: "https://www.ayush-tripathi.in",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        date={post.date}
        slug={post.slug}
      />

      <main className="min-h-svh flex justify-center bg-[var(--bg)]">
        <div
          className="flex flex-col relative w-full items-center"
          style={{ maxWidth: "700px" }}
        >
          <article
            className="w-full max-w-[640px] px-4 pb-24 flex flex-col items-start"
            style={{ fontFamily: "var(--font-mono, monospace)" }}
          >

            {/* ── Back link ─────────────────────────────────────────── */}
            <div className="mt-24 sm:mt-32 w-full">
              <Link
                href="/blog"
                className="text-[13px] opacity-50 hover:opacity-100 transition-opacity no-underline text-[var(--text)]"
              >
                ← all posts
              </Link>
            </div>

            {/* ── Post header ───────────────────────────────────────── */}
            <header className="mt-8 w-full pb-8 border-b border-[var(--text)]/20">
              <div className="flex flex-wrap gap-1.5 mb-5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] tracking-widest uppercase opacity-50 border border-[var(--text)]/20 px-1.5 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-[32px] sm:text-[40px] font-bold leading-tight tracking-tight text-[var(--text)] uppercase mb-6">
                {post.title}
              </h1>

              <p className="text-[15px] opacity-60 leading-relaxed mb-6">
                {post.description}
              </p>

              <div className="flex items-center gap-4 text-[12px] opacity-40">
                <time dateTime={post.date}>{formattedDate}</time>
                <span>·</span>
                <span>{post.readTime} min read</span>
                <span>·</span>
                <span>ayush tripathi</span>
              </div>
            </header>

            {/* ── Post content ──────────────────────────────────────── */}
            <div
              className="prose-mono w-full mt-10"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* ── Footer ────────────────────────────────────────────── */}
            <div className="mt-16 w-full pt-8 border-t border-[var(--text)]/20 flex items-center justify-between">
              <Link
                href="/blog"
                className="text-[13px] opacity-50 hover:opacity-100 transition-opacity no-underline text-[var(--text)]"
              >
                ← all posts
              </Link>
              <a
                href="https://x.com/TonyStalkerr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] opacity-50 hover:opacity-100 transition-opacity no-underline text-[var(--text)]"
              >
                discuss on x →
              </a>
            </div>

          </article>
        </div>
      </main>
    </>
  );
}
