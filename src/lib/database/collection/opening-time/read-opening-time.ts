import { OpeningTime } from '@/src/types/database/opening-time-database';
import { DatabaseAdapter } from '../../adapter-database';
import { connectToDatabaseAndCollection } from '../../connect-database';
import { MongoDBRepository } from '../../repository/mongodb-repository';

/**
 * Read opening time slots of a given day of the business
 * @returns opening
 */
export async function readOpeningTime(day: number): Promise<OpeningTime> {
  const openingTimeCollection = await connectToDatabaseAndCollection(
    'opening-time'
  );
  const openingTimeQuery = { day: day };
  const openingTimeOptions = {
    projection: { timeSlots: 1, open: 1 },
  };

  const appointmentsRepository = new MongoDBRepository(openingTimeCollection);
  const databaseAdapter = new DatabaseAdapter(appointmentsRepository);
  const response = await databaseAdapter.findOne(
    openingTimeQuery,
    openingTimeOptions
  );
  // workaround because of passing data from server to client
  const openingTime: OpeningTime = JSON.parse(JSON.stringify(response));

  return openingTime;
}
