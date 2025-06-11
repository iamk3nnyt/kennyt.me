import client from "@/lib/mongodb";
import { NextResponse } from "next/server";

export interface BlogPost {
  slug: string;
  title: string;
}

export async function GET() {
  try {
    const db = client.db("ktranish");
    const posts = await db
      .collection("blog_posts")
      .find({})
      .sort({ date: -1 })
      .toArray();

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 },
    );
  }
}
