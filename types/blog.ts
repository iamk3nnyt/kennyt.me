import { BaseDocument } from "@/lib/db/types";

export interface Article extends BaseDocument {
  slug: string;
  title: string;
  date: Date;
  excerpt: string;
  content: string;
  image: string;
}

export interface FeaturedArticle extends BaseDocument {
  slug: string;
  title: string;
  excerpt: string;
  date: Date;
  featured: boolean;
}
