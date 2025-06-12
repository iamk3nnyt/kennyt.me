import { CreateOperations } from "@/lib/db/create";
import { DeleteOperations } from "@/lib/db/delete";
import client from "@/lib/mongodb";
import { TechStack } from "@/types/tech";
import { NextResponse } from "next/server";

const seed = [
  { name: "Editor", value: "VS Code", order: 1 },
  { name: "Terminal", value: "Oh My Zsh", order: 2 },
  { name: "Framework", value: "Next.js", order: 3 },
  { name: "Language", value: "TypeScript", order: 4 },
  { name: "UI", value: "Tailwind CSS", order: 5 },
  { name: "Hosting", value: "Vercel", order: 6 },
  { name: "Version Control", value: "Git & GitHub", order: 7 },
  { name: "Database", value: "MongoDB", order: 8 },
];

export async function POST(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const db = client.db("kennyt");
    const createOps = new CreateOperations<TechStack>(db, "tech_stack");
    const deleteOps = new DeleteOperations<TechStack>(db, "tech_stack");

    // Clear existing items
    await deleteOps.deleteMany({});

    // Insert new items
    const result = await createOps.createMany(seed);

    return NextResponse.json({
      message: "Tech stack seeded successfully",
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
