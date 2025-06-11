import { ReadOperations } from "@/lib/db/read";
import client from "@/lib/mongodb";
import { Article } from "@/types/blog";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const db = client.db("kennyt");
    const readOps = new ReadOperations<Article>(db, "blog_posts");

    const article = await readOps.findOne(
      { slug: params.slug },
      {
        projection: {
          _id: 1,
          slug: 1,
          title: 1,
          excerpt: 1,
          date: 1,
          content: 1,
          image: 1,
        },
      },
    );

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 },
    );
  }
}
