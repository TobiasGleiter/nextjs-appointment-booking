import { DatabaseRepository } from '@/src/types/database/repository-database';

// Define a class for the database adapter
export class DatabaseAdapter<T> {
  private repository: DatabaseRepository<T>;

  constructor(repository: DatabaseRepository<T>) {
    this.repository = repository;
  }

  async updateOne(query: T, options?: Object): Promise<any> {
    return this.repository.updateOne(query, options);
  }

  async find(query: T, options?: Object): Promise<any> {
    return this.repository.find(query, options);
  }

  async findOne(query: T, options?: Object): Promise<any> {
    return this.repository.findOne(query, options);
  }

  async countDocuments(query: T): Promise<number> {
    return this.repository.countDocuments(query);
  }

  async insertOne(item: T, options?: Object): Promise<any> {
    return this.repository.insertOne(item, options);
  }
}
