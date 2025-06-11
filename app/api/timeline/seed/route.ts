import { CreateOperations } from "@/lib/db/create";
import { DeleteOperations } from "@/lib/db/delete";
import client from "@/lib/mongodb";
import { TimelineEntry } from "@/types/timeline";
import { NextResponse } from "next/server";

const seed = [
  {
    company: "Ketryon",
    role: "Founder & Engineer",
    period: "2025/04 - Present",
    description:
      "Building digital products and leading engineering for client and internal projects.",
    startDate: new Date("2025-04-01"),
    endDate: null,
  },
  {
    company: "Mynewsdesk",
    role: "Full Stack Developer",
    period: "2024/10 - 2025/04",
    description:
      "Worked on maintaining their platform and assisted in production site migration.",
    startDate: new Date("2024-10-01"),
    endDate: new Date("2025-04-01"),
  },
  {
    company: "Etteplan",
    role: "Software Engineer",
    period: "2024/03 - 2024/08",
    description:
      "Participated as a consultant where I contributed by helping to resolve both internal and visual bugs",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-08-01"),
  },
];

export async function POST(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const db = client.db("kennyt");
    const createOps = new CreateOperations<TimelineEntry>(db, "timeline");
    const deleteOps = new DeleteOperations<TimelineEntry>(db, "timeline");

    // Clear existing entries
    await deleteOps.deleteMany({});

    // Insert new entries
    const result = await createOps.createMany(seed);

    return NextResponse.json({
      message: "Timeline seeded successfully",
      count: result.length,
      entries: result,
    });
  } catch (error) {
    console.error("Error seeding timeline:", error);
    return NextResponse.json(
      { error: "Failed to seed timeline" },
      { status: 500 },
    );
  }
}
