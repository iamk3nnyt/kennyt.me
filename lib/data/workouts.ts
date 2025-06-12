// lib/data/workouts.ts
import { CreateOperations } from "@/lib/db/create";
import { DeleteOperations } from "@/lib/db/delete";
import { ReadOperations } from "@/lib/db/read";
import { BaseDocument } from "@/lib/db/types";
import { UpdateOperations } from "@/lib/db/update";
import client from "@/lib/mongodb";
import { WorkoutActivity, WorkoutType } from "@/types/workout";
import { Filter } from "mongodb";

// Read operations
export async function getWorkouts(filter: Filter<WorkoutActivity> = {}) {
  const db = client.db("kennyt");
  const readOps = new ReadOperations<WorkoutActivity>(db, "workouts");

  return readOps.findMany(filter, {
    projection: {
      _id: 0,
      title: 1,
      description: 1,
      type: 1,
      duration: 1,
      date: 1,
      emoji: 1,
    },
    sort: { date: -1 }, // Most recent first
  });
}

export async function getWorkoutById(id: string) {
  const db = client.db("kennyt");
  const readOps = new ReadOperations<WorkoutActivity>(db, "workouts");

  return readOps.findById(id, {
    projection: {
      _id: 0,
      title: 1,
      description: 1,
      type: 1,
      duration: 1,
      date: 1,
      emoji: 1,
    },
  });
}

// Create operations
export async function createWorkout(
  data: Omit<WorkoutActivity, keyof BaseDocument>,
) {
  const db = client.db("kennyt");
  const createOps = new CreateOperations<WorkoutActivity>(db, "workouts");

  return createOps.createOne(data);
}

export async function createManyWorkouts(
  data: Array<Omit<WorkoutActivity, keyof BaseDocument>>,
) {
  const db = client.db("kennyt");
  const createOps = new CreateOperations<WorkoutActivity>(db, "workouts");

  return createOps.createMany(data);
}

// Update operations
export async function updateWorkout(
  id: string,
  data: Partial<Omit<WorkoutActivity, keyof BaseDocument>>,
) {
  const db = client.db("kennyt");
  const updateOps = new UpdateOperations<WorkoutActivity>(db, "workouts");

  return updateOps.updateById(id, { $set: data });
}

// Delete operations
export async function deleteWorkout(id: string) {
  const db = client.db("kennyt");
  const deleteOps = new DeleteOperations<WorkoutActivity>(db, "workouts");

  return deleteOps.deleteById(id);
}

export async function deleteAllWorkouts() {
  const db = client.db("kennyt");
  const deleteOps = new DeleteOperations<WorkoutActivity>(db, "workouts");

  return deleteOps.deleteMany({});
}

// Seed operation
export async function seedWorkouts() {
  const db = client.db("kennyt");
  const createOps = new CreateOperations<WorkoutActivity>(db, "workouts");
  const deleteOps = new DeleteOperations<WorkoutActivity>(db, "workouts");

  const seed = [
    {
      title: "Upper Body Strength",
      description:
        "Focused on chest, shoulders, and triceps with progressive overload",
      type: "strength",
      duration: "45 min",
      date: new Date().toISOString(),
      emoji: "💪",
    },
    {
      title: "Morning Run",
      description: "Steady state cardio with 5K distance",
      type: "cardio",
      duration: "30 min",
      date: new Date(Date.now() - 86400000).toISOString(), // yesterday
      emoji: "🏃",
    },
    {
      title: "Yoga Flow",
      description: "Full body stretching and flexibility routine",
      type: "flexibility",
      duration: "40 min",
      date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      emoji: "🧘",
    },
    {
      title: "Active Recovery",
      description: "Light walking and mobility exercises",
      type: "recovery",
      duration: "20 min",
      date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      emoji: "🚶",
    },
  ];

  // Clear existing workouts
  await deleteOps.deleteMany({});

  // Insert new workouts
  return createOps.createMany(seed);
}

// Helper functions for common queries
export async function getWorkoutsByType(type: WorkoutType) {
  return getWorkouts({ type });
}

export async function getWorkoutsByDateRange(startDate: Date, endDate: Date) {
  return getWorkouts({
    date: {
      $gte: startDate.toISOString(),
      $lte: endDate.toISOString(),
    },
  });
}

export async function getRecentWorkouts(limit: number = 5) {
  const db = client.db("kennyt");
  const readOps = new ReadOperations<WorkoutActivity>(db, "workouts");

  return readOps.findMany(
    {},
    {
      projection: {
        _id: 0,
        title: 1,
        description: 1,
        type: 1,
        duration: 1,
        date: 1,
        emoji: 1,
      },
      sort: { date: -1 },
      limit,
    },
  );
}
