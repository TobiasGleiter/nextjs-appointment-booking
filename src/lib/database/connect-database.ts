import { env } from '@/env.mjs';
import { Collections } from '@/src/types/database/collections-database.de';
import clientPromise from './mongodb-database';

/**
 * Connect to mongodb collection (automatic database selection from NODE_ENV)
 * @param collection
 * @returns col
 */
export async function connectToDatabaseAndCollection(collection: Collections) {
  let mongodb_name: string = env.NODE_ENV;

  if (env.NODE_ENV !== 'development') {
    mongodb_name = env.MONGODB_NAME_PROD;
  }

  const mongoClient = await clientPromise;
  const db = mongoClient.db(mongodb_name);
  const col = db.collection(collection);

  return col;
}
