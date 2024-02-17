import { DeleteResult, ObjectId } from 'mongodb';
import { DatabaseAdapter } from '../../adapter-database';
import { connectToDatabaseAndCollection } from '../../connect-database';
import { MongoDBRepository } from '../../repository/mongodb-repository';

/**
 * Delete a goal by a goal id in the mongodb for a user
 * @param goalId string
 * @returns DeleteResult
 */
export async function deleteSellerById(
  sellerId: string
): Promise<DeleteResult> {
  const sellersCollection = await connectToDatabaseAndCollection('sellers');
  const sellerQuery = { _id: new ObjectId(sellerId) };
  const sellersOptions = {};

  const sellersRepository = new MongoDBRepository(sellersCollection);
  const databaseAdapter = new DatabaseAdapter(sellersRepository);
  const result: DeleteResult = await databaseAdapter.deleteOne(
    sellerQuery,
    sellersOptions
  );

  return result;
}
