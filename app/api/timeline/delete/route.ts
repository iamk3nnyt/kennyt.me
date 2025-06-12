import { deleteAllTimelineEntries } from "@/lib/data/timeline";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const result = await deleteAllTimelineEntries();

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
