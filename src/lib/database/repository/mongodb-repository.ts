import { DatabaseRepository } from '@/src/types/database/repository-database';
import {
  Collection,
  InsertOneResult,
  OptionalUnlessRequiredId,
  WithId,
} from 'mongodb';

export class MongoDBRepository<T> implements DatabaseRepository<T> {
  private collection: Collection<T>;

  constructor(collection: Collection<T>) {
    this.collection = collection;
  }

  async find(query: T, options?: Object): Promise<any> {
    return this.collection.find(query, options).toArray();
  }

  async findOne(query: T, options?: Object): Promise<WithId<T>> {
    return this.collection.findOne(
      query as OptionalUnlessRequiredId<T>,
      options
    );
  }

  async countDocuments(query: Object): Promise<number> {
    return this.collection.countDocuments(query);
  }

  async insertOne(item: T, options?: Object): Promise<InsertOneResult<T>> {
    return this.collection.insertOne(
      item as OptionalUnlessRequiredId<T>,
      options
    );
  }
}
