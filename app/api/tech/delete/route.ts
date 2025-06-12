import { DeleteOperations } from "@/lib/db/delete";
import client from "@/lib/mongodb";
import { TechStack } from "@/types/tech";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const db = client.db("kennyt");
    const deleteOps = new DeleteOperations<TechStack>(db, "tech_stack");

    const result = await deleteOps.deleteMany({});

    return NextResponse.json({
      message: "Tech stack deleted successfully",
      count: result,
    });
  } catch (error) {
    console.error("Error deleting tech stack:", error);
    return NextResponse.json(
      { error: "Failed to delete tech stack" },
      { status: 500 },
    );
  }
}
