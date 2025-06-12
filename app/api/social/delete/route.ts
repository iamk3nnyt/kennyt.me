import { DeleteOperations } from "@/lib/db/delete";
import client from "@/lib/mongodb";
import { SocialLink } from "@/types/social";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

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
