import { Collection, OptionalUnlessRequiredId } from 'mongodb';

// Define an interface for the database repository
interface DatabaseRepository<T> {
  insertOne(item: T, options?: any): Promise<any>;
  // Add other CRUD operations as needed
}

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
  // Implement other CRUD operations
}

// Define a class for the database adapter
export class DatabaseAdapter<T> {
  private repository: DatabaseRepository<T>;

  constructor(repository: DatabaseRepository<T>) {
    this.repository = repository;
  }

  async insertOne(item: T, options?: any): Promise<any> {
    return this.repository.insertOne(item, options);
  }
  // Add other methods as needed to delegate operations to the repository
}
