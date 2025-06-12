import { deleteAllBookmarks } from "@/lib/data/bookmarks";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const result = await deleteAllBookmarks();

    return NextResponse.json({
      message: "Successfully deleted all bookmarks",
      count: result,
    });
  } catch (error) {
    console.error("Error deleting bookmarks:", error);
    return NextResponse.json(
      { error: "Failed to delete bookmarks" },
      { status: 500 },
    );
  }
}
