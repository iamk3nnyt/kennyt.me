import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { CreateOperations } from "@/lib/db/create";
import { DeleteOperations } from "@/lib/db/delete";
import { Transaction } from "@/types/finance";
import { BaseDocument } from "@/lib/db/types";

const currentMonth = new Date().toLocaleString("default", { month: "long" });
const currentYear = new Date().getFullYear();

const seedTransactions: Omit<Transaction, keyof BaseDocument>[] = [
  {
    amount: -45.99,
    category: "Groceries",
    description: "Weekly grocery shopping at Whole Foods",
    date: new Date().toISOString().split("T")[0],
    type: "expense",
    month: currentMonth,
    year: currentYear,
  },
  {
    amount: 2500,
    category: "Salary",
    description: "Monthly salary deposit",
    date: new Date().toISOString().split("T")[0],
    type: "income",
    month: currentMonth,
    year: currentYear,
  },
  {
    amount: -29.99,
    category: "Entertainment",
    description: "Netflix subscription",
    date: new Date().toISOString().split("T")[0],
    type: "expense",
    month: currentMonth,
    year: currentYear,
  },
  {
    amount: -89.99,
    category: "Utilities",
    description: "Electricity bill",
    date: new Date().toISOString().split("T")[0],
    type: "expense",
    month: currentMonth,
    year: currentYear,
  },
  {
    amount: 150,
    category: "Freelance",
    description: "Website development project",
    date: new Date().toISOString().split("T")[0],
    type: "income",
    month: currentMonth,
    year: currentYear,
  },
];

export async function POST() {
  try {
    const db = client.db("kennyt");
    const createOps = new CreateOperations<Transaction>(db, "transactions");
    const deleteOps = new DeleteOperations<Transaction>(db, "transactions");

    // Clear existing transactions for current month
    await deleteOps.deleteMany({
      month: currentMonth,
      year: currentYear,
    } as Partial<Transaction>);

    // Insert new transactions
    const result = await createOps.createMany(seedTransactions);

    return NextResponse.json({
      message: "Transactions seeded successfully",
      count: result.length,
      transactions: result,
    });
  } catch (error) {
    console.error("Error seeding transactions:", error);
    return NextResponse.json(
      {
        error: "Failed to seed transactions",
      },
      { status: 500 },
    );
  }
}
