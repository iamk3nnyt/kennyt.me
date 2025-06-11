import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { DeleteOperations } from "@/lib/db/delete";
import { Bookmark } from "@/types/bookmark";

export async function DELETE() {
  try {
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
