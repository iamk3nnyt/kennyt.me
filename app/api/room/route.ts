import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { ReadOperations } from "@/lib/db/read";
import { RoomItem } from "@/types/room";

export async function GET() {
  try {
    const db = client.db("kennyt");
    const readOps = new ReadOperations<RoomItem>(db, "room_items");

    const items = await readOps.findMany(
      {},
      {
        projection: { _id: 0, name: 1, category: 1 },
        sort: { category: 1, order: 1 },
      },
    );

    // Group items by category
    const categories = items.reduce(
      (acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      },
      {} as Record<string, RoomItem[]>,
    );

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching room setup:", error);
    return NextResponse.json(
      { error: "Failed to fetch room setup" },
      { status: 500 },
    );
  }
}
