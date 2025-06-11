import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { DeleteOperations } from "@/lib/db/delete";
import { TimelineEntry } from "@/types/timeline";

export async function DELETE() {
  try {
    const db = client.db("kennyt");
    const deleteOps = new DeleteOperations<TimelineEntry>(db, "timeline");

    const result = await deleteOps.deleteMany({});

    return NextResponse.json({
      message: "Timeline entries deleted successfully",
      count: result,
    });
  } catch (error) {
    console.error("Error deleting timeline entries:", error);
    return NextResponse.json(
      { error: "Failed to delete timeline entries" },
      { status: 500 },
    );
  }
}
