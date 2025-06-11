import { Collection, Db } from "mongodb";
import {
  BaseDocument,
  PaginatedResult,
  PaginationOptions,
  QueryFilter,
  ReadOptions,
} from "./types";

export class ReadOperations<T extends BaseDocument> {
  private collection: Collection<T>;

  constructor(db: Db, collectionName: string) {
    this.collection = db.collection<T>(collectionName);
  }

  async findOne(
    filter: QueryFilter<T>,
    options?: ReadOptions,
  ): Promise<T | null> {
    const result = await this.collection.findOne(filter, options);
    return result as T | null;
  }

  async findById(id: string, options?: ReadOptions): Promise<T | null> {
    const result = await this.collection.findOne(
      { _id: id } as QueryFilter<T>,
      options,
    );
    return result as T | null;
  }

  async findMany(filter: QueryFilter<T>, options?: ReadOptions): Promise<T[]> {
    const results = await this.collection.find(filter, options).toArray();
    return results as T[];
  }

  async findPaginated(
    filter: QueryFilter<T>,
    paginationOptions: PaginationOptions,
    options?: ReadOptions,
  ): Promise<PaginatedResult<T>> {
    const { page, limit, sort } = paginationOptions;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.collection
        .find(filter, options)
        .sort(sort || { createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      this.collection.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;

    return {
      data: data as T[],
      total,
      page,
      totalPages,
      hasMore,
    };
  }

  async count(filter: QueryFilter<T>): Promise<number> {
    return this.collection.countDocuments(filter);
  }

  async exists(filter: QueryFilter<T>): Promise<boolean> {
    const count = await this.collection.countDocuments(filter, { limit: 1 });
    return count > 0;
  }
}
