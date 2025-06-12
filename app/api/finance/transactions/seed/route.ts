import { seedTransactions } from "@/lib/data/finance";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    // Insert new transactions
    const result = await seedTransactions();

    return NextResponse.json({
      message: "Successfully seeded transactions",
      count: result.length,
      items: result,
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
