import { getHeroes } from "@/lib/data/gaming";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    // Insert new heroes
    const result = await getHeroes();

    return NextResponse.json({
      message: "Successfully seeded heroes",
      count: result.length,
      items: result,
    });
  } catch (error) {
    console.error("Error seeding heroes:", error);
    return NextResponse.json(
      { error: "Failed to seed heroes" },
      { status: 500 },
    );
  }
}
