"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { SiGithub } from "react-icons/si";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const MONTH_NAMES = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN", 
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

const getCellStyle = (level: number) => {
  switch (level) {
    case 1:
      return {
        border: "1px solid rgba(255, 255, 255, 0.12)",
        backgroundColor: "#161619",
        backgroundImage: "radial-gradient(circle, rgba(255, 255, 255, 0.32) 0.7px, transparent 0.7px)",
        backgroundSize: "3px 3px",
      };
    case 2:
      return {
        border: "1px solid rgba(255, 255, 255, 0.22)",
        backgroundColor: "#2e2e36",
        backgroundImage: "radial-gradient(circle, rgba(255, 255, 255, 0.58) 0.8px, transparent 0.8px)",
        backgroundSize: "3px 3px",
      };
    case 3:
      return {
        border: "1px solid rgba(255, 255, 255, 0.35)",
        backgroundColor: "#585868",
        backgroundImage: "radial-gradient(circle, rgba(255, 255, 255, 0.85) 0.9px, transparent 0.9px)",
        backgroundSize: "3px 3px",
      };
    case 4:
      return {
        border: "1px solid #ffffff",
        backgroundColor: "#ffffff",
        boxShadow: "0 0 6px rgba(255, 255, 255, 0.45)",
      };
    case 0:
    default:
      return {
        border: "1px solid rgba(255, 255, 255, 0.07)",
        backgroundColor: "transparent",
      };
  }
};

export function GithubActivity() {
  const [data, setData] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeCell, setActiveCell] = useState<ContributionDay | null>(null);

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
      } else {
        setError(true);
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
  }, [fetchContributions]);

  // Group days into weeks (columns)
  const { weeks, monthLabels } = useMemo(() => {
    if (!data.length) return { weeks: [], monthLabels: [] };

    const weeksList: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    // Find starting day of week for alignment
    const firstDate = new Date(data[0].date + "T00:00:00");
    const firstDayOfWeek = firstDate.getDay(); // 0 is Sunday

    // Pad beginning of first week if needed
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push({ date: "", count: -1, level: -1 });
    }

    data.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeksList.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ date: "", count: -1, level: -1 });
      }
      weeksList.push(currentWeek);
    }

    // Determine month label positions across columns
    const labels: { label: string; colIndex: number }[] = [];
    let lastMonth = -1;

    weeksList.forEach((week, colIdx) => {
      const firstValidDay = week.find((d) => d.date);
      if (firstValidDay) {
        const d = new Date(firstValidDay.date + "T00:00:00");
        const m = d.getMonth();
        if (m !== lastMonth && colIdx - (labels[labels.length - 1]?.colIndex ?? -5) >= 3) {
          labels.push({ label: MONTH_NAMES[m], colIndex: colIdx });
          lastMonth = m;
        }
      }
    });

    return { weeks: weeksList, monthLabels: labels };
  }, [data]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    const d = new Date(Number(year), Number(month) - 1, Number(day));
    return d.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="w-full flex flex-col gap-2 font-mono">
        <div className="flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
          <span className="tracking-[0.14em] uppercase">GITHUB ACTIVITY</span>
          <span className="opacity-50">open profile ↗</span>
        </div>
        <div 
          className="w-full p-6 rounded-2xl animate-pulse"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
            minHeight: "220px",
          }}
        />
      </div>
    );
  }

  if (error || !data.length || totalContributions === null) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-2.5 font-mono select-none">
      {/* ── Outer Section Header ── */}
      <div className="flex items-center justify-between text-[11px] text-[var(--text-secondary)] px-0.5">
        <span className="tracking-[0.14em] uppercase font-semibold">
          GITHUB ACTIVITY
        </span>
        <a 
          href="https://github.com/tonystalker" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[11px] hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-1 group"
        >
          <span>open profile</span>
          <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" />
          </svg>
        </a>
      </div>

      {/* ── Main Activity Card ── */}
      <div 
        className="w-full p-4 sm:p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--line)",
          boxShadow: "var(--shadow-sm)",
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 32V0h32' stroke='rgba(255,255,255,0.025)' stroke-width='1'/%3E%3C/svg%3E")`,
        }}
      >
        {/* Top Bar: Username on Left, Total count and View link on Right */}
        <div className="flex items-center justify-between text-[11px] sm:text-[12px] flex-wrap gap-2">
          <div className="flex items-center gap-2 text-[var(--text-primary)] font-medium">
            <SiGithub size={15} />
            <span>@tonystalker</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] sm:text-[12px] text-[var(--text-secondary)]">
            <span className="font-semibold text-[var(--text-primary)]">
              {totalContributions.toLocaleString()} CONTRIBUTIONS
            </span>
            <span className="opacity-40">·</span>
            <span className="text-[var(--text-muted)]">LAST 365 DAYS</span>
            <span className="opacity-40">·</span>
            <a 
              href="https://github.com/tonystalker" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[var(--text-primary)] hover:underline inline-flex items-center gap-1 font-medium group"
            >
              <span>VIEW GITHUB</span>
              <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Contribution Heatmap Grid ── */}
        <div className="w-full overflow-x-auto pb-1 pt-1 scrollbar-none focus:outline-none">
          <div className="min-w-[700px] flex flex-col gap-1.5">
            {/* Month labels header */}
            <div className="flex text-[10px] h-4 relative text-[var(--text-muted)] tracking-wider">
              {monthLabels.map((m) => (
                <span 
                  key={m.colIndex}
                  className="absolute"
                  style={{ left: `${(m.colIndex / weeks.length) * 100}%` }}
                >
                  {m.label}
                </span>
              ))}
            </div>

            {/* Grid rows */}
            <div className="flex gap-[3.5px]" role="grid" aria-readonly="true">
              {weeks.map((week, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-[3.5px] flex-1" role="row">
                  {week.map((day, rowIdx) => {
                    if (day.level === -1) {
                      return (
                        <div 
                          key={rowIdx} 
                          className="w-full aspect-square rounded-[2px] opacity-0"
                        />
                      );
                    }

                    const isSelected = activeCell?.date === day.date;
                    const label = `${day.count} contribution${day.count !== 1 ? "s" : ""} on ${formatDate(day.date)}`;
                    const cellStyle = getCellStyle(Math.min(Math.max(day.level, 0), 4));

                    return (
                      <button
                        key={day.date}
                        type="button"
                        role="gridcell"
                        tabIndex={0}
                        aria-label={label}
                        onMouseEnter={() => setActiveCell(day)}
                        onFocus={() => setActiveCell(day)}
                        onClick={() => setActiveCell(day)}
                        className="w-full aspect-square rounded-[2px] transition-transform duration-100 cursor-pointer focus:outline-none relative"
                        style={{
                          ...cellStyle,
                          transform: isSelected ? "scale(1.3)" : "scale(1)",
                          zIndex: isSelected ? 20 : 1,
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom Bar: Refresh Notice + Interactive Hover Detail + Less/More Legend ── */}
        <div 
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-3 border-t text-[10px] text-[var(--text-muted)] tracking-wider" 
          style={{ borderColor: "var(--line)" }}
        >
          {/* Left: Info or Active hover detail */}
          <div className="flex items-center gap-2 min-h-[18px]">
            {activeCell ? (
              <span className="text-[var(--text-primary)]">
                <strong className="text-white font-semibold">{activeCell.count}</strong> contribution{activeCell.count !== 1 ? "s" : ""} on {formatDate(activeCell.date)}
              </span>
            ) : (
              <span>LAST 365 DAYS · REFRESHED EVERY 6 HOURS</span>
            )}
          </div>

          {/* Right: LESS → MORE Legend */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-[10px]">
            <span>LESS</span>
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <span
                  key={level}
                  className="w-2.5 h-2.5 rounded-[2px]"
                  style={getCellStyle(level)}
                />
              ))}
            </div>
            <span>MORE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
