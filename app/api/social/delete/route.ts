import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { DeleteOperations } from "@/lib/db/delete";
import { SocialLink } from "@/types/social";

export async function DELETE() {
  try {
    const db = client.db("kennyt");
    const deleteOps = new DeleteOperations<SocialLink>(db, "social_links");

    const result = await deleteOps.deleteMany({});

    return NextResponse.json({
      message: "Social links deleted successfully",
      count: result,
    });
  } catch (error) {
    console.error("Error deleting social links:", error);
    return NextResponse.json(
      { error: "Failed to delete social links" },
      { status: 500 },
    );
  }
}
