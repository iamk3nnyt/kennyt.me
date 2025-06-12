import { DeleteOperations } from "@/lib/db/delete";
import client from "@/lib/mongodb";
import { Hero } from "@/types/gaming";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const db = client.db("kennyt");
    const deleteOps = new DeleteOperations<Hero>(db, "mlbb_heroes");

    const count = await deleteOps.deleteMany({});

    return NextResponse.json({
      message: "Heroes deleted successfully",
      count,
    });
  } catch (error) {
    console.error("Error deleting heroes:", error);
    return NextResponse.json(
      { error: "Failed to delete heroes" },
      { status: 500 },
    );
  }
}
