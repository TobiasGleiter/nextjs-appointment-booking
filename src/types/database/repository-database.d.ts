import { WithId } from 'mongodb';

export interface DatabaseRepository<T> {
  insertOne(item: T, options?: any): Promise<any>;
  count(query: any): Promise<WithId<T>[]>;
}
