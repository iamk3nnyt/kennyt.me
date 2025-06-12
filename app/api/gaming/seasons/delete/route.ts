import { deleteAllSeasonHistory } from "@/lib/data/gaming";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const result = await deleteAllSeasonHistory();

    return NextResponse.json({
      message: "Successfully deleted season history",
      count: result,
    });
  } catch (error) {
    console.error("Error deleting season history:", error);
    return NextResponse.json(
      { error: "Failed to delete season history" },
      { status: 500 },
    );
  }
}
