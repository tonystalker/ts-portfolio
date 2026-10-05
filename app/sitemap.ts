import { MetadataRoute } from "next";
import { getArticles, getProjects, getReads } from "@/lib/notion/service";

const BASE_URL = "https://www.ayush-tripathi.in";
export const revalidate = 3600;

function toDate(value?: string | Date | null): Date | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

function latest(dates: (Date | undefined)[]): Date | undefined {
  const valid = dates.filter((d): d is Date => d !== undefined);
  return valid.length ? new Date(Math.max(...valid.map((d) => d.getTime()))) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, projects, reads] = await Promise.all([
    getArticles(),
    getProjects(),
    getReads(),
  ]);

  const articleEntries = articles
    .filter((post) => Boolean(post.slug))
    .map((post) => ({
      url: `${BASE_URL}/writing/${post.slug}`,
      lastModified: toDate(post.updatedDate) ?? toDate(post.publishedDate),
    }));

  const latestArticle = latest(
    articles.map((a) => toDate(a.updatedDate) ?? toDate(a.publishedDate))
  );

  const latestRead = latest(reads.map((r) => toDate(r.dateAdded)));

  const projectEntries = projects
    .filter((p) => Boolean(p.slug))
    .map((p) => ({ url: `${BASE_URL}/projects/${p.slug}` }));

  return [
    { url: BASE_URL, lastModified: latestArticle },
    { url: `${BASE_URL}/about` },
    { url: `${BASE_URL}/projects` },
    { url: `${BASE_URL}/writing`, lastModified: latestArticle },
    { url: `${BASE_URL}/reads`, lastModified: latestRead },
    ...projectEntries,
    ...articleEntries,
  ];
}
