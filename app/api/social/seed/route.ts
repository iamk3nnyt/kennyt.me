import { seedSocialLinks } from "@/lib/data/social";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    // Insert new links
    const result = await seedSocialLinks();

    return NextResponse.json({
      message: "Successfully seeded social links",
      count: result.length,
      items: result,
    });
  } catch (error) {
    console.error("Error seeding social links:", error);
    return NextResponse.json(
      { error: "Failed to seed social links" },
      { status: 500 },
    );
  }
}
