import { DeleteOperations } from "@/lib/db/delete";
import client from "@/lib/mongodb";
import { WorkoutActivity } from "@/types/workout";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const db = client.db("kennyt");
    const deleteOps = new DeleteOperations<WorkoutActivity>(db, "workouts");

    const result = await deleteOps.deleteMany({});

    return NextResponse.json({
      success: true,
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
