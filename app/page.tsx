import type { Metadata } from "next";
import { Hero } from "@/components/main/Hero";
import { ProofStrip } from "@/components/main/ProofStrip";
import { GithubActivity } from "@/components/main/GithubActivity";
import { StorySection } from "@/components/main/StorySection";
import { ProjectShowcase } from "@/components/main/ProjectShowcase";
import { Experience } from "@/components/main/Experience";
import { NowSection } from "@/components/main/NowSection";
import { ContactCard } from "@/components/main/ContactCard";
import { AyushTypographyFooter } from "@/components/main/AyushTypographyFooter";
import { ScrollReveal } from "@/components/main/ScrollReveal";
import { getProjects, getExperience, getSiteSettings } from "@/lib/notion/service";

export const metadata: Metadata = {
  title: "Ayush Tripathi | AI Agent & Backend Engineer, IIT BHU",
  description:
    "Ayush Tripathi is an AI agent and backend engineer (IIT BHU). Builds LangGraph multi-agent systems, RAG, and FastAPI backends. Open to roles.",
  alternates: { canonical: "https://www.ayush-tripathi.in" },
};

function SectionLabel({ 
  children, 
  number,
  subtitle
}: { 
  children: React.ReactNode; 
  number?: string;
  subtitle?: string;
}) {
  return (
    <div 
      className="flex flex-col gap-1 mb-6 sm:mb-8 pb-3 border-b w-full"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="flex items-center gap-2.5">
        {number && (
          <span className="text-[11px] font-mono font-bold" style={{ color: "var(--accent)" }}>
            {number}
          </span>
        )}
        <h2
          className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}
        >
          {children}
        </h2>
      </div>
      {subtitle && (
        <p className="text-[13px] sm:text-[14px] mt-1" style={{ color: "var(--text-body)", fontFamily: "var(--font-sans)" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default async function Home() {
  const projects = await getProjects();
  const experience = await getExperience();
  const settings = await getSiteSettings();

  return (
    <main className="min-h-dvh flex flex-col items-center w-full overflow-x-hidden" itemScope itemType="https://schema.org/CollectionPage">
      {/* ── CollectionPage JSON-LD ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Ayush Tripathi | AI Systems & Product Engineering",
            "description": "I build AI products and systems that hold up after the demo.",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": projects.slice(0, 3).map((p, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "item": {
                  "@type": "SoftwareSourceCode",
                  "name": p.title,
                  "description": p.shortDescription || p.description,
                  "codeRepository": p.githubUrl || undefined,
                  "url": p.liveDemoUrl || undefined,
                  "programmingLanguage": p.technologies || p.tags || []
                }
              }))
            }
          })
        }}
      />

      {/* Main Content Column (Desktop max 1180px, responsive padding) */}
      <div className="w-full max-w-[1180px] px-5 sm:px-8 md:px-12 pt-12 sm:pt-20 md:pt-24 pb-16 flex flex-col items-start relative">
        
        {/* 1. Hero / Thesis */}
        <header className="w-full" aria-label="Introduction and Thesis">
          <h1 className="sr-only">Ayush Tripathi | AI Systems & Product Engineering</h1>
          <Hero settings={settings} />
        </header>

        {/* 2. Proof Strip */}
        <section className="w-full" aria-label="Current focus and availability">
          <ProofStrip />
        </section>

        {/* 3. GitHub Activity Heatmap */}
        <section className="w-full mt-8 sm:mt-10" aria-label="GitHub activity and contribution heatmap">
          <ScrollReveal>
            <GithubActivity />
          </ScrollReveal>
        </section>

        {/* 4. Story / How I got here */}
        <section id="about" className="mt-12 sm:mt-16 w-full scroll-mt-24" aria-labelledby="story-heading">
          <ScrollReveal>
            <SectionLabel number="01">
              <span id="story-heading">Background & Story</span>
            </SectionLabel>
            <StorySection />
          </ScrollReveal>
        </section>

        {/* 4. Selected Work (Exactly 3 strong projects in stacked editorial cards) */}
        <section id="projects" className="mt-16 sm:mt-24 md:mt-28 w-full scroll-mt-24" aria-labelledby="selected-work-heading">
          <ScrollReveal>
            <SectionLabel 
              number="02"
              subtitle="Things I built to make difficult workflows simpler, faster, or more reliable."
            >
              <span id="selected-work-heading">Selected work</span>
            </SectionLabel>
            <ProjectShowcase projects={projects} />
          </ScrollReveal>
        </section>

        {/* 5. Experience Timeline */}
        <section id="experience" className="mt-20 sm:mt-28 md:mt-32 w-full" aria-labelledby="experience-heading">
          <ScrollReveal>
            <SectionLabel number="03"><span id="experience-heading">Experience</span></SectionLabel>
            <Experience roles={experience} />
          </ScrollReveal>
        </section>

        {/* 6. Notes from the build (Active Research & GitHub Proof) */}
        <section className="mt-20 sm:mt-28 md:mt-32 w-full" aria-labelledby="now-heading">
          <ScrollReveal>
            <SectionLabel 
              number="04"
              subtitle="What I am learning about agents, infrastructure, product decisions, and the messy work between an idea and a reliable system."
            >
              <span id="now-heading">Notes from the build</span>
            </SectionLabel>
            <NowSection />
          </ScrollReveal>
        </section>

        {/* 7. Contact Invitation */}
        <section className="mt-20 sm:mt-28 md:mt-32 w-full" aria-labelledby="contact-heading">
          <ScrollReveal>
            <SectionLabel number="05"><span id="contact-heading">Contact</span></SectionLabel>
            <ContactCard />
          </ScrollReveal>
        </section>

      </div>

      {/* 8. Signature Interactive Ending: Giant Illuminated 3D AYUSH Typography */}
      <section className="w-full mt-12 sm:mt-20" aria-label="Interactive illuminated typography ending">
        <AyushTypographyFooter />
      </section>
    </main>
  );
}
