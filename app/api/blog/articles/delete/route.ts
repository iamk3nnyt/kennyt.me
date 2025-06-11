import { DeleteOperations } from "@/lib/db/delete";
import client from "@/lib/mongodb";
import { Article } from "@/types/blog";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const db = client.db("kennyt");
    const deleteOps = new DeleteOperations<Article>(db, "blog_posts");

    const result = await deleteOps.deleteMany({});

    return NextResponse.json({
      success: true,
      count: result,
    });
  } catch (error) {
    console.error("Error deleting articles:", error);
    return NextResponse.json(
      { error: "Failed to delete articles" },
      { status: 500 },
    );
  }
}
