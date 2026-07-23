import { MetadataRoute } from "next";
import { getArticles, getProjects, getReads } from "@/lib/notion/service";

const BASE_URL = "https://www.ayush-tripathi.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, projects, reads] = await Promise.all([
    getArticles(),
    getProjects(),
    getReads(),
  ]);

  const now = new Date();

  // Find the most recent dates for the index pages
  const latestArticleDate = articles.length > 0 && articles[0].publishedDate
    ? new Date(articles[0].publishedDate)
    : now;
    
  const latestReadDate = reads.length > 0 && reads[0].dateAdded
    ? new Date(reads[0].dateAdded)
    : now;

  // Static & Index routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: now, // Projects don't have a specific update date mapped in Notion models
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/writing`,
      lastModified: latestArticleDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/reads`,
      lastModified: latestReadDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic Article Routes
  articles.forEach((post) => {
    const postDate = post.updatedDate 
      ? new Date(post.updatedDate) 
      : (post.publishedDate ? new Date(post.publishedDate) : now);
      
    routes.push({
      url: `${BASE_URL}/writing/${post.slug}`,
      lastModified: postDate,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  return routes;
}
