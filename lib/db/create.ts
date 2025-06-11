import { Collection, Db, OptionalUnlessRequiredId } from "mongodb";
import { BaseDocument } from "./types";

export class CreateOperations<T extends BaseDocument> {
  private collection: Collection<T>;

  constructor(db: Db, collectionName: string) {
    this.collection = db.collection<T>(collectionName);
  }

  async createOne(data: Omit<T, keyof BaseDocument>): Promise<T> {
    const now = new Date();
    const document = {
      ...data,
      createdAt: now,
      updatedAt: now,
    } as OptionalUnlessRequiredId<T>;

    const result = await this.collection.insertOne(document);

    if (!result.acknowledged) {
      throw new Error("Failed to create document");
    }

    return {
      ...document,
      _id: result.insertedId.toString(),
    } as T;
  }

  async createMany(data: Array<Omit<T, keyof BaseDocument>>): Promise<T[]> {
    const now = new Date();
    const documents = data.map((item) => ({
      ...item,
      createdAt: now,
      updatedAt: now,
    })) as OptionalUnlessRequiredId<T>[];

    const result = await this.collection.insertMany(documents);

    if (!result.acknowledged) {
      throw new Error("Failed to create documents");
    }

    return documents.map((doc, index) => ({
      ...doc,
      _id: result.insertedIds[index].toString(),
    })) as T[];
  }
}
