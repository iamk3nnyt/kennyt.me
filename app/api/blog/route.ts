import { ReadOperations } from "@/lib/db/read";
import client from "@/lib/mongodb";
import { Article } from "@/types/blog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = client.db("kennyt");
    const readOps = new ReadOperations<Article>(db, "blog_posts");

    const posts = await readOps.findMany(
      {},
      {
        projection: {
          _id: 0,
          slug: 1,
          title: 1,
          excerpt: 1,
          date: 1,
          readTime: 1,
          tags: 1,
        },
        sort: { date: -1 }, // Sort by date in descending order
      },
    );

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 },
    );
  }
}
