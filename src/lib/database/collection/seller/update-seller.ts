import { Seller } from '@/src/types/database/sellers-database';
import { ObjectId, UpdateResult } from 'mongodb';
import { DatabaseAdapter } from '../../adapter-database';
import { connectToDatabaseAndCollection } from '../../connect-database';
import { MongoDBRepository } from '../../repository/mongodb-repository';

/**
 * Updates a goal with a goalId and goal (goalPatchSchema)
 * @param goalId string
 * @param goal goalPatchSchema
 * @returns UpdateResult
 */
export async function updateSeller(
  sellerId: string,
  seller: Seller
): Promise<UpdateResult> {
  const sellersCollection = await connectToDatabaseAndCollection('sellers');
  const sellersQuery = { _id: new ObjectId(sellerId) };
  const sellersOptions = {
    $set: seller,
  };

  const sellersRepository = new MongoDBRepository(sellersCollection);
  const databaseAdapter = new DatabaseAdapter(sellersRepository);
  const result: UpdateResult = await databaseAdapter.updateOne(
    sellersQuery,
    sellersOptions
  );

  return result;
}
