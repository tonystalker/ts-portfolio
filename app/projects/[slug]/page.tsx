import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { SiGithub } from "react-icons/si";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";
import { getProjects, getProject } from "@/lib/notion/service";
import { JsonLd } from "@/components/json-ld";

export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects
    .filter((p) => Boolean(p.slug))
    .map((p) => ({
      slug: p.slug,
    }));
}

function cleanDescription(text: string, maxLen = 155): string {
  const trimmed = text.replace(/\s+/g, " ").trim();
  if (trimmed.length <= maxLen) return trimmed;
  const cut = trimmed.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 20 ? cut.slice(0, lastSpace) : cut).replace(/[,.:;]+$/, "") + ".";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};

  const title = project.seoTitle || `${project.title} | AI Agent & System Architecture`;
  const rawDescription =
    project.seoDescription ||
    project.shortDescription ||
    project.description ||
    `${project.title} is an engineering project built by Ayush Tripathi using ${project.technologies.slice(0, 3).join(", ")}.`;
  const description = cleanDescription(rawDescription, 155);
  const canonicalUrl = `https://www.ayush-tripathi.in/projects/${project.slug}`;
  const cover = project.coverImage || "/og-image.png";

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${project.title} | Ayush Tripathi`,
      description,
      url: canonicalUrl,
      type: "website",
      images: [{ url: cover, width: 1200, height: 630, alt: `${project.title} by Ayush Tripathi` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Ayush Tripathi`,
      description,
      images: [cover],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const canonicalUrl = `https://www.ayush-tripathi.in/projects/${project.slug}`;
  const stack = project.technologies && project.technologies.length > 0
    ? project.technologies
    : project.tags || [];

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.shortDescription || project.description,
    programmingLanguage: stack,
    codeRepository: project.githubUrl || undefined,
    url: canonicalUrl,
    author: {
      "@id": "https://www.ayush-tripathi.in/#person",
    },
    publisher: {
      "@id": "https://www.ayush-tripathi.in/#person",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.ayush-tripathi.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: "https://www.ayush-tripathi.in/projects",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <JsonLd data={[projectSchema, breadcrumbSchema]} />

      <main className="min-h-dvh flex justify-center w-full overflow-x-hidden bg-[#0a0a0b]">
        <div className="w-full max-w-[860px] px-5 sm:px-8 md:px-12 pt-16 sm:pt-24 pb-36 flex flex-col items-start relative">
          
          {/* Back Navigation */}
          <div className="w-full mb-8">
            <Link
              href="/projects"
              className="text-[12px] font-mono text-[var(--text-secondary)] hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5"
            >
              <FiArrowLeft size={13} />
              <span>all projects</span>
            </Link>
          </div>

          {/* Project Header */}
          <header className="w-full pb-8 border-b" style={{ borderColor: "var(--line)" }}>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                style={{
                  background: "var(--surface-raised)",
                  border: "1px solid var(--line)",
                  color: "var(--accent)",
                }}
              >
                {project.category || "AI SYSTEMS"}
              </span>
              {project.status && (
                <span
                  className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full text-[var(--text-muted)]"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  STATUS: {project.status}
                </span>
              )}
              {project.year && (
                <span className="text-[11px] font-mono text-[var(--text-muted)]">
                  ({project.year})
                </span>
              )}
            </div>

            {/* Exactly one H1 for this page */}
            <h1
              className="text-[34px] sm:text-[46px] font-semibold tracking-[-0.03em] leading-[1.08] text-white mb-5"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {project.title}
            </h1>

            {/* One-paragraph problem statement / overview */}
            <div
              className="text-[15px] sm:text-[16px] leading-[1.65] text-pretty"
              style={{ color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}
            >
              <p>
                {project.description ||
                  project.shortDescription ||
                  `${project.title} is an applied AI system engineered by Ayush Tripathi to address production reliability, multi-agent orchestration, and developer workflow automation.`}
              </p>
            </div>

            {/* Links and Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200"
                  style={{
                    background: "var(--text-primary)",
                    color: "var(--canvas)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  <span>Live Demo</span>
                  <FiExternalLink size={13} />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 border"
                  style={{
                    background: "var(--surface)",
                    color: "var(--text-primary)",
                    borderColor: "var(--line)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  <SiGithub size={14} />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>
          </header>

          {/* Visual Showcase (if image available) */}
          {project.coverImage && (
            <div className="w-full aspect-[16/9] rounded-2xl relative overflow-hidden my-8 border border-[var(--line)] bg-[#0c0c0e]">
              <Image
                src={project.coverImage}
                alt={`${project.title} architecture showcase by Ayush Tripathi`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 860px) 100vw, 860px"
                priority
              />
            </div>
          )}

          {/* Stack List */}
          <section className="w-full my-8 pb-8 border-b" style={{ borderColor: "var(--line)" }} aria-label="Technologies used">
            <h2
              className="text-[12px] font-mono uppercase tracking-[0.14em] text-[var(--accent)] mb-3"
            >
              Technologies & Infrastructure
            </h2>
            <div className="flex flex-wrap gap-2">
              {stack.map((tech: string) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-[12px] font-mono"
                  style={{
                    background: "var(--surface-raised)",
                    border: "1px solid var(--line)",
                    color: "var(--text-primary)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Architecture & Engineering Notes Section */}
          <section className="w-full my-4" aria-label="Architecture and engineering notes">
            <h2
              className="text-[20px] sm:text-[24px] font-semibold tracking-[-0.02em] text-white mb-6"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Architecture & Engineering Notes
            </h2>

            {project.content && project.content.trim().length > 0 ? (
              <div className="prose-mono w-full">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h1({ children, ...props }: any) {
                      return (
                        <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-[-0.02em] text-white mt-8 mb-4" {...props}>
                          {children}
                        </h2>
                      );
                    },
                    code({ className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || "");
                      return match ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus as any}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {project.content}
                </ReactMarkdown>
              </div>
            ) : (
              <div
                className="w-full p-6 sm:p-8 rounded-2xl flex flex-col gap-4 leading-relaxed text-[14px] sm:text-[15px]"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                <p>
                  {project.shortDescription || project.description}
                </p>
                {project.metrics && (
                  <div className="pt-3 border-t border-[var(--line)]">
                    <span className="text-[11px] font-mono text-[var(--accent)] uppercase tracking-wider block mb-1">
                      Key Metrics
                    </span>
                    <span className="text-[14px] font-medium text-[var(--text-primary)]">
                      {project.metrics}
                    </span>
                  </div>
                )}
                {project.role && (
                  <div className="pt-2">
                    <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block mb-0.5">
                      Role & Contribution
                    </span>
                    <span className="text-[13px] text-[var(--text-body)]">
                      {project.role}
                    </span>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Bottom Footer Back Link */}
          <div className="w-full mt-16 pt-8 border-t flex items-center justify-between" style={{ borderColor: "var(--line)" }}>
            <Link
              href="/projects"
              className="text-[13px] font-mono text-[var(--text-secondary)] hover:text-white transition-colors duration-200"
            >
              ← all projects
            </Link>
            <Link
              href="/about"
              className="text-[13px] font-mono text-[var(--text-secondary)] hover:text-white transition-colors duration-200"
            >
              about ayush →
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}
