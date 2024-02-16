import { OpeningTimeSlots } from '@/src/types/database/opening-time-database';
import { connectToDatabaseAndCollection } from '../../connect-database';

/**
 * Read opening time slots of a given day of the business
 * @returns sellers
 */
export async function readOpeningTime(
  day: number
): Promise<OpeningTimeSlots[]> {
  const openingTimeCollection = await connectToDatabaseAndCollection(
    'opening-time'
  );
  const openingTimeQuery = { day: day };
  const openingTimeOptions = {
    projection: { timeSlots: 1, open: 1 },
  };
  const response = await openingTimeCollection.findOne(
    openingTimeQuery,
    openingTimeOptions
  );
  // workaround because of passing data from server to client
  const openingTime: OpeningTimeSlots[] = JSON.parse(JSON.stringify(response));

  return openingTime;
}
