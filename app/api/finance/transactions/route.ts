import client from "@/lib/mongodb";
import { NextResponse } from "next/server";

export interface Transaction {
  date: string;
  category: string;
  description: string;
  amount: number;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get("cursor");
    const limit = 10;

    const db = client.db("ktranish");
    const collection = db.collection<Transaction>("finance_transactions");

    const transactions = await collection
      .find({})
      .sort({ date: -1 })
      .limit(limit + 1)
      .toArray();

    const hasMore = transactions.length > limit;
    const nextCursor = hasMore ? transactions[limit - 1].date : null;
    const items = hasMore ? transactions.slice(0, limit) : transactions;

    return NextResponse.json({
      transactions: items,
      nextCursor,
      hasMore,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 },
    );
  }
}
