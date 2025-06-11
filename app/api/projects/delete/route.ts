import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { DeleteOperations } from "@/lib/db/delete";
import { Project } from "@/types/project";

export async function DELETE() {
  try {
    const db = client.db("kennyt");
    const deleteOps = new DeleteOperations<Project>(db, "projects");

    const result = await deleteOps.deleteMany({});

    return NextResponse.json({
      message: "Successfully deleted projects",
      count: result,
    });
  } catch (error) {
    console.error("Error deleting projects:", error);
    return NextResponse.json(
      { error: "Failed to delete projects" },
      { status: 500 },
    );
  }
}
