import { Collection, Db, FindOneAndDeleteOptions } from "mongodb";
import { BaseDocument, QueryFilter } from "./types";

export class DeleteOperations<T extends BaseDocument> {
  private collection: Collection<T>;

  constructor(db: Db, collectionName: string) {
    this.collection = db.collection<T>(collectionName);
  }

  async deleteOne(filter: QueryFilter<T>): Promise<boolean> {
    const result = await this.collection.deleteOne(filter);
    return result.deletedCount > 0;
  }

  async deleteById(id: string): Promise<boolean> {
    return this.deleteOne({ _id: id } as QueryFilter<T>);
  }

  async deleteMany(filter: QueryFilter<T>): Promise<number> {
    const result = await this.collection.deleteMany(filter);
    return result.deletedCount;
  }

  async findOneAndDelete(
    filter: QueryFilter<T>,
    options: FindOneAndDeleteOptions = {},
  ): Promise<T | null> {
    const result = await this.collection.findOneAndDelete(filter, options);
    return result?.value as T | null;
  }
}
