import { AppImage } from "@/components/app-image";
import { BASE_URL } from "@/constants";
import { getArticleBySlug, getRelatedArticles } from "@/lib/data/blog";
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
  const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute
  const readingTimeISO = `PT${readingTime}M`; // ISO 8601 duration format

  return {
    title: `${article.title} - Kenny Tran's Blog`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      modifiedTime: article.date,
      authors: ["Kenny Tran"],
      images: article.image
        ? [
            {
              url: article.image,
              width: 1200,
              height: 630,
              alt: article.title,
            },
          ]
        : [],
      url: `${BASE_URL}/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image] : [],
      creator: "@itsk3nny_",
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${BASE_URL}/blog/${slug}`,
        url: `${BASE_URL}/blog/${slug}`,
        headline: article.title,
        description: article.excerpt,
        articleBody: article.content,
        wordCount: wordCount,
        datePublished: article.date,
        dateModified: article.date,
        inLanguage: "en-US",
        isAccessibleForFree: true,
        isFamilyFriendly: true,
        author: {
          "@type": "Person",
          name: "Kenny Tran",
          url: BASE_URL + "/about",
        },
        publisher: {
          "@type": "Person",
          name: "Kenny Tran",
          url: BASE_URL + "/about",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${BASE_URL}/blog/${slug}`,
        },
        image: article.image
          ? {
              "@type": "ImageObject",
              url: article.image,
              width: "1200",
              height: "630",
            }
          : undefined,
        keywords: extractKeywords(article.content),
        timeRequired: readingTimeISO,
        articleSection: "Design & Development",
      }),
    },
  };
}

// Helper function to extract keywords from content
function extractKeywords(content: string): string[] {
  // Common web development and design terms
  const commonTerms = ["design", "development", "web", "tutorial", "essay"];

  // Extract words that appear frequently in the content
  const words = content.toLowerCase().split(/\W+/);
  const wordFreq = new Map<string, number>();

  words.forEach((word) => {
    if (word.length > 3) {
      // Only consider words longer than 3 characters
      wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    }
  });

  // Get top 5 most frequent words
  const topWords = Array.from(wordFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);

  // Combine common terms with content-specific terms
  return [...new Set([...commonTerms, ...topWords])];
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
