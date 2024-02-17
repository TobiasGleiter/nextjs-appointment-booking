import { routeRequestPostDashboardSellerSchema } from '@/src/lib/validation/dashboard/route-dashboard';
import { InsertOneResult } from 'mongodb';
import { z } from 'zod';
import { DatabaseAdapter } from '../../adapter-database';
import { connectToDatabaseAndCollection } from '../../connect-database';
import { MongoDBRepository } from '../../repository/mongodb-repository';

/**
 * Insert goal for a user
 * @param goal
 * @returns result
 */
export async function createSeller(
  seller: z.infer<typeof routeRequestPostDashboardSellerSchema>
): Promise<InsertOneResult> {
  const sellersCollection = await connectToDatabaseAndCollection('sellers');
  const sellersOptions = {};

  const sellersRepository = new MongoDBRepository(sellersCollection);
  const databaseAdapter = new DatabaseAdapter(sellersRepository);
  const result = await databaseAdapter.insertOne(seller, sellersOptions);

  return result;
}
