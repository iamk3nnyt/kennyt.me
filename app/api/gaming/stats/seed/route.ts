import { CreateOperations } from "@/lib/db/create";
import { DeleteOperations } from "@/lib/db/delete";
import client from "@/lib/mongodb";
import { MLBBStats } from "@/types/gaming";
import { NextResponse } from "next/server";

const seed = {
  matches: 3525,
  winRate: 51.04,
  mvp: 253,
  lastUpdated: new Date(),
};

export async function POST(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const db = client.db("kennyt");
    const createOps = new CreateOperations<MLBBStats>(db, "mlbb_stats");
    const deleteOps = new DeleteOperations<MLBBStats>(db, "mlbb_stats");

    // Clear existing stats
    await deleteOps.deleteMany({});

    // Insert new stats
    const result = await createOps.createOne(seed);

    return NextResponse.json({
      message: "MLBB stats seeded successfully",
      stats: result,
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
