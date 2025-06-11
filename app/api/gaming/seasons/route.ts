import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { ReadOperations } from "@/lib/db/read";
import { SeasonHistory } from "@/types/gaming";

export async function GET() {
  try {
    const db = client.db("kennyt");
    const readOps = new ReadOperations<SeasonHistory>(db, "mlbb_seasons");

    const seasons = await readOps.findMany(
      {},
      {
        projection: { _id: 0, period: 1, rank: 1, hero: 1, season: 1 },
        sort: { period: -1 }, // Sort by period in descending order
      },
    );

    return NextResponse.json(seasons);
  } catch (error) {
    console.error("Error fetching season history:", error);
    return NextResponse.json(
      { error: "Failed to fetch season history" },
      { status: 500 },
    );
  }
}
