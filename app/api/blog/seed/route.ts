import { CreateOperations } from "@/lib/db/create";
import { BaseDocument } from "@/lib/db/types";
import client from "@/lib/mongodb";
import { Article } from "@/types/blog";
import { NextResponse } from "next/server";

const seedPosts: Omit<Article, keyof BaseDocument>[] = [
  {
    slug: "building-a-type-safe-data-layer",
    title: "Building a Type-Safe Data Layer with MongoDB and TypeScript",
    excerpt:
      "Learn how to create a robust, type-safe data layer using MongoDB and TypeScript, ensuring type safety and better developer experience.",
    content: "Full content here...",
    date: new Date().toISOString(),
    featured: true,
    readTime: 8,
    tags: ["typescript", "mongodb", "database", "backend"],
    imageUrl: "/blog/data-layer.png",
  },
  {
    slug: "nextjs-loading-states",
    title: "Implementing Progressive Loading States in Next.js",
    excerpt:
      "A deep dive into implementing loading states in Next.js applications, focusing on user experience and performance optimization.",
    content: "Full content here...",
    date: new Date().toISOString(),
    featured: true,
    readTime: 6,
    tags: ["nextjs", "react", "frontend", "performance"],
    imageUrl: "/blog/loading-states.png",
  },
  {
    slug: "tailwind-css-best-practices",
    title: "Tailwind CSS Best Practices for Modern Web Applications",
    excerpt:
      "Explore best practices and patterns for using Tailwind CSS in modern web applications, from component design to responsive layouts.",
    content: "Full content here...",
    date: new Date().toISOString(),
    featured: false,
    readTime: 5,
    tags: ["tailwind", "css", "frontend", "design"],
    imageUrl: "/blog/tailwind.png",
  },
];

export async function POST() {
  try {
    const db = client.db("kennyt");
    const createOps = new CreateOperations<Article>(db, "blog_posts");

    // Clear existing posts
    await db.collection("blog_posts").deleteMany({});

    // Insert new posts
    const result = await createOps.createMany(seedPosts);

    return NextResponse.json({
      message: "Successfully seeded blog posts",
      count: result.length,
      posts: result,
    });
  } catch (error) {
    console.error("Error seeding blog posts:", error);
    return NextResponse.json(
      { error: "Failed to seed blog posts" },
      { status: 500 },
    );
  }
}
