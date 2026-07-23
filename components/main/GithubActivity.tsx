"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import type { Activity } from "react-activity-calendar";

const ActivityCalendar = dynamic(
  () => import("react-activity-calendar").then((mod) => mod.ActivityCalendar),
  { ssr: false, loading: () => <div className="h-[150px] w-full animate-pulse bg-[var(--glass)] rounded-xl" /> }
);
import "react-activity-calendar/tooltips.css";

// Poll interval in ms (5 minutes)
const POLL_INTERVAL = 5 * 60 * 1000;

export function GithubActivity() {
  const [data, setData] = useState<Activity[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Detect theme changes (class "dark" on <html>)
  useEffect(() => {
    setMounted(true);
    const html = document.documentElement;
    setIsDark(html.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setIsDark(html.classList.contains("dark"));
    });
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const fetchContributions = useCallback(async () => {
    try {
      const res = await fetch("/api/github", { cache: "no-store" });
      if (!res.ok) {
        setError(true);
        setLoading(false);
        return;
      }
      const json = await res.json();

      if (json.contributions && json.contributions.length > 0) {
        setData(json.contributions);
        setTotalContributions(json.totalContributions ?? 0);
        setError(false);
      }
    } catch (err) {
      console.error("Failed to fetch GitHub contributions:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContributions();

    // Poll every 5 minutes for near-realtime updates
    const interval = setInterval(fetchContributions, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchContributions]);

  // Format date for tooltip: "June 18, 2026"
  function formatDate(dateStr: string): string {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="w-full overflow-x-auto pb-4 custom-scrollbar min-h-[150px]">
        {!mounted ? null : error && !data.length ? (
          <p style={{ color: "var(--text)", opacity: 0.5, fontSize: 13 }}>
            Unable to load GitHub activity.
          </p>
        ) : (
          <ActivityCalendar
            data={data.length > 0 ? data : []}
            loading={loading}
            colorScheme={isDark ? "dark" : "light"}
            blockMargin={4}
            blockSize={12}
            fontSize={12}
            theme={{
              light: [
                "rgba(27,94,32,0.08)",
                "rgba(27,94,32,0.25)",
                "rgba(27,94,32,0.45)",
                "rgba(27,94,32,0.65)",
                "rgba(27,94,32,0.9)",
              ],
              dark: [
                "rgba(255,255,255,0.1)",
                "rgba(255,255,255,0.3)",
                "rgba(255,255,255,0.5)",
                "rgba(255,255,255,0.7)",
                "rgba(255,255,255,0.9)",
              ],
            }}
            labels={{
              totalCount: `{{count}} contributions in {{year}}`,
            }}
            tooltips={{
              activity: {
                text: (activity: Activity) => {
                  const count = activity.count;
                  const dateFormatted = formatDate(activity.date);
                  if (count === 0) {
                    return `No contributions on ${dateFormatted}`;
                  }
                  return `${count} contribution${count !== 1 ? "s" : ""} on ${dateFormatted}`;
                },
                withArrow: true,
              },
            }}
            style={{
              color: "var(--text)",
            }}
          />
        )}
      </div>
  );
}
