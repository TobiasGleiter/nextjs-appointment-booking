import { routeRequestPostAppointmentSchema } from '@/src/lib/validation/appointment/route-appointment';
import { Appointment } from '@/src/types/database/appointments-database';
import { InsertOneResult, ObjectId } from 'mongodb';
import { z } from 'zod';
import { connectToDatabaseAndCollection } from '../../connect-database';

/**
 * Insert a new appointment
 * @param appointment
 * @returns result
 */
export async function createAppointment(
  appointment: z.infer<typeof routeRequestPostAppointmentSchema>
): Promise<InsertOneResult> {
  const appointmentCollection = await connectToDatabaseAndCollection(
    'appointments'
  );
  const appointmentOptions = {};
  const insertAppointment: Appointment = {
    bookedAt: appointment.bookedAt,
    clientEmail: appointment.clientEmail,
    clientName: appointment.clientName,
    clientNotes: appointment.clientNotes,
    sellerId: new ObjectId(appointment.sellerId),
  };

  const result: InsertOneResult = await appointmentCollection.insertOne(
    insertAppointment,
    appointmentOptions
  );
  return result;
}
