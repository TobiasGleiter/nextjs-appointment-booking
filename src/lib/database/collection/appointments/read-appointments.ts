import { readCurrentUser } from '@/src/lib/auth/read-auth';
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
