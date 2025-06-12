import { deleteAllTechStack } from "@/lib/data/tech";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const result = await deleteAllTechStack();

    return NextResponse.json({
      message: "Tech stack deleted successfully",
      count: result,
    });
  } catch (error) {
    console.error("Error deleting tech stack:", error);
    return NextResponse.json(
      { error: "Failed to delete tech stack" },
      { status: 500 },
    );
  }
}
