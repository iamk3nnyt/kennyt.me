import { AppImage } from "@/components/app-image";
import { getArticleBySlug, getRelatedArticles } from "@/lib/data/blog";
import { buildMetadata, extractKeywords } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const article = await getArticleBySlug(slug);
  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  const wordCount = article.content.split(/\s+/).length;
  const readingTimeISO = `PT${article.readTime.split(" ")[0]}M`;

  return buildMetadata({
    type: "article",
    title: `${article.title} - Kenny Tran's Blog`,
    description: article.excerpt,
    path: `/blog/${slug}`,
    publishedTime: article.date,
    modifiedTime: article.date,
    author: "Kenny Tran",
    wordCount,
    readingTime: readingTimeISO,
    keywords: extractKeywords(article.content),
    image: article.image
      ? {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        }
      : undefined,
  });
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const article = await getArticleBySlug(slug);
  const relatedArticles = await getRelatedArticles(slug);
  if (!article) return notFound();

  return (
    <main className="bg-[#111113] px-4 py-16 text-[#F3F3F3]">
      <article className="mx-auto max-w-2xl">
        {article.image && (
          <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-xl">
            <AppImage
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        {article.tag && (
          <div className="mb-4 inline-block rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
            {article.tag}
          </div>
        )}
        <h1 className="mb-2 text-3xl font-bold text-white">{article.title}</h1>
        <div className="mb-8 flex items-center gap-2 text-xs text-[#88888C]">
          <time>{article.date}</time>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>
        <div
          className="prose prose-invert prose-headings:text-white prose-p:text-[#B0B0B0] prose-li:text-[#B0B0B0] prose-ul:marker:text-[#88888C]"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 border-t border-[#232326] pt-8">
            <h2 className="mb-6 text-xl font-semibold text-white">
              Related Articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {relatedArticles.map((related) => (
                <article key={related.slug} className="group">
                  <Link href={`/blog/${related.slug}`}>
                    {related.image && (
                      <div className="relative mb-4 h-56 overflow-hidden rounded-lg">
                        <AppImage
                          src={related.image}
                          alt={related.title}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    {related.tag && (
                      <div className="mb-2 inline-block rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                        {related.tag}
                      </div>
                    )}
                    <h3 className="mb-2 text-lg font-medium text-white group-hover:text-blue-400">
                      {related.title}
                    </h3>
                    <p className="text-sm text-[#B0B0B0]">{related.excerpt}</p>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        <div className="mt-16 border-t border-[#232326] pt-8">
          <div className="flex items-start gap-4">
            <div className="relative size-12 shrink-0">
              <AppImage
                src={article.author.image}
                alt="Kenny Tran"
                className="h-full w-full rounded-full"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                {article.author.name}
              </h2>
              <p className="mt-1 text-sm text-[#B0B0B0]">
                {article.author.bio}
              </p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
