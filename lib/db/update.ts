import {
  Collection,
  Db,
  Filter,
  FindOneAndUpdateOptions,
  UpdateFilter,
  UpdateOptions,
} from "mongodb";
import { BaseDocument } from "./types";

export class UpdateOperations<T extends BaseDocument> {
  private collection: Collection<T>;

  constructor(db: Db, collectionName: string) {
    this.collection = db.collection<T>(collectionName);
  }

  async updateOne(
    filter: Filter<T>,
    update: UpdateFilter<T>,
    options?: UpdateOptions,
  ): Promise<boolean> {
    const now = new Date();
    const updateWithTimestamp = {
      $set: {
        ...(update.$set || {}),
        updatedAt: now,
      },
    } as UpdateFilter<T>;

    const result = await this.collection.updateOne(
      filter,
      updateWithTimestamp,
      options,
    );
    return result.modifiedCount > 0;
  }

  async updateById(
    id: string,
    update: UpdateFilter<T>,
    options?: UpdateOptions,
  ): Promise<boolean> {
    return this.updateOne({ _id: id } as Filter<T>, update, options);
  }

  async updateMany(
    filter: Filter<T>,
    update: UpdateFilter<T>,
    options?: UpdateOptions,
  ): Promise<number> {
    const now = new Date();
    const updateWithTimestamp = {
      $set: {
        ...(update.$set || {}),
        updatedAt: now,
      },
    } as UpdateFilter<T>;

    const result = await this.collection.updateMany(
      filter,
      updateWithTimestamp,
      options,
    );
    return result.modifiedCount;
  }

  async findOneAndUpdate(
    filter: Filter<T>,
    update: UpdateFilter<T>,
    options: FindOneAndUpdateOptions = {},
  ): Promise<T | null> {
    const now = new Date();
    const updateWithTimestamp = {
      $set: {
        ...(update.$set || {}),
        updatedAt: now,
      },
    } as UpdateFilter<T>;

    const result = await this.collection.findOneAndUpdate(
      filter,
      updateWithTimestamp,
      {
        ...options,
        returnDocument: "after",
      },
    );

    return result?.value as T | null;
  }
}
