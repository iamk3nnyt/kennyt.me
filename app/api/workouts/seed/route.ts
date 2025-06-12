import { CreateOperations } from "@/lib/db/create";
import { DeleteOperations } from "@/lib/db/delete";
import client from "@/lib/mongodb";
import { WorkoutActivity } from "@/types/workout";
import { NextResponse } from "next/server";

const seed = [
  {
    title: "Upper Body Strength",
    description:
      "Focused on chest, shoulders, and triceps with progressive overload",
    type: "strength",
    duration: "45 min",
    date: new Date().toISOString(),
    emoji: "💪",
  },
  {
    title: "Morning Run",
    description: "Steady state cardio with 5K distance",
    type: "cardio",
    duration: "30 min",
    date: new Date(Date.now() - 86400000).toISOString(), // yesterday
    emoji: "🏃",
  },
  {
    title: "Yoga Flow",
    description: "Full body stretching and flexibility routine",
    type: "flexibility",
    duration: "40 min",
    date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    emoji: "🧘",
  },
  {
    title: "Active Recovery",
    description: "Light walking and mobility exercises",
    type: "recovery",
    duration: "20 min",
    date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    emoji: "🚶",
  },
];

export async function POST(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const db = client.db("kennyt");
    const createOps = new CreateOperations<WorkoutActivity>(db, "workouts");
    const deleteOps = new DeleteOperations<WorkoutActivity>(db, "workouts");

    // Clear existing workouts
    await deleteOps.deleteMany({});

    // Insert new workouts
    const result = await createOps.createMany(seed);

    return NextResponse.json({
      success: true,
      count: result.length,
      workouts: result,
    });
  } catch (error) {
    console.error("Error seeding workouts:", error);
    return NextResponse.json(
      { error: "Failed to seed workouts" },
      { status: 500 },
    );
  }
}
