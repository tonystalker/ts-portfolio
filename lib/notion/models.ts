export interface NotionProject {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  featured: boolean;
  shortDescription: string;
  description: string;
  coverImage: string;
  galleryImages: string[];
  demoVideo: string;
  architectureImage: string;
  technologies: string[];
  category: string;
  status: "LIVE" | "BUILDING" | "ARCHIVED";
  githubUrl: string;
  liveDemoUrl: string;
  year: number;
  role: string;
  metrics: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  content: string; // Markdown
}

export interface NotionArticle {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  featured: boolean;
  coverImage: string;
  excerpt: string;
  readingTime: string;
  tags: string[];
  category: string;
  publishedDate: string;
  updatedDate: string;
  seoTitle: string;
  seoDescription: string;
  content: string; // Markdown
}

export interface NotionRead {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  author: string;
  source: string;
  type: "Article" | "Paper" | "Video" | "Book" | "Tool";
  category: string;
  tags: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  myTake: string;
  recommended: boolean;
  published: boolean;
  dateAdded: string;
}

export interface NotionExperience {
  id: string;
  role: string;
  company: string;
  duration: string;
  overview: string;
  contributions: string[]; // Splitting by newlines
  techStack: string[];
  companyUrl: string;
  published: boolean;
  order: number;
}

export interface NotionSiteSettings {
  [key: string]: string; // Key-Value pair from the settings DB
}
