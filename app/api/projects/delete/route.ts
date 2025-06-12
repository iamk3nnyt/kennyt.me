import { deleteAllProjects } from "@/lib/data/projects";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const result = await deleteAllProjects();

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
