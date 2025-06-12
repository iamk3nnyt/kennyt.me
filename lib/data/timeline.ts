// lib/data/timeline.ts
import { CreateOperations } from "@/lib/db/create";
import { DeleteOperations } from "@/lib/db/delete";
import { ReadOperations } from "@/lib/db/read";
import { BaseDocument } from "@/lib/db/types";
import { UpdateOperations } from "@/lib/db/update";
import client from "@/lib/mongodb";
import { TimelineEntry } from "@/types/timeline";
import { Filter } from "mongodb";

// Read operations
export async function getTimelineEntries(filter: Filter<TimelineEntry> = {}) {
  const db = client.db(process.env.DB);
  const readOps = new ReadOperations<TimelineEntry>(db, "timeline");

  return readOps.findMany(filter, {
    projection: {
      _id: 0,
      company: 1,
      role: 1,
      period: 1,
      description: 1,
      startDate: 1,
      endDate: 1,
    },
    sort: { startDate: -1 },
  });
}

export async function getTimelineEntryById(id: string) {
  const db = client.db(process.env.DB);
  const readOps = new ReadOperations<TimelineEntry>(db, "timeline");

  return readOps.findById(id, {
    projection: {
      _id: 0,
      company: 1,
      role: 1,
      period: 1,
      description: 1,
      startDate: 1,
      endDate: 1,
    },
  });
}

// Create operations
export async function createTimelineEntry(
  data: Omit<TimelineEntry, keyof BaseDocument>,
) {
  const db = client.db(process.env.DB);
  const createOps = new CreateOperations<TimelineEntry>(db, "timeline");

  return createOps.createOne(data);
}

export async function createManyTimelineEntries(
  data: Array<Omit<TimelineEntry, keyof BaseDocument>>,
) {
  const db = client.db(process.env.DB);
  const createOps = new CreateOperations<TimelineEntry>(db, "timeline");

  return createOps.createMany(data);
}

// Update operations
export async function updateTimelineEntry(
  id: string,
  data: Partial<Omit<TimelineEntry, keyof BaseDocument>>,
) {
  const db = client.db(process.env.DB);
  const updateOps = new UpdateOperations<TimelineEntry>(db, "timeline");

  return updateOps.updateById(id, { $set: data });
}

// Delete operations
export async function deleteTimelineEntry(id: string) {
  const db = client.db(process.env.DB);
  const deleteOps = new DeleteOperations<TimelineEntry>(db, "timeline");

  return deleteOps.deleteById(id);
}

export async function deleteAllTimelineEntries() {
  const db = client.db(process.env.DB);
  const deleteOps = new DeleteOperations<TimelineEntry>(db, "timeline");

  return deleteOps.deleteMany({});
}

// Seed operation
export async function seedTimelineEntries() {
  const db = client.db(process.env.DB);
  const createOps = new CreateOperations<TimelineEntry>(db, "timeline");
  const deleteOps = new DeleteOperations<TimelineEntry>(db, "timeline");

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

  // Clear existing entries
  await deleteOps.deleteMany({});

  // Insert new entries
  return createOps.createMany(seed);
}
