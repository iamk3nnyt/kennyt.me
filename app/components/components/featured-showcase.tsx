import { ComponentShowcase } from "@/components/component-showcase";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function FeaturedShowcase() {
  const posts = [
    {
      title: "Building a Modern Web Application",
      slug: "building-modern-web-app",
      date: "2024-03-15",
      excerpt:
        "A comprehensive guide to building modern web applications using Next.js, React, and TypeScript. Learn about best practices, performance optimization, and deployment strategies.",
      tag: "Web Development",
    },
    {
      title: "The Art of UI Design",
      slug: "art-of-ui-design",
      date: "2024-03-10",
      excerpt:
        "Exploring the principles of UI design and how to create beautiful, functional interfaces that users love. From color theory to typography and layout.",
      tag: "UI Design",
    },
    {
      title: "Mastering TypeScript",
      slug: "mastering-typescript",
      date: "2024-03-05",
      excerpt:
        "Deep dive into TypeScript features and how to leverage them to write more maintainable and type-safe code. Advanced patterns and real-world examples.",
      tag: "TypeScript",
    },
  ];

  return (
    <ComponentShowcase
      title="Featured"
      description="A component for displaying featured articles with titles, dates, excerpts, and read more links."
      demo={
        <div className="sm:p-4">
          <div className="divide-y divide-[#232326]">
            {posts.map((post, index) => (
              <article key={post.slug} className={cn(index ? "py-6" : "pb-6")}>
                {post.tag && (
                  <div className="mb-3 inline-block rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                    {post.tag}
                  </div>
                )}
                <h3 className="mb-1 text-2xl font-semibold text-white">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                <time className="mb-2 block text-xs text-[#88888C]">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <p className="mb-2 text-[#B0B0B0]">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block text-sm text-blue-400 transition hover:text-blue-300"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      }
      code={`import { getFeaturedArticles } from "@/lib/data/blog";
import { cn } from "@/lib/utils";
import Link from "next/link";

async function Featured() {
  const posts = await getFeaturedArticles();

  return (
    <section className="mx-auto mb-16 max-w-2xl">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Featured articles
      </h2>
      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-[#232326] bg-[#18181B] p-8 text-center">
          <div className="mb-4 text-4xl">📝</div>
          <h3 className="mb-2 text-lg font-medium text-white">
            No Featured Articles
          </h3>
          <p className="text-sm text-[#B0B0B0]">
            My featured articles haven&apos;t been selected yet. I&apos;ll share
            my best thoughts on design, development, and the creative process
            here, with each article bringing new insights.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-[#232326]">
          {posts.map((post, index) => (
            <article key={post.slug} className={cn(index ? "py-6" : "pb-6")}>
              <h3 className="mb-1 text-2xl font-semibold text-white">
                <Link href={\`/blog/\${post.slug}\`} className="hover:underline">
                  {post.title}
                </Link>
              </h3>
              <time className="mb-2 block text-xs text-[#88888C]">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <p className="mb-2 text-[#B0B0B0]">{post.excerpt}</p>
              <Link
                href={\`/blog/\${post.slug}\`}
                className="inline-block text-sm text-blue-400 transition hover:text-blue-300"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}`}
    />
  );
}
