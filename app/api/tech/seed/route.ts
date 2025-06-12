import { seedTechStack } from "@/lib/data/tech";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    // Insert new items
    const result = await seedTechStack();

    return NextResponse.json({
      message: "Successfully seeded tech stack entries",
      count: result.length,
    });
  } catch (error) {
    console.error("Error seeding tech stack:", error);
    return NextResponse.json(
      { error: "Failed to seed tech stack" },
      { status: 500 },
    );
  }
}
