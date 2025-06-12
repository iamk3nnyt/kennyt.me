// lib/data/tech.ts
import { CreateOperations } from "@/lib/db/create";
import { DeleteOperations } from "@/lib/db/delete";
import { ReadOperations } from "@/lib/db/read";
import { BaseDocument } from "@/lib/db/types";
import { UpdateOperations } from "@/lib/db/update";
import client from "@/lib/mongodb";
import { TechStack } from "@/types/tech";
import { Filter } from "mongodb";

// Read operations
export async function getTechStack(filter: Filter<TechStack> = {}) {
  const db = client.db(process.env.DB);
  const readOps = new ReadOperations<TechStack>(db, "tech_stack");

  return readOps.findMany(filter, {
    projection: {
      _id: 0,
      name: 1,
      value: 1,
      order: 1,
    },
    sort: { order: 1 }, // Sort by order field
  });
}

export async function getTechStackById(id: string) {
  const db = client.db(process.env.DB);
  const readOps = new ReadOperations<TechStack>(db, "tech_stack");

  return readOps.findById(id, {
    projection: {
      _id: 0,
      name: 1,
      value: 1,
      order: 1,
    },
  });
}

// Create operations
export async function createTechStack(
  data: Omit<TechStack, keyof BaseDocument>,
) {
  const db = client.db(process.env.DB);
  const createOps = new CreateOperations<TechStack>(db, "tech_stack");

  return createOps.createOne(data);
}

export async function createManyTechStack(
  data: Array<Omit<TechStack, keyof BaseDocument>>,
) {
  const db = client.db(process.env.DB);
  const createOps = new CreateOperations<TechStack>(db, "tech_stack");

  return createOps.createMany(data);
}

// Update operations
export async function updateTechStack(
  id: string,
  data: Partial<Omit<TechStack, keyof BaseDocument>>,
) {
  const db = client.db(process.env.DB);
  const updateOps = new UpdateOperations<TechStack>(db, "tech_stack");

  return updateOps.updateById(id, { $set: data });
}

// Delete operations
export async function deleteTechStack(id: string) {
  const db = client.db(process.env.DB);
  const deleteOps = new DeleteOperations<TechStack>(db, "tech_stack");

  return deleteOps.deleteById(id);
}

export async function deleteAllTechStack() {
  const db = client.db(process.env.DB);
  const deleteOps = new DeleteOperations<TechStack>(db, "tech_stack");

  return deleteOps.deleteMany({});
}

// Seed operation
export async function seedTechStack() {
  const db = client.db(process.env.DB);
  const createOps = new CreateOperations<TechStack>(db, "tech_stack");
  const deleteOps = new DeleteOperations<TechStack>(db, "tech_stack");

  const seedData: Array<Omit<TechStack, keyof BaseDocument>> = [
    { name: "Editor", value: "VS Code", order: 1 },
    { name: "Terminal", value: "Oh My Zsh", order: 2 },
    { name: "Framework", value: "Next.js", order: 3 },
    { name: "Language", value: "TypeScript", order: 4 },
    { name: "UI", value: "Tailwind CSS", order: 5 },
    { name: "Hosting", value: "Vercel", order: 6 },
    { name: "Version Control", value: "Git & GitHub", order: 7 },
    { name: "Database", value: "MongoDB", order: 8 },
  ];

  // Clear existing tech stack
  await deleteOps.deleteMany({});

  // Insert new tech stack
  return createOps.createMany(seedData);
}

// Helper functions for common queries
export async function getTechStackByName(name: string) {
  return getTechStack({ name });
}

export async function getTechStackByValue(value: string) {
  return getTechStack({ value });
}

export async function getTechStackByOrder(order: number) {
  return getTechStack({ order });
}

export async function getTechStackByRange(
  startOrder: number,
  endOrder: number,
) {
  return getTechStack({
    order: {
      $gte: startOrder,
      $lte: endOrder,
    },
  });
}
