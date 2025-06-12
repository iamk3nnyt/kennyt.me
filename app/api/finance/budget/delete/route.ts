import { DeleteOperations } from "@/lib/db/delete";
import client from "@/lib/mongodb";
import { BudgetStats } from "@/types/finance";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

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
