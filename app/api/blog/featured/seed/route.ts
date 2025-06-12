import { seedFeaturedArticles } from "@/lib/data/blog";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    // Insert new featured articles
    const result = await seedFeaturedArticles();

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
