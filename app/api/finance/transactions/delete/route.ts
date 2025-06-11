import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { DeleteOperations } from "@/lib/db/delete";
import { Transaction } from "@/types/finance";

export async function DELETE() {
  try {
    const db = client.db("kennyt");
    const deleteOps = new DeleteOperations<Transaction>(db, "transactions");

    const deletedCount = await deleteOps.deleteMany({});

    return NextResponse.json({
      message: "Transactions deleted successfully",
      deletedCount,
    });
  } catch (error) {
    console.error("Error deleting transactions:", error);
    return NextResponse.json(
      {
        error: "Failed to delete transactions",
      },
      { status: 500 },
    );
  }
}
