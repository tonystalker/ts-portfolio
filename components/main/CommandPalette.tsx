"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { NotionProject } from "@/lib/notion/models";
import "./command-palette.css";

export function CommandPalette({ projects }: { projects: NotionProject[] }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  const handleThemeToggle = (mode: "light" | "dark" | "toggle") => {
    runCommand(() => {
      document.documentElement.classList.add("theme-transition");
      if (mode === "toggle") {
        document.documentElement.classList.toggle("dark");
      } else if (mode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      
      const isDark = document.documentElement.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");

      setTimeout(() => {
        document.documentElement.classList.remove("theme-transition");
      }, 250);
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
        >
          <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="w-full max-w-[640px] relative z-[101]"
          >
            <Command
              className="w-full rounded-2xl overflow-hidden shadow-2xl border"
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--border)",
              }}
              loop
            >
              <div className="flex items-center border-b px-4" style={{ borderColor: "var(--border-secondary)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-muted)] mr-3"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <Command.Input
                  placeholder="Type a command or search..."
                  className="w-full h-14 bg-transparent outline-none text-[var(--text)] placeholder-[var(--text-placeholder)] font-sans text-[15px]"
                />
              </div>

              <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-hide">
                <Command.Empty className="py-6 text-center text-[14px] text-[var(--text-muted)] font-mono">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Navigation" className="px-2 text-[12px] font-medium text-[var(--text-muted)] py-2">
                  <Command.Item onSelect={() => runCommand(() => router.push("/"))} className="cmdk-item">
                    <span>Home</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => router.push("/work"))} className="cmdk-item">
                    <span>Work</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => router.push("/projects"))} className="cmdk-item">
                    <span>Projects</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => router.push("/blog"))} className="cmdk-item">
                    <span>Blog</span>
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Actions" className="px-2 text-[12px] font-medium text-[var(--text-muted)] py-2 border-t border-[var(--border-secondary)] mt-1">
                  <Command.Item onSelect={() => runCommand(() => window.open("/resume.pdf", "_blank"))} className="cmdk-item">
                    <span>Open Resume</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => {
                    navigator.clipboard.writeText("707ayushtripathi@gmail.com");
                    // Could add a toast here
                  })} className="cmdk-item">
                    <span>Copy Email Address</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => window.open("https://github.com/tonystalker", "_blank"))} className="cmdk-item">
                    <span>GitHub Profile</span>
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Theme" className="px-2 text-[12px] font-medium text-[var(--text-muted)] py-2 border-t border-[var(--border-secondary)] mt-1">
                  <Command.Item onSelect={() => handleThemeToggle("toggle")} className="cmdk-item">
                    <span>Toggle Theme</span>
                  </Command.Item>
                  <Command.Item onSelect={() => handleThemeToggle("light")} className="cmdk-item">
                    <span>Switch to Light Mode</span>
                  </Command.Item>
                  <Command.Item onSelect={() => handleThemeToggle("dark")} className="cmdk-item">
                    <span>Switch to Dark Mode</span>
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Projects" className="px-2 text-[12px] font-medium text-[var(--text-muted)] py-2 border-t border-[var(--border-secondary)] mt-1">
                  {projects?.map((project) => (
                    <Command.Item 
                      key={project.slug}
                      onSelect={() => runCommand(() => {
                        if (project.liveDemoUrl) window.open(project.liveDemoUrl, "_blank");
                        else if (project.githubUrl) window.open(project.githubUrl, "_blank");
                      })} 
                      className="cmdk-item"
                    >
                      <div className="flex items-center gap-3">
                        <span>{project.title}</span>
                        <span className="text-[11px] text-[var(--text-placeholder)] font-mono">{project.slug}</span>
                      </div>
                    </Command.Item>
                  ))}
                </Command.Group>

              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
