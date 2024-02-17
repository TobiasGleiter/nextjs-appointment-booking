import { DeleteResult, ObjectId } from 'mongodb';
import { DatabaseAdapter } from '../../adapter-database';
import { connectToDatabaseAndCollection } from '../../connect-database';
import { MongoDBRepository } from '../../repository/mongodb-repository';

export async function deleteAppointmentById(
  appointmentId: string
): Promise<DeleteResult> {
  const appointmentsCollection = await connectToDatabaseAndCollection(
    'appointments'
  );
  const appointmentsQuery = { _id: new ObjectId(appointmentId) };
  const appointmentsOptions = {};

  const sellersRepository = new MongoDBRepository(appointmentsCollection);
  const databaseAdapter = new DatabaseAdapter(sellersRepository);
  const result: DeleteResult = await databaseAdapter.deleteOne(
    appointmentsQuery,
    appointmentsOptions
  );

  return result;
}
