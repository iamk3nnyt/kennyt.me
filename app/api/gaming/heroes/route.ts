import { ReadOperations } from "@/lib/db/read";
import client from "@/lib/mongodb";
import { Hero } from "@/types/gaming";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = client.db("kennyt");
    const readOps = new ReadOperations<Hero>(db, "mlbb_heroes");

    const heroes = await readOps.findMany(
      {},
      {
        projection: { _id: 0, name: 1, role: 1, specialty: 1, image: 1 },
        sort: { order: 1 },
      },
    );

    return NextResponse.json(heroes);
  } catch (error) {
    console.error("Error fetching heroes:", error);
    return NextResponse.json(
      { error: "Failed to fetch heroes" },
      { status: 500 },
    );
  }
}
