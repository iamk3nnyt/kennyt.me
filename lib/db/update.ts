import {
  Collection,
  Db,
  FindOneAndUpdateOptions,
  UpdateOptions,
} from "mongodb";
import { BaseDocument, QueryFilter, UpdateData } from "./types";

export class UpdateOperations<T extends BaseDocument> {
  private collection: Collection<T>;

  constructor(db: Db, collectionName: string) {
    this.collection = db.collection<T>(collectionName);
  }

  async updateOne(
    filter: QueryFilter<T>,
    update: UpdateData<T>,
    options?: UpdateOptions,
  ): Promise<boolean> {
    const now = new Date();
    const updateWithTimestamp = {
      $set: {
        ...(update.$set || {}),
        updatedAt: now,
      },
    } as UpdateData<T>;

    const result = await this.collection.updateOne(
      filter,
      updateWithTimestamp,
      options,
    );
    return result.modifiedCount > 0;
  }

  async updateById(
    id: string,
    update: UpdateData<T>,
    options?: UpdateOptions,
  ): Promise<boolean> {
    return this.updateOne({ _id: id } as QueryFilter<T>, update, options);
  }

  async updateMany(
    filter: QueryFilter<T>,
    update: UpdateData<T>,
    options?: UpdateOptions,
  ): Promise<number> {
    const now = new Date();
    const updateWithTimestamp = {
      $set: {
        ...(update.$set || {}),
        updatedAt: now,
      },
    } as UpdateData<T>;

    const result = await this.collection.updateMany(
      filter,
      updateWithTimestamp,
      options,
    );
    return result.modifiedCount;
  }

  async findOneAndUpdate(
    filter: QueryFilter<T>,
    update: UpdateData<T>,
    options: FindOneAndUpdateOptions = {},
  ): Promise<T | null> {
    const now = new Date();
    const updateWithTimestamp = {
      $set: {
        ...(update.$set || {}),
        updatedAt: now,
      },
    } as UpdateData<T>;

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
