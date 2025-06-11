import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { ReadOperations } from "@/lib/db/read";
import { MLBBStats } from "@/types/gaming";

export async function GET() {
  try {
    const db = client.db("kennyt");
    const readOps = new ReadOperations<MLBBStats>(db, "mlbb_stats");

    const stats = await readOps.findOne(
      {},
      {
        projection: { _id: 0, matches: 1, winRate: 1, mvp: 1, lastUpdated: 1 },
        sort: { lastUpdated: -1 }, // Get the most recent stats
      },
    );

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
