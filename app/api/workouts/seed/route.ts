import { seedWorkouts } from "@/lib/data/workouts";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    // Insert new workouts
    const result = await seedWorkouts();

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
