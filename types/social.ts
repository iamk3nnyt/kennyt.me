import { BaseDocument } from "@/lib/db/types";

export interface SocialLink extends BaseDocument {
  name: string;
  url: string;
  icon: string;
  order: number;
}
