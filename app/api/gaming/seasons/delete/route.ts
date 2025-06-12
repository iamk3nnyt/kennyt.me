import { DeleteOperations } from "@/lib/db/delete";
import client from "@/lib/mongodb";
import { SeasonHistory } from "@/types/gaming";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const db = client.db("kennyt");
    const deleteOps = new DeleteOperations<SeasonHistory>(db, "mlbb_seasons");

    const result = await deleteOps.deleteMany({});

    return NextResponse.json({
      message: "Successfully deleted season history",
      count: result,
    });
  } catch (error) {
    console.error("Error deleting season history:", error);
    return NextResponse.json(
      { error: "Failed to delete season history" },
      { status: 500 },
    );
  }
}
