import { Client } from "@notionhq/client";

// Initialize Notion Client
export const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});
