"use client";

import type { BlogPost } from "@/app/api/blog/route";
import { AppImage } from "@/components/app-image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog");
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-2 py-2">
                <div className="shimmer size-5 shrink-0 rounded" />
                <div className="shimmer h-5 w-full rounded" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
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
