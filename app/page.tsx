import { Hero } from "@/components/main/Hero";
import { ProjectShowcase } from "@/components/main/ProjectShowcase";
import { Experience } from "@/components/main/Experience";
import { TechStack } from "@/components/main/TechStack";
import { ContactCard } from "@/components/main/ContactCard";
import { ScrollReveal } from "@/components/main/ScrollReveal";
import { GithubActivity } from "@/components/main/GithubActivity";
import Link from "next/link";
import { getArticles, getProjects, getExperience, getSiteSettings } from "@/lib/notion/service";
import {
  SiGithub,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiGo,
  SiPython,
  SiSolidity,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiLangchain,
  SiLanggraph,
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { RxTwitterLogo } from "react-icons/rx";
import type { IconType } from "react-icons";


// ─── Section heading ──────────────────────────────────────────────────────────






// ─── Section heading ──────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-6"
      style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
    >
      {children}
    </h2>
  );
}

export default async function Home() {
  // CMS Fetching
  const projects = await getProjects();
  const featuredProjects = projects.filter(p => p.featured);
  const experience = await getExperience();
  const settings = await getSiteSettings();
  
  const allArticles = await getArticles();
  const recentPosts = allArticles.slice(0, 3);

  return (
    <main className="min-h-svh flex justify-center" itemScope itemType="https://schema.org/CollectionPage">
      {/* ── CollectionPage JSON-LD ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Featured Projects by Ayush Tripathi",
            "description": "A collection of software engineering and AI infrastructure projects.",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": featuredProjects.map((p, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "item": {
                  "@type": "SoftwareSourceCode",
                  "name": p.title,
                  "description": p.description,
                  "codeRepository": p.githubUrl || undefined,
                  "url": p.liveDemoUrl || undefined,
                  "programmingLanguage": p.technologies || []
                }
              }))
            }
          })
        }}
      />
      
      <div
        className="flex flex-col relative w-full items-center"
        style={{ maxWidth: "700px", minHeight: "100svh" }}
      >
        <div className="w-full max-w-[640px] px-5 pb-36 flex flex-col items-start relative">
          {/* ── Static Ambient Lights ── */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] pointer-events-none z-[-1]" 
               style={{ background: "radial-gradient(ellipse at top, rgba(94, 139, 255, 0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
          
          <div className="absolute top-[1200px] -left-[200px] w-[600px] h-[600px] pointer-events-none z-[-1]" 
               style={{ background: "radial-gradient(circle, rgba(139, 94, 255, 0.04) 0%, transparent 70%)", filter: "blur(60px)" }} />
               
          <div className="absolute bottom-[200px] -right-[200px] w-[600px] h-[600px] pointer-events-none z-[-1]" 
               style={{ background: "radial-gradient(circle, rgba(255, 140, 94, 0.05) 0%, transparent 70%)", filter: "blur(60px)" }} />

          {/* ── Hero ──────────────────────────────────────────────────────── */}
          <header className="mt-24 sm:mt-32 w-full" aria-label="Introduction">
            <h1 className="sr-only">Ayush Tripathi - Software Engineer & AI Infrastructure Developer</h1>
            <div className="sr-only">
              Building highly scalable production systems using Next.js, React, TypeScript, Python, and Go.
            </div>
            <Hero settings={settings} />
          </header>

          {/* ── Experience ─────────────────────────────────────────────────────── */}
          {experience.length > 0 && (
            <section className="mt-20 sm:mt-32 w-full" aria-labelledby="experience-heading">
              <ScrollReveal id="experience">
                <SectionLabel><span id="experience-heading">experience</span></SectionLabel>
                <Experience roles={experience} />
              </ScrollReveal>
            </section>
          )}

          {/* ── GitHub Activity ────────────────────────────────────────────── */}
          <section className="mt-20 sm:mt-32 w-full" aria-labelledby="activity-heading">
            <ScrollReveal>
              <SectionLabel><span id="activity-heading">activity</span></SectionLabel>
              <GithubActivity />
            </ScrollReveal>
          </section>

          {/* ── Projects ──────────────────────────────────────────────────── */}
          {featuredProjects.length > 0 && (
            <section className="mt-20 sm:mt-32 w-full" aria-labelledby="projects-heading">
              <ScrollReveal id="projects">
                <SectionLabel><span id="projects-heading">pinned projects</span></SectionLabel>
                <ProjectShowcase projects={featuredProjects} />
              </ScrollReveal>
            </section>
          )}

          {/* ── Recent Posts ───────────────────────────────────────────────── */}
          {recentPosts.length > 0 && (
            <ScrollReveal className="mt-20 sm:mt-32 w-full" id="blogs" ariaLabel="Recent blog posts">
              <div className="flex items-center justify-between mb-6">
                <SectionLabel>recent writing</SectionLabel>
                <Link
                  href="/blog"
                  className="text-[12px] no-underline transition-colors duration-200 mb-6"
                  style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
                >
                  see all →
                </Link>
              </div>
              <div className="w-full flex flex-col">
                {recentPosts.map((post, i) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex items-center justify-between py-4 no-underline transition-all duration-200 ease-out rounded-xl px-3 -mx-3 hover:bg-[var(--glass)] hover:scale-[1.01]"
                    style={{
                      borderTop: i === 0 ? "1px solid var(--border)" : "none",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <div className="flex items-center gap-5">
                      <span
                        className="text-[12px] tabular-nums flex-shrink-0"
                        style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                      >
                        {post.publishedDate ? new Date(post.publishedDate).getFullYear() : new Date().getFullYear()}
                      </span>
                      <span
                        className="text-[14px] font-medium tracking-[-0.01em] transition-colors duration-200 group-hover:text-[var(--accent)]"
                        style={{ color: "var(--text)", fontFamily: "var(--font-sans)" }}
                      >
                        {post.title || "Untitled"}
                      </span>
                    </div>
                    <span
                      className="text-[16px] flex-shrink-0 ml-4 transition-all duration-200 ease-out group-hover:rotate-45"
                      style={{ color: "var(--text-muted)" }}
                    >
                      ↗
                    </span>
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          )}

          {/* ── Stack ─────────────────────────────────────────────────────── */}
          <ScrollReveal className="mt-20 sm:mt-32 w-full" ariaLabel="Tech stack">
            <SectionLabel>stack</SectionLabel>
            <TechStack />
          </ScrollReveal>

          {/* ── Contact ────────────────────────────────────────────────────── */}
          <ScrollReveal className="mt-20 sm:mt-32 mb-10 w-full">
            <ContactCard />
          </ScrollReveal>

        </div>
      </div>
    </main>
  );
}
