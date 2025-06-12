import { CreateOperations } from "@/lib/db/create";
import { DeleteOperations } from "@/lib/db/delete";
import client from "@/lib/mongodb";
import { Project } from "@/types/project";
import { NextResponse } from "next/server";

const seed = [
  {
    title: "Company Website",
    link: "https://www.ketryon.com/",
  },
  {
    title: "Personal Website",
    link: "https://www.kennyt.me/",
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
    const createOps = new CreateOperations<Project>(db, "projects");
    const deleteOps = new DeleteOperations<Project>(db, "projects");

    // Clear existing projects
    await deleteOps.deleteMany({});

    // Insert new projects
    const result = await createOps.createMany(seed);

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
