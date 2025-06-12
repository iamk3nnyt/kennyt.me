import { deleteAllFeaturedArticles } from "@/lib/data/blog";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const result = await deleteAllFeaturedArticles();

    return NextResponse.json({
      message: "Successfully deleted all featured articles",
      count: result,
    });
  } catch (error) {
    console.error("Error deleting featured articles:", error);
    return NextResponse.json(
      { error: "Failed to delete featured articles" },
      { status: 500 },
    );
  }
}
