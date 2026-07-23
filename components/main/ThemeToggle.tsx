"use client";

export function ThemeToggle() {
  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const x = e.clientX;
    const y = e.clientY;
    const isDark = document.documentElement.classList.contains("dark");

    const transition = () => {
      document.documentElement.classList.add("theme-transition");
      document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "light" : "dark");
      
      // Remove class after transition completes to prevent jank on resizing
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transition");
      }, 250);
    };

    transition();
  };

  return (
    <button
      id="theme-toggle"
      onClick={toggle}
      aria-label="Toggle dark/light theme"
      className="relative flex items-center justify-center w-8 h-8 opacity-50 hover:opacity-100 transition-opacity cursor-crosshair"
    >
      {/* Half-circle icon */}
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M9 1a8 8 0 0 1 0 16V1z"
          fill="currentColor"
        />
        <circle
          cx="9"
          cy="9"
          r="8"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
        />
      </svg>
    </button>
  );
}
