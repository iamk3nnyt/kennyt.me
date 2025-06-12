import { BASE_URL } from "@/constants";
import { getArticleCount, getPaginatedArticles } from "@/lib/data/blog";
import type { MetadataRoute } from "next";

const POSTS_PER_SITEMAP = 1000;

export async function generateSitemaps() {
  const count = await getArticleCount();
  const totalSitemaps = Math.ceil(count / POSTS_PER_SITEMAP);

  return Array.from({ length: totalSitemaps }, (_, i) => ({ id: i }));
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const { data: paginatedArticles } = await getPaginatedArticles(
    id + 1,
    POSTS_PER_SITEMAP,
  );

  return paginatedArticles.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
}
