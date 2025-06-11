import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { CreateOperations } from "@/lib/db/create";
import { SeasonHistory } from "@/types/gaming";
import { BaseDocument } from "@/lib/db/types";

const seedSeasons: Omit<SeasonHistory, keyof BaseDocument>[] = [
  {
    period: "2025/03 - 2025/06",
    rank: "Mythical Honor",
    hero: "Ling",
    season: "S36",
  },
  {
    period: "2024/12 - 2025/03",
    rank: "Legend III",
    hero: "Ling",
    season: "S35",
  },
  {
    period: "2024/09 - 2024/12",
    rank: "Mythic",
    hero: "Ling",
    season: "S34",
  },
  {
    period: "2024/06 - 2024/09",
    rank: "Mythical Glory",
    hero: "Natan",
    season: "S33",
  },
];

export async function POST() {
  try {
    const db = client.db("kennyt");
    const createOps = new CreateOperations<SeasonHistory>(db, "mlbb_seasons");

    // Clear existing seasons
    await db.collection("mlbb_seasons").deleteMany({});

    // Insert new seasons
    const result = await createOps.createMany(seedSeasons);

    return NextResponse.json({
      message: "Successfully seeded season history",
      count: result.length,
      seasons: result,
    });
  } catch (error) {
    console.error("Error seeding season history:", error);
    return NextResponse.json(
      { error: "Failed to seed season history" },
      { status: 500 },
    );
  }
}
