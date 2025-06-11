import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Example static data for demonstration
const articles = [
  {
    slug: "crafting-design-system",
    title: "Crafting a design system for a multiplanetary future",
    date: "September 5, 2022",
    excerpt:
      "Most companies try to stay ahead of the curve when it comes to visual design. For Planetaria we needed to create a brand that would still inspire us 100 years from now when humanity has spread across our entire solar system.",
    content: `
      <p>Most companies try to stay ahead of the curve when it comes to visual design. For Planetaria we needed to create a brand that would still inspire us 100 years from now when humanity has spread across our entire solar system.</p>
      <h2>Why a Design System?</h2>
      <p>A design system is more than a set of UI components. It's a shared language for teams to build consistent, scalable products. For a multiplanetary future, this consistency is even more important.</p>
      <ul>
        <li>Unified branding across platforms</li>
        <li>Reusable components for rapid development</li>
        <li>Accessibility and performance at scale</li>
      </ul>
      <p>By investing in a robust design system, we ensure our products are ready for the challenges of tomorrow.</p>
    `,
    image: "/og.png",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const article = articles.find((a) => a.slug === slug);
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

  const article = articles.find((a) => a.slug === slug);
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
