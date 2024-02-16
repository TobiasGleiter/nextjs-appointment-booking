import { DatabaseRepository } from '@/src/types/database/repository-database';

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
