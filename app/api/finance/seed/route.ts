import client from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const mockTransactions = [
  {
    date: "2024-06-01",
    category: "Groceries",
    description: "Supermarket shopping",
    amount: -120.5,
  },
  {
    date: "2024-06-02",
    category: "Salary",
    description: "Monthly salary",
    amount: 2000,
  },
  {
    date: "2024-06-03",
    category: "Utilities",
    description: "Electricity bill",
    amount: -60,
  },
  {
    date: "2024-06-04",
    category: "Dining",
    description: "Dinner with friends",
    amount: -45.75,
  },
  {
    date: "2024-06-05",
    category: "Transport",
    description: "Monthly metro pass",
    amount: -50,
  },
  {
    date: "2024-06-06",
    category: "Freelance",
    description: "Side project payment",
    amount: 300,
  },
];

export async function GET() {
  try {
    const db = client.db("ktranish");
    const collection = db.collection("finance_transactions");
    await collection.deleteMany({}); // Clear existing for repeatable seed
    await collection.insertMany(mockTransactions);
    return NextResponse.json({ message: "Seeded transactions successfully." });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
