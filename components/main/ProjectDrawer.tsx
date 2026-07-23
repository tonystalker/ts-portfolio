"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { BrowserMockup } from "@/components/main/BrowserMockup";
import type { NotionProject } from "@/lib/notion/models";

interface ProjectDrawerProps {
  project: NotionProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDrawer({ project, isOpen, onClose }: ProjectDrawerProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!project) return null;

  // Variants for Desktop Right Drawer
  const desktopVariants: any = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  };

  // Variants for Mobile Bottom Sheet
  const mobileVariants: any = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
    exit: { y: "100%", opacity: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/20 dark:bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer / Sheet */}
          <m.article
            variants={isMobile ? mobileVariants : desktopVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed z-50 flex flex-col overflow-y-auto"
            itemScope 
            itemType="https://schema.org/SoftwareSourceCode"
            style={{
              background: "var(--bg)",
              borderLeft: isMobile ? "none" : "1px solid var(--border)",
              borderTop: isMobile ? "1px solid var(--border)" : "none",
              boxShadow: "var(--shadow-lg)",
              right: isMobile ? 0 : 0,
              top: isMobile ? "15vh" : 0,
              bottom: 0,
              width: isMobile ? "100%" : "600px",
              maxWidth: "100%",
              borderTopLeftRadius: isMobile ? "24px" : "0",
              borderTopRightRadius: isMobile ? "24px" : "0",
            }}
          >
            {/* Mobile Drag Handle */}
            {isMobile && (
              <div className="w-full flex justify-center py-3">
                <div className="w-12 h-1.5 rounded-full bg-[var(--border-secondary)]" />
              </div>
            )}

            {/* Header */}
            <header className="px-6 py-5 flex items-center justify-between border-b border-[var(--border-secondary)] sticky top-0 bg-[var(--bg)]/80 backdrop-blur-md z-10">
              <h2 className="text-xl font-semibold tracking-tight" style={{ color: "var(--text)" }} itemProp="name">
                {project.title}
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--bg-secondary)] hover:bg-[var(--border-secondary)] transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </header>

            {/* Content Body */}
            <div className="p-6 flex flex-col gap-8 pb-32">
              {/* Preview */}
              <div className="w-full">
                <BrowserMockup 
                  variant="safari" 
                  src={project.demoVideo || project.coverImage} 
                  alt={project.title} 
                  previewType={project.demoVideo ? "video" : "image"}
                />
              </div>

              {/* Description */}
              <section className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">Overview</h3>
                <p className="text-[15px] leading-relaxed text-[var(--text-body)]" itemProp="description">
                  {project.description}
                </p>
              </section>

              {/* Tech Stack */}
              {project.technologies && (
                <section className="flex flex-col gap-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 rounded-lg text-[13px] font-medium bg-[var(--bg-secondary)] border border-[var(--border-secondary)] text-[var(--text)]"
                        itemProp="programmingLanguage"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Links */}
              <section className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">Links</h3>
                <div className="flex gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[14px] font-medium bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text)] hover:bg-[var(--border-secondary)] transition-colors"
                    >
                      <SiGithub size={18} />
                      View Source
                    </a>
                  )}
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[14px] font-medium bg-[var(--text)] text-[var(--bg)] shadow-md hover:-translate-y-0.5 transition-transform"
                      itemProp="url"
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </section>
            </div>
          </m.article>
        </>
      )}
    </AnimatePresence>
  );
}
