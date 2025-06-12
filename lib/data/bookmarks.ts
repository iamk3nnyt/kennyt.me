// lib/data/bookmarks.ts
import { CreateOperations } from "@/lib/db/create";
import { DeleteOperations } from "@/lib/db/delete";
import { ReadOperations } from "@/lib/db/read";
import { BaseDocument } from "@/lib/db/types";
import { UpdateOperations } from "@/lib/db/update";
import client from "@/lib/mongodb";
import { Bookmark } from "@/types/bookmark";
import { Filter } from "mongodb";

// Read operations
export async function getBookmarks(filter: Filter<Bookmark> = {}) {
  const db = client.db(process.env.DB);
  const readOps = new ReadOperations<Bookmark>(db, "bookmarks");

  return readOps.findMany(filter, {
    projection: {
      _id: 0,
      name: 1,
      url: 1,
      icon: 1,
    },
  });
}

export async function getBookmarkById(id: string) {
  const db = client.db(process.env.DB);
  const readOps = new ReadOperations<Bookmark>(db, "bookmarks");

  return readOps.findById(id, {
    projection: {
      _id: 0,
      name: 1,
      url: 1,
      icon: 1,
    },
  });
}

// Create operations
export async function createBookmark(data: Omit<Bookmark, keyof BaseDocument>) {
  const db = client.db(process.env.DB);
  const createOps = new CreateOperations<Bookmark>(db, "bookmarks");

  return createOps.createOne(data);
}

export async function createManyBookmarks(
  data: Array<Omit<Bookmark, keyof BaseDocument>>,
) {
  const db = client.db(process.env.DB);
  const createOps = new CreateOperations<Bookmark>(db, "bookmarks");

  return createOps.createMany(data);
}

// Update operations
export async function updateBookmark(
  id: string,
  data: Partial<Omit<Bookmark, keyof BaseDocument>>,
) {
  const db = client.db(process.env.DB);
  const updateOps = new UpdateOperations<Bookmark>(db, "bookmarks");

  return updateOps.updateById(id, { $set: data });
}

// Delete operations
export async function deleteBookmark(id: string) {
  const db = client.db(process.env.DB);
  const deleteOps = new DeleteOperations<Bookmark>(db, "bookmarks");

  return deleteOps.deleteById(id);
}

export async function deleteAllBookmarks() {
  const db = client.db(process.env.DB);
  const deleteOps = new DeleteOperations<Bookmark>(db, "bookmarks");

  return deleteOps.deleteMany({});
}

// Seed operation
export async function seedBookmarks() {
  const db = client.db(process.env.DB);
  const createOps = new CreateOperations<Bookmark>(db, "bookmarks");
  const deleteOps = new DeleteOperations<Bookmark>(db, "bookmarks");

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

  // Clear existing bookmarks
  await deleteOps.deleteMany({});

  // Insert new bookmarks
  return createOps.createMany(seed);
}
