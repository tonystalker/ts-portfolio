import { MetadataRoute } from "next";
import { getArticles } from "@/lib/notion/service";

const BASE_URL = "https://www.ayush-tripathi.in";

/**
 * Generates /sitemap.xml
 * Extend the `routes` array whenever you add new pages or blog posts.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/reads`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const posts = await getArticles();
  posts.forEach((post) => {
    routes.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.publishedDate ? new Date(post.publishedDate) : now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  return routes;
}
