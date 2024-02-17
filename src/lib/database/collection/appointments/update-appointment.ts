import { appointmentSchema } from '@/src/lib/validation/appointment/database-appointment';
import { ObjectId, UpdateResult } from 'mongodb';
import { z } from 'zod';
import { DatabaseAdapter } from '../../adapter-database';
import { connectToDatabaseAndCollection } from '../../connect-database';
import { MongoDBRepository } from '../../repository/mongodb-repository';

export async function updateAppointmentById(
  appointmentId: string,
  appointment: z.infer<typeof appointmentSchema>
): Promise<UpdateResult> {
  const appointmentsCollection = await connectToDatabaseAndCollection(
    'appointments'
  );
  const appointmentsQuery = { _id: new ObjectId(appointmentId) };
  const appointmentsUpdate = {
    $set: appointment,
  };

  const sellersRepository = new MongoDBRepository(appointmentsCollection);
  const databaseAdapter = new DatabaseAdapter(sellersRepository);
  const result: UpdateResult = await databaseAdapter.updateOne(
    appointmentsQuery,
    appointmentsUpdate
  );

  return result;
}
