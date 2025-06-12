import { AppImage } from "@/components/app-image";
import { getArticles } from "@/lib/data/blog";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const posts = await getArticles();

  return {
    title: "Blog - Kenny Tran's Writings on Design & Development",
    description:
      "Explore my thoughts, tutorials, and stories on design, development, and the creative process. Here you'll find my latest articles and essays.",
    openGraph: {
      title: "Blog - Kenny Tran's Writings on Design & Development",
      description:
        "Explore my thoughts, tutorials, and stories on design, development, and the creative process. Here you'll find my latest articles and essays.",
      url: "/blog",
      type: "website",
      images: [
        {
          url: "/blog.png",
          width: 1200,
          height: 630,
          alt: "Kenny Tran's Blog - Design & Development",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog - Kenny Tran's Writings on Design & Development",
      description:
        "Explore my thoughts, tutorials, and stories on design, development, and the creative process. Here you'll find my latest articles and essays.",
      images: ["/blog.png"],
      creator: "@itsk3nny_",
    },
    alternates: {
      canonical: "/blog",
    },
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        headline: "Kenny Tran's Blog",
        description:
          "Explore my thoughts, tutorials, and stories on design, development, and the creative process. Here you'll find my latest articles and essays.",
        url: "https://www.kennyt.me/blog",
        inLanguage: "en-US",
        isAccessibleForFree: true,
        isFamilyFriendly: true,
        author: {
          "@type": "Person",
          name: "Kenny Tran",
          url: "https://www.kennyt.me/about",
        },
        publisher: {
          "@type": "Person",
          name: "Kenny Tran",
          url: "https://www.kennyt.me/about",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://www.kennyt.me/blog",
        },
        about: {
          "@type": "Thing",
          name: "Design & Development",
          description:
            "Articles and essays about design, development, and the creative process",
        },
        blogPosts: posts.map((post, index) => ({
          "@type": "BlogPosting",
          "@id": `https://www.kennyt.me/blog/${post.slug}`,
          headline: post.title,
          description: post.excerpt,
          articleBody: post.content,
          wordCount: post.content.split(/\s+/).length,
          datePublished: post.date,
          dateModified: post.date,
          inLanguage: "en-US",
          isAccessibleForFree: true,
          isFamilyFriendly: true,
          author: {
            "@type": "Person",
            name: "Kenny Tran",
            url: "https://www.kennyt.me/about",
          },
          publisher: {
            "@type": "Person",
            name: "Kenny Tran",
            url: "https://www.kennyt.me/about",
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://www.kennyt.me/blog/${post.slug}`,
          },
          image: post.image
            ? {
                "@type": "ImageObject",
                url: post.image,
                width: "1200",
                height: "630",
              }
            : undefined,
          position: index + 1,
          keywords: ["design", "development", "web", "tutorial", "essay"],
        })),
      }),
    },
  };
}

export default async function BlogPage() {
  const posts = await getArticles();

  return (
    <main className="bg-[#111113] px-4 pt-16 text-[#F3F3F3]">
      <section className="mx-auto mb-16 max-w-2xl">
        <h2 className="mb-6 text-xl font-semibold text-white">Writtings</h2>
        <p className="mb-8 text-[#B0B0B0]">
          Thoughts, tutorials, and stories on design, development, and the
          creative process. Here you&apos;ll find my latest articles and essays.
        </p>
      </section>

      <section className="mx-auto mb-16 max-w-2xl">
        <h2 className="mb-6 text-xl font-semibold text-white">Articles</h2>
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-[#232326] bg-[#18181B] p-8 text-center">
            <div className="mb-4 text-4xl">✍️</div>
            <h3 className="mb-2 text-lg font-medium text-white">
              No Articles Written
            </h3>
            <p className="text-sm text-[#B0B0B0]">
              My writing journey hasn&apos;t begun. I&apos;ll share my thoughts
              on design, development, and the creative process here, with each
              article bringing new insights.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-[#232326]">
            {posts.map((post) => (
              <li key={post.slug} className="flex items-center gap-2 py-2">
                <span className="relative size-5 shrink-0">
                  <AppImage
                    src="https://www.google.com/s2/favicons?domain=kennyt.me&sz=64"
                    alt={post.title + " favicon"}
                    className="h-full w-full"
                  />
                </span>
                <div className="flex-1">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-white hover:underline"
                  >
                    {post.title}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
