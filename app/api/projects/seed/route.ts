import { seedProjects } from "@/lib/data/projects";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    // Insert new projects
    const result = await seedProjects();

    return NextResponse.json({
      message: "Successfully seeded projects",
      count: result.length,
      projects: result,
    });
  } catch (error) {
    console.error("Error seeding projects:", error);
    return NextResponse.json(
      { error: "Failed to seed projects" },
      { status: 500 },
    );
  }
}
