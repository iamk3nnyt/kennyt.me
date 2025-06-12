import { DeleteOperations } from "@/lib/db/delete";
import client from "@/lib/mongodb";
import { Project } from "@/types/project";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

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
