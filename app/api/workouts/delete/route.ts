import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { DeleteOperations } from "@/lib/db/delete";
import { WorkoutActivity } from "@/types/workout";

export async function DELETE() {
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
