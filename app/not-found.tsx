import Link from "next/link";
import { FiSearch } from "react-icons/fi";

export default function NotFound() {
  return (
    <main className="min-h-svh flex justify-center items-center px-5">
      <div className="flex flex-col items-center text-center max-w-[500px]">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
          style={{ background: "var(--glass)", border: "1px solid var(--border)" }}
        >
          <FiSearch size={24} style={{ color: "var(--text-muted)" }} />
        </div>
        
        <h1 
          className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.03em] leading-[1.1] mb-4"
          style={{ color: "var(--text)", fontFamily: "var(--font-sans)" }}
        >
          page not found
        </h1>
        
        <p 
          className="text-[14px] leading-relaxed mb-8"
          style={{ color: "var(--text-body)", fontFamily: "var(--font-mono)" }}
        >
          The page you are looking for doesn&apos;t exist, has been moved, or is temporarily unavailable.
        </p>

        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-medium transition-transform hover:-translate-y-0.5"
          style={{ 
            background: "var(--text)", 
            color: "var(--bg)", 
            fontFamily: "var(--font-mono)" 
          }}
        >
          return home
        </Link>
      </div>
    </main>
  );
}
