import { ReadOperations } from "@/lib/db/read";
import client from "@/lib/mongodb";
import { BudgetStats } from "@/types/finance";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = client.db("kennyt");
    const readOps = new ReadOperations<BudgetStats>(db, "budget_stats");

    // Get current month and year
    const now = new Date();
    const currentMonth = now.toLocaleString("default", { month: "long" });
    const currentYear = now.getFullYear();

    const stats = await readOps.findOne(
      { month: currentMonth, year: currentYear },
      {
        projection: {
          _id: 0,
          totalBudget: 1,
          totalSpent: 1,
          remaining: 1,
          month: 1,
          year: 1,
          lastUpdated: 1,
        },
      },
    );

    if (!stats) {
      return NextResponse.json(
        {
          error: "No budget stats found for current month",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching budget stats:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch budget stats",
      },
      { status: 500 },
    );
  }
}
