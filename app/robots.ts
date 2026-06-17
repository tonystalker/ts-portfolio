import { MetadataRoute } from "next";

const BASE_URL = "https://www.ayush-tripathi.in";

/**
 * Generates /robots.txt
 * Tells all crawlers they are welcome to index everything and hands
 * them the sitemap location.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
