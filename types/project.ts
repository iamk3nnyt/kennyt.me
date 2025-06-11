import { BaseDocument } from "@/lib/db/types";

export interface Project extends BaseDocument {
  title: string;
  link: string;
}
