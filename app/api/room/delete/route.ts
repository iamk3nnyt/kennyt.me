import { DeleteOperations } from "@/lib/db/delete";
import client from "@/lib/mongodb";
import { RoomItem } from "@/types/room";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

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
