import client from "@/lib/mongodb";
import { NextResponse } from "next/server";

export interface SeasonHistory {
  period: string;
  rank: string;
  hero: string;
  season: string;
}

export async function GET() {
  try {
    const db = client.db("ktranish");
    const seasons = await db
      .collection("mlbb_seasons")
      .find({})
      .sort({ period: -1 })
      .toArray();

    return NextResponse.json(seasons);
  } catch (error) {
    console.error("Error fetching season history:", error);
    return NextResponse.json(
      { error: "Failed to fetch season history" },
      { status: 500 },
    );
  }
}
