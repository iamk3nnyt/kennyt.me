import { seedMLBBStats } from "@/lib/data/gaming";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    // Insert new stats
    const result = await seedMLBBStats();

    return NextResponse.json({
      message: "Successfully seeded MLBB stats",
      items: result,
    });
  } catch (error) {
    console.error("Error seeding MLBB stats:", error);
    return NextResponse.json(
      {
        error: "Failed to seed MLBB stats",
      },
      { status: 500 },
    );
  }
}
