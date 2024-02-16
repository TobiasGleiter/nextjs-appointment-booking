import { Seller } from '@/src/types/database/sellers-database';
import { connectToDatabaseAndCollection } from '../../connect-database';

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
  const response = await sellersCollection
    .find(sellersQuery, sellersOptions)
    .toArray();
  // workaround because of passing data from server to client
  const sellers: Seller[] = JSON.parse(JSON.stringify(response));

  return sellers;
}
