export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readTime: number;
  content: string; // HTML string: safe, all content is authored by us
}

export const posts: Post[] = [];

/** Returns all posts sorted newest-first. */
export function getAllPosts(): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** Returns a single post by slug, or undefined if not found. */
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
