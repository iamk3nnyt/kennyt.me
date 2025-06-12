import { CreateOperations } from "@/lib/db/create";
import { DeleteOperations } from "@/lib/db/delete";
import client from "@/lib/mongodb";
import { Bookmark } from "@/types/bookmark";
import { NextResponse } from "next/server";

const seed = [
  {
    name: "Next.js Documentation",
    url: "https://nextjs.org/docs",
    icon: "https://www.google.com/s2/favicons?domain=nextjs.org&sz=64",
  },
  {
    name: "TypeScript Handbook",
    url: "https://www.typescriptlang.org/docs/handbook/intro.html",
    icon: "https://www.google.com/s2/favicons?domain=typescriptlang.org&sz=64",
  },
  {
    name: "Tailwind CSS",
    url: "https://tailwindcss.com/docs",
    icon: "https://www.google.com/s2/favicons?domain=tailwindcss.com&sz=64",
  },
  {
    name: "MongoDB Atlas",
    url: "https://www.mongodb.com/cloud/atlas",
    icon: "https://www.google.com/s2/favicons?domain=mongodb.com&sz=64",
  },
  {
    name: "Vercel",
    url: "https://vercel.com/docs",
    icon: "https://www.google.com/s2/favicons?domain=vercel.com&sz=64",
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
    const createOps = new CreateOperations<Bookmark>(db, "bookmarks");
    const deleteOps = new DeleteOperations<Bookmark>(db, "bookmarks");

    // Clear existing bookmarks
    await deleteOps.deleteMany({});

    // Insert new bookmarks
    const result = await createOps.createMany(seed);

    return NextResponse.json({
      message: "Successfully seeded bookmarks",
      count: result.length,
      bookmarks: result,
    });
  } catch (error) {
    console.error("Error seeding bookmarks:", error);
    return NextResponse.json(
      { error: "Failed to seed bookmarks" },
      { status: 500 },
    );
  }
}
