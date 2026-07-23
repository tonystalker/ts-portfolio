import { getArticle, getArticles } from "@/lib/notion/service";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { FiClock, FiCalendar, FiArrowLeft } from "react-icons/fi";

export const revalidate = 3600;

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  
  return {
    title: `${article.seoTitle || article.title} | Ayush Tripathi`,
    description: article.seoDescription || article.excerpt,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-svh flex justify-center">
      <div
        className="flex flex-col relative w-full items-center"
        style={{ maxWidth: "760px" }}
      >
        <article className="w-full max-w-[680px] px-5 pb-36 flex flex-col items-start mt-24 sm:mt-32">
          
          <Link 
            href="/writing"
            className="flex items-center gap-2 text-[13px] mb-12 hover:opacity-70 transition-opacity"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
          >
            <FiArrowLeft /> back to writing
          </Link>

          <header className="flex flex-col gap-6 w-full mb-12">
            <h1 className="text-[32px] sm:text-[42px] font-semibold leading-[1.1] tracking-[-0.02em]" style={{ color: "var(--text)", fontFamily: "var(--font-sans)" }}>
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-[13px]" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              <div className="flex items-center gap-1.5">
                <FiCalendar />
                <span>{article.publishedDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiClock />
                <span>{article.readingTime}</span>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                {article.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {article.coverImage && (
              <div className="w-full aspect-[2/1] relative rounded-2xl overflow-hidden mt-6">
                <Image src={article.coverImage} alt={article.title} fill className="object-cover" priority />
              </div>
            )}
          </header>

          <div 
            className="prose prose-invert prose-p:text-[15px] prose-p:leading-relaxed prose-p:text-gray-300 prose-headings:text-gray-100 prose-a:text-blue-400 max-w-none w-full"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus as any}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-xl border border-white/10 text-[13px] my-6"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-white/10 px-1.5 py-0.5 rounded-md text-[13px] text-pink-400" {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </main>
  );
}
