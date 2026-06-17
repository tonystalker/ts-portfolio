import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const BASE_URL = "https://www.ayush-tripathi.in";

/**
 * Generates /sitemap.xml
 * Extend the `routes` array whenever you add new pages or blog posts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
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
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const posts = getAllPosts();
  posts.forEach((post) => {
    routes.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  return routes;
}
