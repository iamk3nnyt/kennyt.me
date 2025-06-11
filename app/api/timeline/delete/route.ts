import { DeleteOperations } from "@/lib/db/delete";
import client from "@/lib/mongodb";
import { TimelineEntry } from "@/types/timeline";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

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
