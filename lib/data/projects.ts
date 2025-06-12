// lib/data/projects.ts
import { CreateOperations } from "@/lib/db/create";
import { DeleteOperations } from "@/lib/db/delete";
import { ReadOperations } from "@/lib/db/read";
import { BaseDocument } from "@/lib/db/types";
import { UpdateOperations } from "@/lib/db/update";
import client from "@/lib/mongodb";
import { Project } from "@/types/project";
import { Filter } from "mongodb";

// Read operations
export async function getProjects(filter: Filter<Project> = {}) {
  const db = client.db("kennyt");
  const readOps = new ReadOperations<Project>(db, "projects");

  return readOps.findMany(filter, {
    projection: {
      _id: 0,
      title: 1,
      link: 1,
    },
  });
}

export async function getProjectById(id: string) {
  const db = client.db("kennyt");
  const readOps = new ReadOperations<Project>(db, "projects");

  return readOps.findById(id, {
    projection: {
      _id: 0,
      title: 1,
      link: 1,
    },
  });
}

// Create operations
export async function createProject(data: Omit<Project, keyof BaseDocument>) {
  const db = client.db("kennyt");
  const createOps = new CreateOperations<Project>(db, "projects");

  return createOps.createOne(data);
}

export async function createManyProjects(
  data: Array<Omit<Project, keyof BaseDocument>>,
) {
  const db = client.db("kennyt");
  const createOps = new CreateOperations<Project>(db, "projects");

  return createOps.createMany(data);
}

// Update operations
export async function updateProject(
  id: string,
  data: Partial<Omit<Project, keyof BaseDocument>>,
) {
  const db = client.db("kennyt");
  const updateOps = new UpdateOperations<Project>(db, "projects");

  return updateOps.updateById(id, { $set: data });
}

// Delete operations
export async function deleteProject(id: string) {
  const db = client.db("kennyt");
  const deleteOps = new DeleteOperations<Project>(db, "projects");

  return deleteOps.deleteById(id);
}

export async function deleteAllProjects() {
  const db = client.db("kennyt");
  const deleteOps = new DeleteOperations<Project>(db, "projects");

  return deleteOps.deleteMany({});
}

// Seed operation
export async function seedProjects() {
  const db = client.db("kennyt");
  const createOps = new CreateOperations<Project>(db, "projects");
  const deleteOps = new DeleteOperations<Project>(db, "projects");

  const seed = [
    {
      title: "Company Website",
      link: "https://www.ketryon.com/",
    },
    {
      title: "Personal Website",
      link: "https://www.kennyt.me/",
    },
  ];

  // Clear existing projects
  await deleteOps.deleteMany({});

  // Insert new projects
  return createOps.createMany(seed);
}

// Helper functions for common queries
export async function getProjectByTitle(title: string) {
  return getProjects({ title });
}

export async function getProjectByDomain(domain: string) {
  return getProjects({
    link: { $regex: domain, $options: "i" },
  });
}
