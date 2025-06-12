import { BaseDocument } from "@/lib/db/types";

export interface Article extends BaseDocument {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
  image?: string;
  featured: boolean;
}
