import { Document, Filter, UpdateFilter } from "mongodb";

export interface BaseDocument extends Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReadOptions {
  projection?: Record<string, 0 | 1>;
  sort?: Record<string, 1 | -1>;
  limit?: number;
}

export interface CreateOptions {
  // Add any create-specific options here
}

export interface UpdateOptions {
  // Add any update-specific options here
}

export interface DeleteOptions {
  // Add any delete-specific options here
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

export type QueryFilter<T> = Filter<T>;
export type UpdateData<T> = UpdateFilter<T>;
