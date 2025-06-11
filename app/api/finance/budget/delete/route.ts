import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { DeleteOperations } from "@/lib/db/delete";
import { BudgetStats } from "@/types/finance";

export async function DELETE() {
  try {
    const db = client.db("kennyt");
    const deleteOps = new DeleteOperations<BudgetStats>(db, "budget_stats");

    const deletedCount = await deleteOps.deleteMany({});

    return NextResponse.json({
      message: "Budget stats deleted successfully",
      deletedCount,
    });
  } catch (error) {
    console.error("Error deleting budget stats:", error);
    return NextResponse.json(
      {
        error: "Failed to delete budget stats",
      },
      { status: 500 },
    );
  }
}
