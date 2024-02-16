import { readCurrentUser } from '@/src/lib/auth/read-auth';
import { Appointment } from '@/src/types/database/appointments-database';
import { ObjectId } from 'mongodb';
import { connectToDatabaseAndCollection } from '../../connect-database';

export async function readAppointmentIsAvailable(
  appointmentDate: Date,
  sellerId: ObjectId
): Promise<boolean> {
  const user = await readCurrentUser();
  const appointmentsCollection = await connectToDatabaseAndCollection(
    'appointments'
  );

  const appointmentsQuery = {
    $and: [
      { clientEmail: user.email },
      { sellerId: sellerId },
      { appointmentDate: appointmentDate },
    ],
  };
  const count: number = await appointmentsCollection.countDocuments(
    appointmentsQuery
  );

  return count == 0;
}

/**
 * Get current booked appointment
 * @param id
 * @returns appointment
 */
export async function readAppointmentById(id: string) {
  const user = await readCurrentUser();
  const appointmentsCollection = await connectToDatabaseAndCollection(
    'appointments'
  );
  const appointmentOptions = {
    projection: { appointmentDate: 1, clientName: 1 },
  };
  const appointmentsQuery = {
    _id: new ObjectId(id),
  };
  const response = await appointmentsCollection.findOne(
    appointmentsQuery,
    appointmentOptions
  );
  // workaround because of passing data from server to client
  const appointment: Appointment = JSON.parse(JSON.stringify(response));
  return appointment;
}
