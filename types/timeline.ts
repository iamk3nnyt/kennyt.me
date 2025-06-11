import { BaseDocument } from "@/lib/db/types";

export interface TimelineEntry extends BaseDocument {
  company: string;
  role: string;
  period: string;
  description: string;
  startDate: Date;
  endDate: Date | null; // null for current position
}
