import { Document } from "mongodb";

export interface BaseDocument extends Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  sort?: Record<string, 1 | -1>;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}
