import { DeleteOperations } from "@/lib/db/delete";
import client from "@/lib/mongodb";
import { Bookmark } from "@/types/bookmark";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    // Check for secret header
    const secret = request.headers.get("x-secret");
    if (secret !== process.env.SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const db = client.db("kennyt");
    const deleteOps = new DeleteOperations<Bookmark>(db, "bookmarks");

    const deletedCount = await deleteOps.deleteMany({});

    return NextResponse.json({
      message: "Successfully deleted all bookmarks",
      deletedCount,
    });
  } catch (error) {
    console.error("Error deleting bookmarks:", error);
    return NextResponse.json(
      { error: "Failed to delete bookmarks" },
      { status: 500 },
    );
  }
}
