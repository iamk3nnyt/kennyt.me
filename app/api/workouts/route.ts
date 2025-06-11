import client from "@/lib/mongodb";
import { NextResponse } from "next/server";

export interface WorkoutActivity {
  date: Date;
  emoji: string;
  title: string;
  description: string;
  duration: string;
  type: "strength" | "cardio" | "flexibility" | "recovery";
}

export async function GET() {
  try {
    const db = client.db("ktranish");
    const collection = db.collection<WorkoutActivity>("workouts");

    const workouts = await collection.find({}).sort({ date: -1 }).toArray();

    return NextResponse.json(workouts);
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return NextResponse.json(
      { error: "Failed to fetch workouts" },
      { status: 500 },
    );
  }
}
