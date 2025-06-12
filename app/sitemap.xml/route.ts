import { BASE_URL } from "@/constants";
import { getArticleCount } from "@/lib/data/blog";
import { NextResponse } from "next/server";

const POSTS_PER_SITEMAP = 1000;

export async function GET() {
  try {
    const count = await getArticleCount();
    const totalSitemaps = Math.ceil(count / POSTS_PER_SITEMAP);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap/main.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
${Array.from(
  { length: totalSitemaps },
  (_, i) => `  <sitemap>
    <loc>${BASE_URL}/sitemap/sitemap/${i}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`,
).join("\n")}
</sitemapindex>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap index:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
