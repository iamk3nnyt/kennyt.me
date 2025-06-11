import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { CreateOperations } from "@/lib/db/create";
import { DeleteOperations } from "@/lib/db/delete";
import { BudgetStats } from "@/types/finance";
import { BaseDocument } from "@/lib/db/types";

const currentMonth = new Date().toLocaleString("default", { month: "long" });
const currentYear = new Date().getFullYear();

const seedStats: Omit<BudgetStats, keyof BaseDocument> = {
  totalBudget: 2500,
  totalSpent: 1875,
  remaining: 625,
  month: currentMonth,
  year: currentYear,
  lastUpdated: new Date(),
};

export async function POST() {
  try {
    const db = client.db("kennyt");
    const createOps = new CreateOperations<BudgetStats>(db, "budget_stats");
    const deleteOps = new DeleteOperations<BudgetStats>(db, "budget_stats");

    // Clear existing stats for current month
    await deleteOps.deleteMany({
      month: currentMonth,
      year: currentYear,
    } as Partial<BudgetStats>);

    // Insert new stats
    const result = await createOps.createOne(seedStats);

    return NextResponse.json({
      message: "Budget stats seeded successfully",
      stats: result,
    });
  } catch (error) {
    console.error("Error seeding budget stats:", error);
    return NextResponse.json(
      {
        error: "Failed to seed budget stats",
      },
      { status: 500 },
    );
  }
}
