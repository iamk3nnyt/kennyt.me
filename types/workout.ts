import { BaseDocument } from "@/lib/db/types";

export type WorkoutType = "strength" | "cardio" | "flexibility" | "recovery";

export interface WorkoutActivity extends BaseDocument {
  title: string;
  description: string;
  type: WorkoutType;
  duration: string;
  date: string;
  emoji: string;
}
