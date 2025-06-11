import { BaseDocument } from "@/lib/db/types";

export interface TechStack extends BaseDocument {
  name: string;
  value: string;
  order: number;
}
