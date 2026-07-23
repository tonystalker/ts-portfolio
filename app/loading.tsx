export default function Loading() {
  return (
    <main className="min-h-dvh flex justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <div 
          className="w-6 h-6 rounded-full animate-pulse"
          style={{ background: "var(--text-muted)" }}
        />
        <span 
          className="text-[12px] tracking-wider uppercase animate-pulse"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
        >
          loading
        </span>
      </div>
    </main>
  );
}
