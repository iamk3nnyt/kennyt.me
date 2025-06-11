import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { ReadOperations } from "@/lib/db/read";
import { WorkoutActivity } from "@/types/workout";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    const db = client.db("kennyt");
    const readOps = new ReadOperations<WorkoutActivity>(db, "workouts");

    const query: Record<string, any> = {};
    if (type) {
      query.type = type;
    }
    if (month && year) {
      const date = new Date(parseInt(year), parseInt(month) - 1);
      const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
      const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      query.date = {
        $gte: startDate.toISOString(),
        $lte: endDate.toISOString(),
      };
    }

    const activities = await readOps.findMany(query, {
      projection: {
        _id: 1,
        title: 1,
        description: 1,
        type: 1,
        duration: 1,
        date: 1,
        emoji: 1,
      },
      sort: { date: -1 },
    });

    return NextResponse.json(activities);
  } catch (error) {
    console.error("Error fetching workout activities:", error);
    return NextResponse.json(
      { error: "Failed to fetch workout activities" },
      { status: 500 },
    );
  }
}
