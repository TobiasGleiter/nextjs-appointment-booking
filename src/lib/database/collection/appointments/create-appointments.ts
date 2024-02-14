import { appointmentSchema } from '@/src/lib/validation/appointment/database-appointment';
import { Appointment } from '@/src/types/database/appointments-database';
import { InsertOneResult } from 'mongodb';
import { z } from 'zod';
import { connectToDatabaseAndCollection } from '../../connect-database';

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
  const insertAppointment: Appointment = {
    bookedAt: appointment.bookedAt,
    clientEmail: appointment.clientEmail,
    clientName: appointment.clientName,
    clientNotes: appointment.clientNotes,
    sellerId: appointment.sellerId,
  };

  const result: InsertOneResult = await appointmentsCollection.insertOne(
    insertAppointment,
    appointmentsOptions
  );
  return result;
}
