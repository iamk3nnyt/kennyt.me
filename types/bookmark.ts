import { BaseDocument } from "@/lib/db/types";

export interface Bookmark extends BaseDocument {
  name: string;
  url: string;
  icon: string;
}
