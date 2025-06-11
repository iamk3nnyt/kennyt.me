import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { DeleteOperations } from "@/lib/db/delete";
import { TechStack } from "@/types/tech";

export async function DELETE() {
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
