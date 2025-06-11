import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { ReadOperations } from "@/lib/db/read";
import { TechStack } from "@/types/tech";

export async function GET() {
  try {
    const db = client.db("kennyt");
    const readOps = new ReadOperations<TechStack>(db, "tech_stack");

    const techStack = await readOps.findMany(
      {},
      {
        projection: { _id: 0, name: 1, value: 1 },
        sort: { order: 1 },
      },
    );

    return NextResponse.json(techStack);
  } catch (error) {
    console.error("Error fetching tech stack:", error);
    return NextResponse.json(
      { error: "Failed to fetch tech stack" },
      { status: 500 },
    );
  }
}
