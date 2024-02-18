import { OpeningTime } from '@/src/types/database/opening-time-database';
import { ObjectId } from 'mongodb';
import { DatabaseAdapter } from '../../adapter-database';
import { connectToDatabaseAndCollection } from '../../connect-database';
import { MongoDBRepository } from '../../repository/mongodb-repository';

/**
 * Read opening time slots of a given day of the business
 * @returns opening
 */
export async function readOpeningTimeByDay(day: number): Promise<OpeningTime> {
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

/**
 * Output an array of the opening times
 * @returns
 */
export async function readAllOpeningTime(): Promise<OpeningTime[]> {
  const openingTimeCollection = await connectToDatabaseAndCollection(
    'opening-time'
  );
  const openingTimeQuery = {};
  const openingTimeOptions = {
    projection: { open: 1, day: 1, timeSlots: 1 },
    sort: {
      day: 1,
    },
  };

  const appointmentsRepository = new MongoDBRepository(openingTimeCollection);
  const databaseAdapter = new DatabaseAdapter(appointmentsRepository);
  const response = await databaseAdapter.find(
    openingTimeQuery,
    openingTimeOptions
  );

  // workaround because of passing data from server to client
  const openingTime: OpeningTime[] = JSON.parse(JSON.stringify(response));
  return openingTime;
}

/**
 * Output an id
 * @param id
 */
export async function readOpeningTimeById(id: string): Promise<OpeningTime> {
  const openingTimeCollection = await connectToDatabaseAndCollection(
    'opening-time'
  );
  const openingTimeQuery = { _id: new ObjectId(id) };
  const openingTimeOptions = {
    projection: { open: 1, day: 1, timeSlots: 1 },
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
