import { seedSeasonHistory } from "@/lib/data/gaming";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    // Insert new seasons
    const result = await seedSeasonHistory();

    return NextResponse.json({
      message: "Successfully seeded season history",
      count: result.length,
      items: result,
    });
  } catch (error) {
    console.error("Error seeding season history:", error);
    return NextResponse.json(
      { error: "Failed to seed season history" },
      { status: 500 },
    );
  }
}
