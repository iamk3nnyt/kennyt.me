import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { CreateOperations } from "@/lib/db/create";
import { TechStack } from "@/types/tech";

const seedTechStack: Omit<TechStack, keyof TechStack>[] = [
  { name: "Editor", value: "VS Code", order: 1 },
  { name: "Terminal", value: "Oh My Zsh", order: 2 },
  { name: "Framework", value: "Next.js", order: 3 },
  { name: "Language", value: "TypeScript", order: 4 },
  { name: "UI", value: "Tailwind CSS", order: 5 },
  { name: "Hosting", value: "Vercel", order: 6 },
  { name: "Version Control", value: "Git & GitHub", order: 7 },
  { name: "Database", value: "MongoDB", order: 8 },
];

export async function POST() {
  try {
    const db = client.db("kennyt");
    const createOps = new CreateOperations<TechStack>(db, "tech_stack");

    // Clear existing tech stack
    await db.collection("tech_stack").deleteMany({});

    // Insert new tech stack
    const result = await createOps.createMany(seedTechStack);

    return NextResponse.json({
      message: "Tech stack seeded successfully",
      count: result.length,
      techStack: result,
    });
  } catch (error) {
    console.error("Error seeding tech stack:", error);
    return NextResponse.json(
      { error: "Failed to seed tech stack" },
      { status: 500 },
    );
  }
}
