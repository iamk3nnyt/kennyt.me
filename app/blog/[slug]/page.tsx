import { getArticleBySlug } from "@/lib/data/blog";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

async function getArticle(slug: string) {
  const article = await getArticleBySlug(slug);
  return article;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const article = await getArticle(slug);
  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: ["Kenny Tran"],
      images: article.image ? [article.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image] : [],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const article = await getArticle(slug);
  if (!article) return notFound();

  return (
    <main className="bg-[#111113] px-4 py-16 text-[#F3F3F3]">
      <article className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold text-white">{article.title}</h1>
        <div className="mb-8 text-xs text-[#88888C]">{article.date}</div>
        <div
          className="prose prose-invert prose-headings:text-white prose-p:text-[#B0B0B0] prose-li:text-[#B0B0B0] prose-ul:marker:text-[#88888C]"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </main>
  );
}
