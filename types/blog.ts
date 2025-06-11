import { BaseDocument } from "@/lib/db/types";

export interface FeaturedArticle extends BaseDocument {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  featured: boolean;
}

export interface Article extends BaseDocument {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
  image?: string;
}
