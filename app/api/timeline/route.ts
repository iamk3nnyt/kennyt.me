import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { ReadOperations } from "@/lib/db/read";
import { TimelineEntry } from "@/types/timeline";

export async function GET() {
  try {
    const db = client.db("kennyt");
    const readOps = new ReadOperations<TimelineEntry>(db, "timeline");

    const entries = await readOps.findMany(
      {},
      {
        projection: {
          _id: 0,
          company: 1,
          role: 1,
          period: 1,
          description: 1,
          startDate: 1,
          endDate: 1,
          location: 1,
          skills: 1,
          achievements: 1,
        },
        sort: { startDate: -1 }, // Sort by start date in descending order
      },
    );

    return NextResponse.json(entries);
  } catch (error) {
    console.error("Error fetching timeline entries:", error);
    return NextResponse.json(
      { error: "Failed to fetch timeline entries" },
      { status: 500 },
    );
  }
}
