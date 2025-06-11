import { ReadOperations } from "@/lib/db/read";
import client from "@/lib/mongodb";
import { Project } from "@/types/project";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = client.db("kennyt");
    const readOps = new ReadOperations<Project>(db, "projects");

    const projects = await readOps.findMany(
      {},
      {
        projection: { _id: 0, title: 1, link: 1 },
        sort: { title: -1 }, // Sort by title in descending order
      },
    );

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}
