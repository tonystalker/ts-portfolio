import { getArticles } from "@/lib/notion/service";

const BASE_URL = "https://www.ayush-tripathi.in";

export async function GET() {
  const articles = await getArticles();

  const feedXML = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Ayush Tripathi | Writing</title>
  <link>${BASE_URL}</link>
  <description>Technical articles, tutorials, and engineering essays by Ayush Tripathi.</description>
  <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  ${articles
    .map((article) => {
      const pubDate = article.publishedDate ? new Date(article.publishedDate).toUTCString() : new Date().toUTCString();
      return `
  <item>
    <title><![CDATA[${article.title}]]></title>
    <link>${BASE_URL}/writing/${article.slug}</link>
    <guid>${BASE_URL}/writing/${article.slug}</guid>
    <pubDate>${pubDate}</pubDate>
    <description><![CDATA[${article.excerpt}]]></description>
  </item>`;
    })
    .join("")}
</channel>
</rss>`;

  return new Response(feedXML, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
