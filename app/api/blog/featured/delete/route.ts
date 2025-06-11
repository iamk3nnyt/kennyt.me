import { DeleteOperations } from "@/lib/db/delete";
import client from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    // Check for secret header
    const secret = request.headers.get("x-secret");
    if (secret !== process.env.SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const db = client.db("kennyt");
    const deleteOps = new DeleteOperations(db, "articles");

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
