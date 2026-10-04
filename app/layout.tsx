import type { Metadata } from "next";
import { Outfit, Instrument_Serif } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { NavPanel } from "@/components/main/NavPanel";
import { LenisProvider } from "@/components/main/LenisProvider";
import { BackgroundEffects } from "@/components/main/BackgroundEffects";
import { CommandPalette } from "@/components/main/CommandPalette";
import { getProjects } from "@/lib/notion/service";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Ayush Tripathi | Software Engineer",
  description:
    "Software engineer from IIT (BHU) building AI applications, developer tools, and modern web experiences. Focused on scalable systems, clean engineering, and thoughtful user experiences.",
  keywords: [
    "Ayush Tripathi", "Software Engineer", "AI Engineer", "AI Agent Developer",
    "Full Stack Developer", "IIT BHU", "Go", "Python", "TypeScript",
    "React", "Next.js", "Solidity", "Generative AI", "MCP Developer"
  ],
  authors: [{ name: "Ayush Tripathi", url: "https://www.ayush-tripathi.in" }],
  creator: "Ayush Tripathi",
  publisher: "Ayush Tripathi",
  metadataBase: new URL("https://www.ayush-tripathi.in"),
  alternates: { canonical: "/" },
  formatDetection: { email: false, address: false, telephone: false },
  appleWebApp: { title: "Ayush Tripathi", statusBarStyle: "black-translucent" },
  icons: {
    icon: [{ url: '/iconimagee_round.png', type: 'image/png' }],
    apple: [{ url: '/iconimagee_round.png', type: 'image/png' }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.ayush-tripathi.in",
    siteName: "Ayush Tripathi",
    title: "Ayush Tripathi | Software Engineer",
    description: "Software engineer from IIT (BHU) building AI applications, developer tools, and modern web experiences. Focused on scalable systems, clean engineering, and thoughtful user experiences.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ayush Tripathi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Tripathi | Software Engineer",
    description: "Software engineer from IIT (BHU) building AI applications, developer tools, and modern web experiences. Focused on scalable systems, clean engineering, and thoughtful user experiences.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.ayush-tripathi.in",
    name: "Ayush Tripathi | Portfolio",
    description: "Portfolio of Ayush Tripathi, Software Engineer and AI Agent Developer.",
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2024-01-01T00:00:00-05:00",
    mainEntity: {
      "@type": "Person",
      name: "Ayush Tripathi",
      givenName: "Ayush",
      familyName: "Tripathi",
      url: "https://www.ayush-tripathi.in",
      image: "https://www.ayush-tripathi.in/heroimage.png",
      jobTitle: "Software Engineer",
      description: "Software engineer from IIT (BHU) building AI applications, developer tools, and modern web experiences. Focused on scalable systems, clean engineering, and thoughtful user experiences.",
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "IIT (BHU)",
        sameAs: "https://iitbhu.ac.in/"
      },
      knowsAbout: [
        "Software Engineering",
        "Artificial Intelligence",
        "Generative AI",
        "AI Agents",
        "MCP Development",
        "LLMs",
        "Web3",
        "Blockchain",
        "Full Stack Development",
        "Next.js",
        "TypeScript",
        "Python",
        "Go",
      ],
      sameAs: [
        "https://github.com/tonystalker",
        "https://www.linkedin.com/in/ayush-tripathi-4a062b1b4/",
        "https://x.com/TonyStalkerr",
      ],
    }
  }
];

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const projects = await getProjects();
  
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {/* Theme init: prevents FOUC */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(){var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark');}else if(!t&&window.matchMedia('(prefers-color-scheme: light)').matches){document.documentElement.classList.remove('dark');}})();`,
        }} />
      </head>
      <body
        className={`${outfit.variable} ${GeistMono.variable} ${instrumentSerif.variable} antialiased`}
        style={{ color: "var(--text)", fontFamily: "var(--font-sans)" }}
      >
        {/* Ambient subtle noise texture */}
        <BackgroundEffects />

        <div className="relative z-10">
          <LenisProvider>
            <NavPanel />
            {children}
            <CommandPalette projects={projects} />
          </LenisProvider>
        </div>
      </body>
    </html>
  );
}
