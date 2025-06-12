import { getMLBBStats } from "@/lib/data/gaming";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const stats = await getMLBBStats();

    if (!stats) {
      return NextResponse.json(
        {
          error: "No stats found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching MLBB stats:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch MLBB stats",
      },
      { status: 500 },
    );
  }
}
