import { ReadOperations } from "@/lib/db/read";
import client from "@/lib/mongodb";
import { Bookmark } from "@/types/bookmark";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = client.db("kennyt");
    const readOps = new ReadOperations<Bookmark>(db, "bookmarks");

    const bookmarks = await readOps.findMany(
      {},
      {
        projection: { _id: 0, name: 1, url: 1, icon: 1 },
        sort: { name: 1 }, // Sort alphabetically by name
      },
    );

    return NextResponse.json(bookmarks);
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookmarks" },
      { status: 500 },
    );
  }
}
