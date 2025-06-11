import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { CreateOperations } from "@/lib/db/create";
import { Bookmark } from "@/types/bookmark";
import { BaseDocument } from "@/lib/db/types";

const seedBookmarks: Omit<Bookmark, keyof BaseDocument>[] = [
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

export async function POST() {
  try {
    const db = client.db("kennyt");
    const createOps = new CreateOperations<Bookmark>(db, "bookmarks");

    // Clear existing bookmarks
    await db.collection("bookmarks").deleteMany({});

    // Insert new bookmarks
    const result = await createOps.createMany(seedBookmarks);

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
