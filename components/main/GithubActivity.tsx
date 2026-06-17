"use client";

import { useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { KineticHeading } from "./KineticHeading";

export function GithubActivity() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="mt-20 w-full" id="activity" aria-label="GitHub Activity">
      <KineticHeading
        as="h2"
        className="text-xl font-bold tracking-tight text-[var(--text)] mb-8"
      >
        activity
      </KineticHeading>
      <div className="w-full overflow-x-auto pb-4 custom-scrollbar min-h-[150px]">
        {mounted && (
          <GitHubCalendar
            username="tonystalker"
            colorScheme="dark"
            blockMargin={4}
            blockSize={12}
            fontSize={12}
            theme={{
              dark: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0.9)']
            }}
            style={{
              color: "var(--text)",
            }}
          />
        )}
      </div>
    </section>
  );
}
