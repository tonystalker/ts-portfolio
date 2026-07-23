import { unstable_cache } from "next/cache";
import { cache } from "react";
import { notionClient } from "./client";
import type { 
  NotionProject, 
  NotionArticle, 
  NotionRead, 
  NotionExperience, 
  NotionSiteSettings 
} from "./models";
import { NotionToMarkdown } from "notion-to-md";

const n2m = new NotionToMarkdown({ notionClient });

// Helper to safely extract text from Notion's annoying rich text arrays
const extractText = (property: any): string => {
  if (!property) return "";
  if (property.type === "title") {
    return property.title?.map((t: any) => t.plain_text).join("") || "";
  }
  if (property.type === "rich_text") {
    return property.rich_text?.map((t: any) => t.plain_text).join("") || "";
  }
  return "";
};

const extractUrl = (property: any): string => {
  return property?.url || "";
};

const extractCheckbox = (property: any): boolean => {
  return property?.checkbox || false;
};

const extractSelect = (property: any): string => {
  return property?.select?.name || "";
};

const extractMultiSelect = (property: any): string[] => {
  if (!property?.multi_select) return [];
  return property.multi_select.map((s: any) => s.name);
};

const extractNumber = (property: any): number => {
  return property?.number || 0;
};

const extractDate = (property: any): string => {
  return property?.date?.start || "";
};

const extractFileUrl = (property: any): string => {
  if (!property?.files || property.files.length === 0) return "";
  const file = property.files[0];
  return file.type === "external" ? file.external.url : file.file.url;
};

const extractFileUrls = (property: any): string[] => {
  if (!property?.files) return [];
  return property.files.map((file: any) => 
    file.type === "external" ? file.external.url : file.file.url
  );
};


// ─── PROJECTS ─────────────────────────────────────────────────────────────────

export const getProjects = cache(
  unstable_cache(async (): Promise<NotionProject[]> => {
  const dbId = process.env.NOTION_PROJECTS_DB_ID;
  if (!dbId) return [];

  const response = await notionClient.databases.query({
    database_id: dbId,
    filter: {
      property: "Published",
      checkbox: { equals: true }
    },
    sorts: [{ property: "Year", direction: "descending" }]
  });

  const projects = response.results.map((page: any) => {
    const p = page.properties;
    return {
      id: page.id,
      title: extractText(p.Title),
      slug: extractText(p.Slug),
      published: extractCheckbox(p.Published),
      featured: extractCheckbox(p.Featured),
      shortDescription: extractText(p["Short Description"]),
      description: extractText(p.Description),
      coverImage: extractFileUrl(p["Cover Image"]),
      galleryImages: extractFileUrls(p["Gallery Images"]),
      demoVideo: extractFileUrl(p["Demo Video"]),
      architectureImage: extractFileUrl(p["Architecture Image"]),
      technologies: extractMultiSelect(p.Technologies),
      category: extractSelect(p.Category),
      status: extractSelect(p.Status) as any,
      githubUrl: extractUrl(p["GitHub URL"]),
      liveDemoUrl: extractUrl(p["Live Demo URL"]),
      year: extractNumber(p.Year),
      role: extractText(p.Role),
      metrics: extractText(p.Metrics),
      tags: extractMultiSelect(p.Tags),
      seoTitle: extractText(p["SEO Title"]),
      seoDescription: extractText(p["SEO Description"]),
      content: "", // We fetch this separately if needed
    };
  });

  // Deduplicate projects by title
  const seenTitles = new Set<string>();
  const uniqueProjects: NotionProject[] = [];
  
  for (const project of projects) {
    const normalizedTitle = project.title.trim().toLowerCase();
    if (normalizedTitle && !seenTitles.has(normalizedTitle)) {
      seenTitles.add(normalizedTitle);
      uniqueProjects.push(project);
    } else if (!normalizedTitle) {
      // If title is empty, just push it or generate a unique id, but we typically want to ignore empty titles
      // uniqueProjects.push(project);
    }
  }

  return uniqueProjects;
  }, ["notion-projects"], { revalidate: 3600, tags: ["projects"] })
);

export const getProject = cache(
  (slug: string) => unstable_cache(async (): Promise<NotionProject | null> => {
  const dbId = process.env.NOTION_PROJECTS_DB_ID;
  if (!dbId) return null;

  const response = await notionClient.databases.query({
    database_id: dbId,
    filter: {
      and: [
        { property: "Published", checkbox: { equals: true } },
        { property: "Slug", rich_text: { equals: slug } }
      ]
    }
  });

  if (response.results.length === 0) return null;

  const page = response.results[0] as any;
  const p = page.properties;

  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const content = n2m.toMarkdownString(mdBlocks).parent;

  return {
    id: page.id,
    title: extractText(p.Title),
    slug: extractText(p.Slug),
    published: extractCheckbox(p.Published),
    featured: extractCheckbox(p.Featured),
    shortDescription: extractText(p["Short Description"]),
    description: extractText(p.Description),
    coverImage: extractFileUrl(p["Cover Image"]),
    galleryImages: extractFileUrls(p["Gallery Images"]),
    demoVideo: extractFileUrl(p["Demo Video"]),
    architectureImage: extractFileUrl(p["Architecture Image"]),
    technologies: extractMultiSelect(p.Technologies),
    category: extractSelect(p.Category),
    status: extractSelect(p.Status) as any,
    githubUrl: extractUrl(p["GitHub URL"]),
    liveDemoUrl: extractUrl(p["Live Demo URL"]),
    year: extractNumber(p.Year),
    role: extractText(p.Role),
    metrics: extractText(p.Metrics),
    tags: extractMultiSelect(p.Tags),
    seoTitle: extractText(p["SEO Title"]),
    seoDescription: extractText(p["SEO Description"]),
    content,
  };
  }, [`notion-project-${slug}`], { revalidate: 3600, tags: [`project-${slug}`] })()
);

// ─── ARTICLES ─────────────────────────────────────────────────────────────────

export const getArticles = cache(
  unstable_cache(async (): Promise<NotionArticle[]> => {
  const dbId = process.env.NOTION_WRITING_DB_ID;
  if (!dbId) return [];

  const response = await notionClient.databases.query({
    database_id: dbId,
    filter: { property: "Published", checkbox: { equals: true } },
    sorts: [{ property: "Published Date", direction: "descending" }]
  });

  return response.results.map((page: any) => {
    const p = page.properties;
    return {
      id: page.id,
      title: extractText(p.Title),
      slug: extractText(p.Slug),
      published: extractCheckbox(p.Published),
      featured: extractCheckbox(p.Featured),
      coverImage: extractFileUrl(p["Cover Image"]),
      excerpt: extractText(p.Excerpt),
      readingTime: extractText(p["Reading Time"]),
      tags: extractMultiSelect(p.Tags),
      category: extractSelect(p.Category),
      publishedDate: extractDate(p["Published Date"]),
      updatedDate: extractDate(p["Updated Date"]),
      seoTitle: extractText(p["SEO Title"]),
      seoDescription: extractText(p["SEO Description"]),
      content: "",
    };
  });
  }, ["notion-articles"], { revalidate: 3600, tags: ["articles"] })
);

export const getArticle = cache(
  (slug: string) => unstable_cache(async (): Promise<NotionArticle | null> => {
  const dbId = process.env.NOTION_WRITING_DB_ID;
  if (!dbId) return null;

  const response = await notionClient.databases.query({
    database_id: dbId,
    filter: {
      and: [
        { property: "Published", checkbox: { equals: true } },
        { property: "Slug", rich_text: { equals: slug } }
      ]
    }
  });

  if (response.results.length === 0) return null;

  const page = response.results[0] as any;
  const p = page.properties;

  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const content = n2m.toMarkdownString(mdBlocks).parent;

  return {
    id: page.id,
    title: extractText(p.Title),
    slug: extractText(p.Slug),
    published: extractCheckbox(p.Published),
    featured: extractCheckbox(p.Featured),
    coverImage: extractFileUrl(p["Cover Image"]),
    excerpt: extractText(p.Excerpt),
    readingTime: extractText(p["Reading Time"]),
    tags: extractMultiSelect(p.Tags),
    category: extractSelect(p.Category),
    publishedDate: extractDate(p["Published Date"]),
    updatedDate: extractDate(p["Updated Date"]),
    seoTitle: extractText(p["SEO Title"]),
    seoDescription: extractText(p["SEO Description"]),
    content,
  };
  }, [`notion-article-${slug}`], { revalidate: 3600, tags: [`article-${slug}`] })()
);

export const getArticleBySlug = cache(
  (slug: string) => unstable_cache(async (): Promise<NotionArticle | null> => {
  const dbId = process.env.NOTION_WRITING_DB_ID;
  if (!dbId) return null;

  const response = await notionClient.databases.query({
    database_id: dbId,
    filter: {
      and: [
        { property: 'Published', checkbox: { equals: true } },
        { property: 'Slug', rich_text: { equals: slug } }
      ]
    }
  });

  if (response.results.length === 0) return null;

  const page = response.results[0] as any;
  const p = page.properties;
  
  const n2m = new NotionToMarkdown({ notionClient });
  const mdblocks = await n2m.pageToMarkdown(page.id);
  const content = n2m.toMarkdownString(mdblocks).parent || '';

  return {
    id: page.id,
    title: extractText(p.Title),
    slug: extractText(p.Slug),
    published: extractCheckbox(p.Published),
    featured: extractCheckbox(p.Featured),
    coverImage: extractFileUrl(p['Cover Image']),
    excerpt: extractText(p.Excerpt),
    readingTime: extractText(p['Reading Time']),
    tags: extractMultiSelect(p.Tags),
    category: extractSelect(p.Category),
    publishedDate: extractDate(p['Published Date']),
    updatedDate: extractDate(p['Updated Date']),
    seoTitle: extractText(p['SEO Title']),
    seoDescription: extractText(p['SEO Description']),
    content,
  };
  }, [`notion-article-slug-${slug}`], { revalidate: 3600, tags: [`article-${slug}`] })()
);

// ─── READS ────────────────────────────────────────────────────────────────────

export const getReads = cache(
  unstable_cache(async (): Promise<NotionRead[]> => {
  const dbId = process.env.NOTION_READS_DB_ID;
  if (!dbId) return [];

  const response = await notionClient.databases.query({
    database_id: dbId,
    filter: { property: "Published", checkbox: { equals: true } },
    sorts: [{ property: "Date Added", direction: "descending" }]
  });

  return response.results.map((page: any) => {
    const p = page.properties;
    return {
      id: page.id,
      title: extractText(p.Title),
      url: extractUrl(p.URL),
      thumbnail: extractFileUrl(p.Thumbnail),
      author: extractText(p.Author),
      source: extractText(p.Source),
      type: extractSelect(p.Type) as any,
      category: extractSelect(p.Category),
      tags: extractMultiSelect(p.Tags),
      difficulty: extractSelect(p.Difficulty) as any,
      myTake: extractText(p["My Take"]),
      recommended: extractCheckbox(p.Recommended),
      published: extractCheckbox(p.Published),
      dateAdded: extractDate(p["Date Added"]),
    };
  });
  }, ["notion-reads"], { revalidate: 3600, tags: ["reads"] })
);

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────

export const getExperience = cache(
  unstable_cache(async (): Promise<NotionExperience[]> => {
  const dbId = process.env.NOTION_EXPERIENCE_DB_ID;
  if (!dbId) return [];

  const response = await notionClient.databases.query({
    database_id: dbId,
    filter: { property: "Published", checkbox: { equals: true } },
    sorts: [{ property: "Order", direction: "ascending" }]
  });

  return response.results.map((page: any) => {
    const p = page.properties;
    const contributionsRaw = extractText(p.Contributions);
    // Split by newlines, trim and filter out empty strings
    const contributions = contributionsRaw
      .split("\n")
      .map(c => c.trim())
      .filter(c => c.length > 0);

    return {
      id: page.id,
      role: extractText(p.Role),
      company: extractText(p.Company),
      duration: extractText(p.Duration),
      overview: extractText(p.Overview),
      contributions,
      techStack: extractMultiSelect(p["Tech Stack"]),
      companyUrl: extractUrl(p["Company URL"]),
      published: extractCheckbox(p.Published),
      order: extractNumber(p.Order),
    };
  });
  }, ["notion-experience"], { revalidate: 3600, tags: ["experience"] })
);

// ─── SITE SETTINGS ────────────────────────────────────────────────────────────

export const getSiteSettings = cache(
  unstable_cache(async (): Promise<NotionSiteSettings> => {
  const dbId = process.env.NOTION_SETTINGS_DB_ID;
  if (!dbId) return {};

  const response = await notionClient.databases.query({
    database_id: dbId,
  });

  const settings: NotionSiteSettings = {};

  response.results.forEach((page: any) => {
    const p = page.properties;
    const key = extractText(p.Key);
    const value = extractText(p.Value);
    if (key) settings[key] = value;
  });

  return settings;
  }, ["notion-settings"], { revalidate: 3600, tags: ["settings"] })
);
