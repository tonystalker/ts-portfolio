"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FiAlertCircle } from "react-icons/fi";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error("Runtime Error:", error);
  }, [error]);

  return (
    <main className="min-h-dvh flex justify-center items-center px-5">
      <div className="flex flex-col items-center text-center max-w-[500px]">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
          style={{ background: "var(--glass)", border: "1px solid var(--border)" }}
        >
          <FiAlertCircle size={24} style={{ color: "var(--text-muted)" }} />
        </div>
        
        <h1 
          className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.03em] leading-[1.1] mb-4"
          style={{ color: "var(--text)", fontFamily: "var(--font-sans)" }}
        >
          something went wrong
        </h1>
        
        <p 
          className="text-[14px] leading-relaxed mb-8"
          style={{ color: "var(--text-body)", fontFamily: "var(--font-mono)" }}
        >
          An unexpected error occurred while loading this page. 
          The issue has been automatically logged.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => reset()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-medium transition-transform hover:-translate-y-0.5"
            style={{ 
              background: "var(--text)", 
              color: "var(--bg)", 
              fontFamily: "var(--font-mono)" 
            }}
          >
            try again
          </button>
          
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-medium transition-colors hover:opacity-80"
            style={{ 
              background: "var(--glass)", 
              color: "var(--text)",
              border: "1px solid var(--border)",
              fontFamily: "var(--font-mono)"
            }}
          >
            return home
          </Link>
        </div>
      </div>
    </main>
  );
}
