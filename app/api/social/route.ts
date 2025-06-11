import { ReadOperations } from "@/lib/db/read";
import client from "@/lib/mongodb";
import { SocialLink } from "@/types/social";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = client.db("kennyt");
    const readOps = new ReadOperations<SocialLink>(db, "social_links");

    const links = await readOps.findMany(
      {},
      {
        projection: {
          _id: 0,
          name: 1,
          url: 1,
          icon: 1,
        },
        sort: { order: 1 }, // Sort by order field
      },
    );

    return NextResponse.json(links);
  } catch (error) {
    console.error("Error fetching social links:", error);
    return NextResponse.json(
      { error: "Failed to fetch social links" },
      { status: 500 },
    );
  }
}
