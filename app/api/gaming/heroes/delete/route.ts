import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { DeleteOperations } from "@/lib/db/delete";
import { Hero } from "@/types/gaming";

export async function DELETE() {
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
