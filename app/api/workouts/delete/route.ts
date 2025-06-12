import { deleteAllWorkouts } from "@/lib/data/workouts";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const result = await deleteAllWorkouts();

    return NextResponse.json({
      message: "Workouts deleted successfully",
      count: result,
    });
  } catch (error) {
    console.error("Error deleting workouts:", error);
    return NextResponse.json(
      { error: "Failed to delete workouts" },
      { status: 500 },
    );
  }
}
