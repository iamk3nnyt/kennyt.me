import { seedTimelineEntries } from "@/lib/data/timeline";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const result = await seedTimelineEntries();

    return NextResponse.json({
      message: "Successfully seeded timeline entries",
      count: result.length,
      entries: result,
    });
  } catch (error) {
    console.error("Error seeding timeline:", error);
    return NextResponse.json(
      { error: "Failed to seed timeline" },
      { status: 500 },
    );
  }
}
