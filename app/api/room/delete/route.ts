import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { DeleteOperations } from "@/lib/db/delete";
import { RoomItem } from "@/types/room";

export async function DELETE() {
  try {
    const db = client.db("kennyt");
    const deleteOps = new DeleteOperations<RoomItem>(db, "room_items");

    const result = await deleteOps.deleteMany({});

    return NextResponse.json({
      message: "Room setup deleted successfully",
      count: result,
    });
  } catch (error) {
    console.error("Error deleting room setup:", error);
    return NextResponse.json(
      { error: "Failed to delete room setup" },
      { status: 500 },
    );
  }
}
