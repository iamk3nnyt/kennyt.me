import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { DeleteOperations } from "@/lib/db/delete";

export async function DELETE() {
  try {
    const db = client.db("kennyt");
    const deleteOps = new DeleteOperations(db, "blog_posts");

    const deletedCount = await deleteOps.deleteMany({ featured: true });

    return NextResponse.json({
      message: "Successfully deleted all featured articles",
      deletedCount,
    });
  } catch (error) {
    console.error("Error deleting featured articles:", error);
    return NextResponse.json(
      { error: "Failed to delete featured articles" },
      { status: 500 },
    );
  }
}
