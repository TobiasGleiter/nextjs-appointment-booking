import { DatabaseRepository } from '@/src/types/database/repository-database';
import { Collection, OptionalUnlessRequiredId, WithId } from 'mongodb';

// Define a class for MongoDB repository implementing the DatabaseRepository interface
export class MongoDBRepository<T> implements DatabaseRepository<T> {
  private collection: Collection<T>;

  constructor(collection: Collection<T>) {
    this.collection = collection;
  }

  async insertOne(item: T, options?: any): Promise<any> {
    return this.collection.insertOne(
      item as OptionalUnlessRequiredId<T>,
      options
    );
  }

  async count(query: any): Promise<WithId<T>[]> {
    return this.collection.find(query).toArray();
  }
}
