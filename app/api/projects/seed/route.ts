import { CreateOperations } from "@/lib/db/create";
import { BaseDocument } from "@/lib/db/types";
import client from "@/lib/mongodb";
import { Project } from "@/types/project";
import { NextResponse } from "next/server";

const seedProjects: Omit<Project, keyof BaseDocument>[] = [
  {
    title: "Company Website",
    link: "https://www.ketryon.com/",
  },
  {
    title: "Personal Website",
    link: "https://www.kennyt.me/",
  },
];

export async function POST() {
  try {
    const db = client.db("kennyt");
    const createOps = new CreateOperations<Project>(db, "projects");

    // Clear existing projects
    await db.collection("projects").deleteMany({});

    // Insert new projects
    const result = await createOps.createMany(seedProjects);

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
