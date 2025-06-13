import { BASE_URL } from "@/constants";
import type { Metadata } from "next";

// Base metadata interface that all page types will extend
interface BaseMetadata {
  title: string;
  description: string;
  path: string;
  image?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
}

// Blog article specific metadata
interface BlogArticleMetadata extends BaseMetadata {
  type: "article";
  publishedTime: string;
  modifiedTime: string;
  author: string;
  wordCount: number;
  readingTime: string;
  keywords: string[];
}

// Blog index page metadata
interface BlogIndexMetadata extends BaseMetadata {
  type: "blog";
  posts: Array<{
    title: string;
    slug: string;
    excerpt: string;
    date: string;
    image?: string;
  }>;
}

// Project page metadata
interface ProjectMetadata extends BaseMetadata {
  type: "project";
}

// Component page metadata
interface ComponentMetadata extends BaseMetadata {
  type: "component";
}

// About page metadata
interface AboutMetadata extends BaseMetadata {
  type: "profile";
  jobTitle: string;
  worksFor?: {
    name: string;
    url: string;
    description: string;
    sameAs: string[];
  };
}

// Gaming page metadata
interface GamingMetadata extends BaseMetadata {
  type: "gaming";
  game: {
    name: string;
    genre: string;
    publisher: string;
    url: string;
  };
}

// Finance page metadata
interface FinanceMetadata extends BaseMetadata {
  type: "finance";
  category: string;
}

// Workout page metadata
interface WorkoutMetadata extends BaseMetadata {
  type: "workout";
}

// Union type of all possible metadata types
type PageMetadata =
  | BlogArticleMetadata
  | BlogIndexMetadata
  | ProjectMetadata
  | ComponentMetadata
  | AboutMetadata
  | GamingMetadata
  | FinanceMetadata
  | WorkoutMetadata;

// Helper function to generate schema.org JSON-LD
function generateSchemaOrg(metadata: PageMetadata) {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": metadata.type === "article" ? "BlogPosting" : "WebPage",
    name: metadata.title,
    description: metadata.description,
    url: `${BASE_URL}${metadata.path}`,
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
      "@id": `${BASE_URL}${metadata.path}`,
    },
  };

  // Add type-specific schema properties
  switch (metadata.type) {
    case "article":
      return {
        ...baseSchema,
        "@type": "BlogPosting",
        headline: metadata.title,
        articleBody: metadata.description,
        wordCount: metadata.wordCount,
        datePublished: metadata.publishedTime,
        dateModified: metadata.modifiedTime,
        keywords: metadata.keywords,
        timeRequired: metadata.readingTime,
        articleSection: "Design & Development",
        image: metadata.image
          ? {
              "@type": "ImageObject",
              url: metadata.image.url,
              width: metadata.image.width,
              height: metadata.image.height,
            }
          : undefined,
      };
    case "blog":
      return {
        ...baseSchema,
        "@type": "Blog",
        blogPosts: metadata.posts.map((post, index) => ({
          "@type": "BlogPosting",
          "@id": `${BASE_URL}/blog/${post.slug}`,
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          dateModified: post.date,
          image: post.image
            ? {
                "@type": "ImageObject",
                url: post.image,
                width: 1200,
                height: 630,
              }
            : undefined,
          position: index + 1,
        })),
      };
    case "profile":
      return {
        ...baseSchema,
        "@type": "Person",
        jobTitle: metadata.jobTitle,
        worksFor: metadata.worksFor
          ? {
              "@type": "Organization",
              name: metadata.worksFor.name,
              url: metadata.worksFor.url,
              description: metadata.worksFor.description,
              sameAs: metadata.worksFor.sameAs,
            }
          : undefined,
      };
    case "gaming":
      return {
        ...baseSchema,
        about: {
          "@type": "Game",
          name: metadata.game.name,
          genre: metadata.game.genre,
          publisher: metadata.game.publisher,
          url: metadata.game.url,
        },
      };
    case "finance":
      return {
        ...baseSchema,
        about: {
          "@type": "FinancialProduct",
          name: metadata.title,
          category: metadata.category,
          provider: {
            "@type": "Person",
            name: "Kenny Tran",
            url: BASE_URL + "/about",
          },
        },
      };
    default:
      return baseSchema;
  }
}

// Main metadata builder function
export function buildMetadata(metadata: PageMetadata): Metadata {
  const defaultImage = {
    url: "/og.png",
    width: 1200,
    height: 630,
    alt: metadata.title,
  };

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: metadata.path,
      type: metadata.type === "article" ? "article" : "website",
      ...(metadata.type === "article" && {
        publishedTime: (metadata as BlogArticleMetadata).publishedTime,
        modifiedTime: (metadata as BlogArticleMetadata).modifiedTime,
        authors: ["Kenny Tran"],
      }),
      images: [metadata.image || defaultImage],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: [metadata.image?.url || defaultImage.url],
      creator: "@itsk3nny_",
    },
    alternates: {
      canonical: metadata.path,
    },
    other: {
      "application/ld+json": JSON.stringify(generateSchemaOrg(metadata)),
    },
  };
}

// Helper function to extract keywords from content
export function extractKeywords(content: string): string[] {
  const commonTerms = ["design", "development", "web", "tutorial", "essay"];
  const words = content.toLowerCase().split(/\W+/);
  const wordFreq = new Map<string, number>();

  words.forEach((word) => {
    if (word.length > 3) {
      wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    }
  });

  const topWords = Array.from(wordFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);

  return [...new Set([...commonTerms, ...topWords])];
}
