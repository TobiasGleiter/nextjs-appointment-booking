import { Seller } from '@/src/types/database/sellers-database';
import { InsertOneResult } from 'mongodb';
import { DatabaseAdapter } from '../../adapter-database';
import { connectToDatabaseAndCollection } from '../../connect-database';
import { MongoDBRepository } from '../../repository/mongodb-repository';

/**
 * Insert goal for a user
 * @param goal
 * @returns result
 */
export async function createSeller(seller: Seller): Promise<InsertOneResult> {
  const sellersCollection = await connectToDatabaseAndCollection('sellers');
  const sellersOptions = {};

  const insertSeller = {
    ...seller,
    role: 'seller',
  };
  const sellersRepository = new MongoDBRepository(sellersCollection);
  const databaseAdapter = new DatabaseAdapter(sellersRepository);
  const result = await databaseAdapter.insertOne(insertSeller, sellersOptions);

  return result;
}
