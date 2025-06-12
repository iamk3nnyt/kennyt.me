import { seedArticles } from "@/lib/data/blog";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    // Insert new posts
    const result = await seedArticles();

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
