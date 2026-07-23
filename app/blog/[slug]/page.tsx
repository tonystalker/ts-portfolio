import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles, getArticleBySlug } from "@/lib/notion/service";

// ─── Static Paths (pre-renders every slug at build time) ─────────────────────
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((post) => ({ slug: post.slug }));
}

// ─── Per-Post SEO Metadata ────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getArticleBySlug(slug);
  if (!post) return {};

  const fallbackDesc = "Software engineer from IIT (BHU) building AI applications, developer tools, and modern web experiences. Focused on scalable systems, clean engineering, and thoughtful user experiences.";
  
  return {
    title: `${post.title} | Ayush Tripathi`,
    description: post.excerpt || post.seoDescription || fallbackDesc,
    keywords: [...(post.tags || []), "Ayush Tripathi", "Software Engineer", "IIT BHU"],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | Ayush Tripathi`,
      description: post.excerpt || post.seoDescription || fallbackDesc,
      url: `https://www.ayush-tripathi.in/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedDate || undefined,
      authors: ["Ayush Tripathi"],
      tags: post.tags || [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Ayush Tripathi`,
      description: post.excerpt || post.seoDescription || fallbackDesc,
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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.ayush-tripathi.in/blog/${slug}`
    }
  };

  const breadcrumb = {
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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": `https://www.ayush-tripathi.in/blog/${slug}`
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, breadcrumb]) }}
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
  const post = await getArticleBySlug(slug);
  if (!post) notFound();

  const formattedDate = post.publishedDate ? new Date(post.publishedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }) : "Unknown Date";

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt || ""}
        date={post.publishedDate || ""}
        slug={post.slug}
      />

      <main className="min-h-dvh flex justify-center">
        <div
          className="flex flex-col relative w-full items-center"
          style={{ maxWidth: "700px" }}
        >
          <article className="w-full max-w-[640px] px-5 pb-36 flex flex-col items-start" itemScope itemType="https://schema.org/BlogPosting">

            {/* ── Back link ─────────────────────────────────────────── */}
            <div className="mt-24 sm:mt-32 w-full mb-8">
              <Link
                href="/blog"
                className="blog-nav-link text-[13px] no-underline transition-colors duration-200"
              >
                ← all posts
              </Link>
            </div>

            {/* ── Post header ───────────────────────────────────────── */}
            <header className="w-full pb-8 border-b border-[var(--border)]">
              <div className="flex flex-wrap gap-1.5 mb-6">
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

              <h1
                className="text-[32px] sm:text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] mb-4"
                style={{ color: "var(--text)", fontFamily: "var(--font-sans)" }}
                itemProp="headline"
              >
                {post.title}
              </h1>

              <p
                className="text-[16px] leading-relaxed mb-6"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}
                itemProp="abstract"
              >
                {post.excerpt}
              </p>

              <div
                className="flex items-center gap-3 text-[12px]"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
              >
                <time dateTime={post.publishedDate || ""} itemProp="datePublished">{formattedDate}</time>
                <span>·</span>
                <span>{post.readingTime || "5 min read"}</span>
                <span>·</span>
                <span itemProp="author" itemScope itemType="https://schema.org/Person"><span itemProp="name">ayush tripathi</span></span>
              </div>
            </header>

            {/* ── Post content ──────────────────────────────────────── */}
            <div
              className="prose-mono w-full mt-10"
              itemProp="articleBody"
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />

            {/* ── Footer ────────────────────────────────────────────── */}
            <div className="mt-16 w-full pt-8 border-t border-[var(--border)] flex items-center justify-between">
              <Link
                href="/blog"
                className="blog-nav-link text-[13px] no-underline transition-colors duration-200"
              >
                ← all posts
              </Link>
              <a
                href="https://x.com/TonyStalkerr"
                target="_blank"
                rel="noopener noreferrer"
                className="blog-nav-link text-[13px] no-underline transition-colors duration-200"
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
