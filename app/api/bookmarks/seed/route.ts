import { seedBookmarks } from "@/lib/data/bookmarks";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    // Insert new bookmarks
    const result = await seedBookmarks();

    return NextResponse.json({
      message: "Successfully seeded bookmarks",
      count: result.length,
      bookmarks: result,
    });
  } catch (error) {
    console.error("Error seeding bookmarks:", error);
    return NextResponse.json(
      { error: "Failed to seed bookmarks" },
      { status: 500 },
    );
  }
}
