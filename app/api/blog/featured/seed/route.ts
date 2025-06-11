import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { CreateOperations } from "@/lib/db/create";
import { FeaturedArticle } from "@/types/blog";
import { BaseDocument } from "@/lib/db/types";

const seedArticles: Omit<FeaturedArticle, keyof BaseDocument>[] = [
  {
    slug: "building-modern-web-apps",
    title: "Building Modern Web Applications",
    excerpt:
      "A comprehensive guide to building scalable and performant web applications using Next.js, TypeScript, and MongoDB.",
    date: new Date("2024-01-15"),
    featured: true,
  },
  {
    slug: "mastering-typescript",
    title: "Mastering TypeScript: From Basics to Advanced",
    excerpt:
      "Learn how to leverage TypeScript's type system to write more maintainable and robust code.",
    date: new Date("2024-01-10"),
    featured: true,
  },
  {
    slug: "design-systems",
    title: "Creating Effective Design Systems",
    excerpt:
      "Explore the principles and practices of building design systems that scale with your product.",
    date: new Date("2024-01-05"),
    featured: true,
  },
];

export async function POST() {
  try {
    const db = client.db("kennyt");
    const createOps = new CreateOperations<FeaturedArticle>(db, "blog_posts");

    // Clear existing featured articles
    await db.collection("blog_posts").deleteMany({ featured: true });

    // Insert new featured articles
    const result = await createOps.createMany(seedArticles);

    return NextResponse.json({
      message: "Successfully seeded featured articles",
      count: result.length,
      articles: result,
    });
  } catch (error) {
    console.error("Error seeding featured articles:", error);
    return NextResponse.json(
      { error: "Failed to seed featured articles" },
      { status: 500 },
    );
  }
}
