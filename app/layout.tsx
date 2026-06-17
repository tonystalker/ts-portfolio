import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { NavPanel } from "@/components/main/NavPanel";
import { ParticleWaveBackground } from "@/components/main/ParticleWaveBackground";
import { Ticker } from "@/components/main/Ticker";
import { LenisProvider } from "@/components/main/LenisProvider";
import "./globals.css";

// ─── SEO Metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Ayush Tripathi | Software Engineer & AI Infra",
  description:
    "Software Engineer at IIT (BHU) building full-stack apps, backend systems, and Web3 protocols. Skilled in Go, Python, TypeScript, React, and Solidity.",
  keywords: [
    "Ayush Tripathi", "Software Engineer", "AI Infrastructure",
    "Full Stack Developer", "IIT BHU", "Go", "Python", "TypeScript",
    "React", "Next.js", "Solidity", "Web3", "DeFi",
  ],
  authors: [{ name: "Ayush Tripathi", url: "https://www.ayush-tripathi.in" }],
  metadataBase: new URL("https://www.ayush-tripathi.in"),
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: '/iconimagee_round.png', type: 'image/png' },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.ayush-tripathi.in",
    siteName: "Ayush Tripathi",
    title: "Ayush Tripathi | Software Engineer & AI Infra",
    description: "Software Engineer at IIT (BHU) building full-stack apps, backend systems, and Web3 protocols.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ayush Tripathi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Tripathi | Software Engineer & AI Infra",
    description: "Software Engineer at IIT (BHU) building full-stack apps, backend systems, and Web3 protocols.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// ─── JSON-LD Person Schema ─────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ayush Tripathi",
  givenName: "Ayush",
  familyName: "Tripathi",
  url: "https://www.ayush-tripathi.in",
  image: "https://www.ayush-tripathi.in/heroimage.png",
  jobTitle: "Software Engineer",
  description: "Software Engineer at IIT (BHU) specialising in full-stack development, Web3 protocols, and AI infrastructure.",
  alumniOf: { 
    "@type": "CollegeOrUniversity", 
    name: "Indian Institute of Technology (BHU) Varanasi",
    sameAs: "https://iitbhu.ac.in/"
  },
  knowsAbout: [
    "Software Engineering", "Artificial Intelligence", "Web3", 
    "Blockchain", "Full Stack Development", "Go", "Python", "TypeScript"
  ],
  sameAs: [
    "https://github.com/tonystalker",
    "https://www.linkedin.com/in/ayush-tripathi-4a062b1b4/",
    "https://x.com/TonyStalkerr",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Theme init — prevents FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark');}else if(!t&&window.matchMedia('(prefers-color-scheme: light)').matches){document.documentElement.classList.remove('dark');}})();`,
          }}
        />
      </head>
      <body className={`${GeistSans.className} antialiased text-[var(--text)] selection:bg-[var(--accent)] selection:text-[var(--bg)] ${GeistMono.variable}`} style={{ background: "var(--bg)" }}>
        <ParticleWaveBackground />
        <div className="relative z-10">
          <LenisProvider>
            <NavPanel />
            {children}
            <Ticker />
          </LenisProvider>
        </div>

        {/* Footer */}
        <footer className="w-full border-t border-[var(--text)]/10 mb-8">
          <div className="mx-auto px-4 py-6 flex items-center justify-between" style={{ maxWidth: "700px" }}>
            <span className="text-[11px] opacity-30" style={{ fontFamily: "var(--font-mono)" }}>
              © {new Date().getFullYear()} ayush tripathi
            </span>
            <a
              href="mailto:707ayushtripathi@gmail.com"
              className="text-[11px] opacity-30 hover:opacity-80 transition-opacity no-underline"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              707ayushtripathi@gmail.com
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
