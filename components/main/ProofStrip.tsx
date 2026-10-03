export function ProofStrip() {
  return (
    <div 
      className="w-full py-3.5 my-8 sm:my-10 border-y select-text"
      style={{
        borderColor: "var(--line)",
        fontFamily: "var(--font-mono)",
      }}
      aria-label="Current professional status and focus"
    >
      <div className="flex flex-wrap items-center justify-between gap-y-2.5 gap-x-6 text-[11px] sm:text-[12px] tracking-tight">
        {/* Item 1: Focus */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: "var(--text-secondary)" }}>
            FOCUS
          </span>
          <span style={{ color: "var(--text-primary)" }}>
            AI agents · voice interfaces · scalable systems
          </span>
        </div>

        {/* Separator for desktop */}
        <span className="hidden md:inline-block w-1 h-1 rounded-full opacity-30" style={{ background: "var(--text-secondary)" }} />

        {/* Item 2: Location */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: "var(--text-secondary)" }}>
            LOC
          </span>
          <span style={{ color: "var(--text-primary)" }}>
            India · UTC+5:30
          </span>
        </div>

        {/* Separator for desktop */}
        <span className="hidden md:inline-block w-1 h-1 rounded-full opacity-30" style={{ background: "var(--text-secondary)" }} />

        {/* Item 3: Status / Availability */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--accent)" }} />
          <span style={{ color: "var(--text-primary)" }}>
            Open to internships, freelance & full-time
          </span>
        </div>
      </div>
    </div>
  );
}
