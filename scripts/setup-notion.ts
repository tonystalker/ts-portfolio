import { Client } from "@notionhq/client";
import fs from "fs";
import path from "path";

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_PAGE_ID = process.env.NOTION_PAGE_ID;

if (!NOTION_TOKEN || !NOTION_PAGE_ID) {
  console.error("Missing NOTION_TOKEN or NOTION_PAGE_ID in .env.local");
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });
const parentPageId = NOTION_PAGE_ID.replace(/-/g, ""); // Ensure format

async function createProjectsDB() {
  console.log("Creating Projects Database...");
  const response = await notion.databases.create({
    parent: { type: "page_id", page_id: parentPageId },
    title: [{ type: "text", text: { content: "Projects" } }],
    properties: {
      Title: { title: {} },
      Slug: { rich_text: {} },
      Published: { checkbox: {} },
      Featured: { checkbox: {} },
      "Short Description": { rich_text: {} },
      Description: { rich_text: {} },
      "Cover Image": { files: {} },
      "Gallery Images": { files: {} },
      "Demo Video": { files: {} },
      "Architecture Image": { files: {} },
      Technologies: { multi_select: { options: [] } },
      Category: { select: { options: [] } },
      Status: { select: { options: [{ name: "LIVE", color: "green" }, { name: "BUILDING", color: "yellow" }, { name: "ARCHIVED", color: "gray" }] } },
      "GitHub URL": { url: {} },
      "Live Demo URL": { url: {} },
      Year: { number: { format: "number" } },
      Role: { rich_text: {} },
      Metrics: { rich_text: {} },
      Tags: { multi_select: { options: [] } },
      "SEO Title": { rich_text: {} },
      "SEO Description": { rich_text: {} },
    },
  });
  return response.id;
}

async function createWritingDB() {
  console.log("Creating Writing Database...");
  const response = await notion.databases.create({
    parent: { type: "page_id", page_id: parentPageId },
    title: [{ type: "text", text: { content: "Writing" } }],
    properties: {
      Title: { title: {} },
      Slug: { rich_text: {} },
      Published: { checkbox: {} },
      Featured: { checkbox: {} },
      "Cover Image": { files: {} },
      Excerpt: { rich_text: {} },
      "Reading Time": { rich_text: {} },
      Tags: { multi_select: { options: [] } },
      Category: { select: { options: [] } },
      "Published Date": { date: {} },
      "Updated Date": { date: {} },
      "SEO Title": { rich_text: {} },
      "SEO Description": { rich_text: {} },
    },
  });
  return response.id;
}

async function createReadsDB() {
  console.log("Creating Reads Database...");
  const response = await notion.databases.create({
    parent: { type: "page_id", page_id: parentPageId },
    title: [{ type: "text", text: { content: "Reads" } }],
    properties: {
      Title: { title: {} },
      URL: { url: {} },
      Thumbnail: { files: {} },
      Author: { rich_text: {} },
      Source: { rich_text: {} },
      Type: { select: { options: [{ name: "Article", color: "blue" }, { name: "Paper", color: "purple" }, { name: "Video", color: "red" }, { name: "Book", color: "orange" }, { name: "Tool", color: "green" }] } },
      Category: { select: { options: [] } },
      Tags: { multi_select: { options: [] } },
      Difficulty: { select: { options: [{ name: "Beginner", color: "green" }, { name: "Intermediate", color: "yellow" }, { name: "Advanced", color: "red" }] } },
      "My Take": { rich_text: {} },
      Recommended: { checkbox: {} },
      Published: { checkbox: {} },
      "Date Added": { date: {} },
    },
  });
  return response.id;
}

async function createExperienceDB() {
  console.log("Creating Experience Database...");
  const response = await notion.databases.create({
    parent: { type: "page_id", page_id: parentPageId },
    title: [{ type: "text", text: { content: "Experience" } }],
    properties: {
      Role: { title: {} },
      Company: { rich_text: {} },
      Duration: { rich_text: {} },
      Overview: { rich_text: {} },
      Contributions: { rich_text: {} }, // Multi-line rich text
      "Tech Stack": { multi_select: { options: [] } },
      "Company URL": { url: {} },
      Published: { checkbox: {} },
      Order: { number: { format: "number" } }
    },
  });
  return response.id;
}

async function createSiteSettingsDB() {
  console.log("Creating Site Settings Database...");
  const response = await notion.databases.create({
    parent: { type: "page_id", page_id: parentPageId },
    title: [{ type: "text", text: { content: "Site Settings" } }],
    properties: {
      Key: { title: {} },
      Value: { rich_text: {} },
      Image: { files: {} },
    },
  });
  return response.id;
}

async function main() {
  try {
    const projectsId = await createProjectsDB();
    const writingId = await createWritingDB();
    const readsId = await createReadsDB();
    const expId = await createExperienceDB();
    const settingsId = await createSiteSettingsDB();

    const envData = `
NOTION_PROJECTS_DB_ID=${projectsId}
NOTION_WRITING_DB_ID=${writingId}
NOTION_READS_DB_ID=${readsId}
NOTION_EXPERIENCE_DB_ID=${expId}
NOTION_SETTINGS_DB_ID=${settingsId}
`;

    fs.appendFileSync(path.resolve(process.cwd(), ".env.local"), envData);
    
    console.log("Successfully created databases!");
    console.log(envData);
    console.log("These have been appended to your .env.local file.");
    console.log("Please populate Notion with some initial data, set 'Published' to true, and restart the dev server.");
  } catch (error) {
    console.error("Failed to setup Notion databases:");
    console.error(error);
  }
}

main();
