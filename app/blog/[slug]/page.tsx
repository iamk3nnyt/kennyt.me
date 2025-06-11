import { ReadOperations } from "@/lib/db/read";
import client from "@/lib/mongodb";
import { Article } from "@/types/blog";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

async function getArticle(slug: string) {
  const db = client.db("kennyt");
  const readOps = new ReadOperations<Article>(db, "blog_posts");

  const article = await readOps.findOne(
    { slug },
    {
      projection: {
        _id: 1,
        slug: 1,
        title: 1,
        excerpt: 1,
        date: 1,
        content: 1,
        image: 1,
      },
    },
  );

  return article;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticle(params.slug);
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
  params: { slug: string };
}) {
  const article = await getArticle(params.slug);
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
