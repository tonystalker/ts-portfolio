import { NextRequest, NextResponse } from "next/server";
import { notionClient } from "@/lib/notion/client";

export const revalidate = 3600;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pageId = searchParams.get("pageId");
  const property = searchParams.get("property") || "Cover Image";
  const directUrl = searchParams.get("url");

  try {
    let targetUrl = directUrl;

    if (pageId) {
      const page = (await notionClient.pages.retrieve({ page_id: pageId })) as any;
      const fileProp = page.properties?.[property];
      if (fileProp?.files && fileProp.files.length > 0) {
        const file = fileProp.files[0];
        targetUrl = file.type === "external" ? file.external.url : file.file.url;
      }
    }

    if (!targetUrl) {
      return new NextResponse("Image not found", { status: 404 });
    }

    const imageRes = await fetch(targetUrl);
    if (!imageRes.ok) {
      return new NextResponse("Failed to fetch image", { status: imageRes.status });
    }

    const contentType = imageRes.headers.get("content-type") || "image/png";
    const imageBuffer = await imageRes.arrayBuffer();

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("Notion image proxy error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
