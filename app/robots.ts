import { MetadataRoute } from "next";

const BASE_URL = "https://www.ayush-tripathi.in";

/**
 * Generates /robots.txt
 * Configures crawler allowances for web search engines and LLM answer engines.
 */
export default function robots(): MetadataRoute.Robots {
  const allowedBots = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-SearchBot",
    "PerplexityBot",
    "Google-Extended",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      ...allowedBots.map((bot) => ({
        userAgent: bot,
        allow: "/",
        disallow: ["/api/"],
      })),
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
