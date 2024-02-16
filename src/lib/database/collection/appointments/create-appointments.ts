import { appointmentSchema } from '@/src/lib/validation/appointment/database-appointment';
import { InsertOneResult } from 'mongodb';
import { z } from 'zod';
import { DatabaseAdapter } from '../../adapter-database';
import { connectToDatabaseAndCollection } from '../../connect-database';
import { MongoDBRepository } from '../../repository/mongodb-repository';

/**
 * Insert a new appointment into the database/collection
 * @param appointment
 * @returns result
 */
export async function createAppointment(
  appointment: z.infer<typeof appointmentSchema>
): Promise<InsertOneResult> {
  const appointmentsCollection = await connectToDatabaseAndCollection(
    'appointments'
  );

  const appointmentsOptions = {};
  const appointmentsRepository = new MongoDBRepository(appointmentsCollection);
  const databaseAdapter = new DatabaseAdapter(appointmentsRepository);

  const insertAppointment = appointment;
  const result = await databaseAdapter.insertOne(
    insertAppointment,
    appointmentsOptions
  );
  return result;
}
