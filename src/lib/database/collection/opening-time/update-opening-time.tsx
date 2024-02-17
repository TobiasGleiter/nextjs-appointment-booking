import { AnyBulkWriteOperation, ObjectId, UpdateResult } from 'mongodb';
import { DatabaseAdapter } from '../../adapter-database';
import { connectToDatabaseAndCollection } from '../../connect-database';
import { MongoDBRepository } from '../../repository/mongodb-repository';

export async function updateOpeningTimeById(
  openingTimeId: string,
  openingTime: AnyBulkWriteOperation
): Promise<UpdateResult> {
  const appointmentsCollection = await connectToDatabaseAndCollection(
    'opening-time'
  );
  const appointmentsQuery = { _id: new ObjectId(openingTimeId) };
  const appointmentsUpdate = {
    $set: openingTime,
  };

  const sellersRepository = new MongoDBRepository(appointmentsCollection);
  const databaseAdapter = new DatabaseAdapter(sellersRepository);
  const result: UpdateResult = await databaseAdapter.updateOne(
    appointmentsQuery,
    appointmentsUpdate
  );

  return result;
}
