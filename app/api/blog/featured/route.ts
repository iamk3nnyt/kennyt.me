import { ReadOperations } from "@/lib/db/read";
import client from "@/lib/mongodb";
import { FeaturedArticle } from "@/types/blog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = client.db("kennyt");
    const readOps = new ReadOperations<FeaturedArticle>(db, "articles");

    // Get featured articles, sorted by date
    const featuredArticles = await readOps.findMany(
      { featured: true },
      {
        projection: { _id: 0, slug: 1, title: 1, excerpt: 1, date: 1 },
        sort: { date: -1 },
      },
    );

    return NextResponse.json(featuredArticles);
  } catch (error) {
    console.error("Error fetching featured articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured articles" },
      { status: 500 },
    );
  }
}
