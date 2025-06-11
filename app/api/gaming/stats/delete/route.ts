import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { DeleteOperations } from "@/lib/db/delete";
import { MLBBStats } from "@/types/gaming";

export async function DELETE() {
  try {
    const db = client.db("kennyt");
    const deleteOps = new DeleteOperations<MLBBStats>(db, "mlbb_stats");

    const deletedCount = await deleteOps.deleteMany({});

    return NextResponse.json({
      message: "MLBB stats deleted successfully",
      deletedCount,
    });
  } catch (error) {
    console.error("Error deleting MLBB stats:", error);
    return NextResponse.json(
      {
        error: "Failed to delete MLBB stats",
      },
      { status: 500 },
    );
  }
}
