import { DatabaseRepository } from '@/src/types/database/repository-database';
import {
  Collection,
  DeleteResult,
  InsertOneResult,
  OptionalUnlessRequiredId,
  UpdateResult,
  WithId,
} from 'mongodb';

export class MongoDBRepository<T> implements DatabaseRepository<T> {
  private collection: Collection<T>;

  constructor(collection: Collection<T>) {
    this.collection = collection;
  }

  async deleteOne(query: T, options?: Object): Promise<DeleteResult> {
    return this.collection.deleteOne(query, options);
  }

  async updateOne(
    query: T,
    update?: Object,
    options?: Object
  ): Promise<UpdateResult<T>> {
    return this.collection.updateOne(query, update, options);
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
