import { seedRoomItems } from "@/lib/data/room";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    // Insert new items
    const result = await seedRoomItems();

    return NextResponse.json({
      message: "Successfully seeded room items",
      count: result.length,
      items: result,
    });
  } catch (error) {
    console.error("Error seeding room items:", error);
    return NextResponse.json(
      { error: "Failed to seed room items" },
      { status: 500 },
    );
  }
}
