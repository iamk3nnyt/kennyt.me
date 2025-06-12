import { deleteAllHeroes } from "@/lib/data/gaming";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const result = await deleteAllHeroes();

    return NextResponse.json({
      message: "Heroes deleted successfully",
      count: result,
    });
  } catch (error) {
    console.error("Error deleting heroes:", error);
    return NextResponse.json(
      { error: "Failed to delete heroes" },
      { status: 500 },
    );
  }
}
