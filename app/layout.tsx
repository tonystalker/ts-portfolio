import type { Metadata } from "next";
import { Outfit, Instrument_Serif } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { NavPanel } from "@/components/main/NavPanel";
import { LenisProvider } from "@/components/main/LenisProvider";
import { BackgroundEffects } from "@/components/main/BackgroundEffects";
import { CommandPalette } from "@/components/main/CommandPalette";
import { JsonLd } from "@/components/json-ld";
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
  metadataBase: new URL("https://www.ayush-tripathi.in"),
  title: {
    default: "Ayush Tripathi | AI Agent & Backend Engineer, IIT BHU",
    template: "%s | Ayush Tripathi",
  },
  description:
    "Ayush Tripathi is an AI agent and backend engineer (IIT BHU). Builds LangGraph multi-agent systems, RAG, and FastAPI backends. Open to roles.",
  authors: [{ name: "Ayush Tripathi", url: "https://www.ayush-tripathi.in" }],
  creator: "Ayush Tripathi",
  publisher: "Ayush Tripathi",
  alternates: { canonical: "https://www.ayush-tripathi.in" },
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
    title: "Ayush Tripathi | AI Agent & Backend Engineer, IIT BHU",
    description:
      "Ayush Tripathi is an AI agent and backend engineer (IIT BHU). Builds LangGraph multi-agent systems, RAG, and FastAPI backends. Open to roles.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ayush Tripathi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Tripathi | AI Agent & Backend Engineer, IIT BHU",
    description:
      "Ayush Tripathi is an AI agent and backend engineer (IIT BHU). Builds LangGraph multi-agent systems, RAG, and FastAPI backends. Open to roles.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// ─── JSON-LD Schema Graph ─────────────────────────────────────────────────────
const personWebsiteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.ayush-tripathi.in/#person",
      "name": "Ayush Tripathi",
      "alternateName": ["ayutripathi"],
      "url": "https://www.ayush-tripathi.in",
      "image": "https://www.ayush-tripathi.in/og-image.png",
      "jobTitle": "AI Agent Engineer",
      "description": "AI agent and backend engineer from IIT (BHU) Varanasi.",
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Indian Institute of Technology (BHU) Varanasi"
      },
      "knowsAbout": [
        "AI agents",
        "LangGraph",
        "LangChain",
        "RAG",
        "Model Context Protocol",
        "FastAPI",
        "Backend development",
        "Competitive programming"
      ],
      "sameAs": [
        "https://github.com/tonystalker",
        "https://x.com/TonyStalkerr",
        "https://www.linkedin.com/in/ayush-tripathi-4a062b1b4/"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.ayush-tripathi.in/#website",
      "url": "https://www.ayush-tripathi.in",
      "name": "Ayush Tripathi",
      "publisher": { "@id": "https://www.ayush-tripathi.in/#person" }
    }
  ]
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const projects = await getProjects();
  
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <JsonLd data={personWebsiteGraph} />
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
