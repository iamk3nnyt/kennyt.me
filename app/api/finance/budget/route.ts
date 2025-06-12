import { NextResponse } from "next/server";
import {
  getTotalIncome,
  getTotalExpenses,
  getNetIncome,
  getCategoryTotals,
  getTransactionsByDateRange,
} from "@/lib/data/finance";

export async function GET() {
  try {
    // Get current month's start and end dates
    const now = new Date();
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
    ).toISOString();
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
    ).toISOString();

    // Get current month and year for display
    const currentMonth = now.toLocaleString("default", { month: "long" });
    const currentYear = now.getFullYear();

    // Calculate budget stats using aggregation methods
    const [totalIncome, totalExpenses, netIncome, categoryTotals] =
      await Promise.all([
        getTotalIncome(startOfMonth, endOfMonth),
        getTotalExpenses(startOfMonth, endOfMonth),
        getNetIncome(startOfMonth, endOfMonth),
        getCategoryTotals(startOfMonth, endOfMonth),
      ]);

    // Get all transactions for the current month
    const monthlyTransactions = await getTransactionsByDateRange(
      startOfMonth,
      endOfMonth,
    );

    // Calculate remaining budget (assuming totalIncome is the budget)
    const remaining = totalIncome - totalExpenses;

    // Prepare the response
    const stats = {
      totalBudget: totalIncome,
      totalSpent: totalExpenses,
      remaining,
      netIncome,
      month: currentMonth,
      year: currentYear,
      lastUpdated: new Date().toISOString(),
      categoryTotals,
      transactionCount: monthlyTransactions.length,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error calculating budget stats:", error);
    return NextResponse.json(
      {
        error: "Failed to calculate budget stats",
      },
      { status: 500 },
    );
  }
}
