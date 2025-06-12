import { deleteAllTransactions } from "@/lib/data/finance";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const result = await deleteAllTransactions();

    return NextResponse.json({
      message: "Transactions deleted successfully",
      count: result,
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
