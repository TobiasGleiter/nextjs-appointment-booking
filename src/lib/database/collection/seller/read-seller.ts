import { Seller } from '@/src/types/database/sellers-database';
import { DatabaseAdapter } from '../../adapter-database';
import { connectToDatabaseAndCollection } from '../../connect-database';
import { MongoDBRepository } from '../../repository/mongodb-repository';

/**
 * Read all sellers from sellers collection
 * @returns sellers
 */
export async function readAllSellers(): Promise<Seller[]> {
  const sellersCollection = await connectToDatabaseAndCollection('sellers');
  const sellersQuery = {};
  const sellersOptions = {
    projection: { name: 1 },
  };

  const sellersRepository = new MongoDBRepository(sellersCollection);
  const databaseAdapter = new DatabaseAdapter(sellersRepository);
  const response = await databaseAdapter.find(sellersQuery, sellersOptions);

  // workaround because of passing data from server to client
  const sellers: Seller[] = JSON.parse(JSON.stringify(response));

  return sellers;
}
