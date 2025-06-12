import { BASE_URL } from "@/constants";
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
