import { BaseDocument } from "@/lib/db/types";

export interface FeaturedArticle extends BaseDocument {
  slug: string;
  title: string;
  excerpt: string;
  date: Date;
  featured: boolean;
}
