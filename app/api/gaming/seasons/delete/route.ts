import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { DeleteOperations } from "@/lib/db/delete";
import { SeasonHistory } from "@/types/gaming";

export async function DELETE() {
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
