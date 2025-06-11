import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { ReadOperations } from "@/lib/db/read";
import { Transaction } from "@/types/finance";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    const db = client.db("kennyt");
    const readOps = new ReadOperations<Transaction>(db, "transactions");

    const query: Record<string, any> = {};
    if (month && year) {
      query.month = parseInt(month);
      query.year = parseInt(year);
    }

    const transactions = await readOps.findMany(query, {
      projection: {
        _id: 1,
        amount: 1,
        category: 1,
        description: 1,
        date: 1,
        type: 1,
        month: 1,
        year: 1,
      },
      sort: { date: -1 },
    });

    return NextResponse.json({ transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 },
    );
  }
}
