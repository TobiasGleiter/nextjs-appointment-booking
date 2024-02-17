import { readCurrentUser } from '@/src/lib/auth/read-auth';
import { Appointment } from '@/src/types/database/appointments-database';
import { ObjectId } from 'mongodb';
import { DatabaseAdapter } from '../../adapter-database';
import { connectToDatabaseAndCollection } from '../../connect-database';
import { MongoDBRepository } from '../../repository/mongodb-repository';

/**
 * Reads if the appointment is available and not already booked
 * @param appointmentDate
 * @param sellerId
 * @returns
 */
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

  const appointmentsRepository = new MongoDBRepository(appointmentsCollection);
  const databaseAdapter = new DatabaseAdapter(appointmentsRepository);
  const count: number = await databaseAdapter.countDocuments(appointmentsQuery);

  return count == 0;
}

/**
 * Get current booked appointment
 * @param id
 * @returns appointment
 */
export async function readAppointmentById(id: string) {
  const appointmentsCollection = await connectToDatabaseAndCollection(
    'appointments'
  );
  const appointmentOptions = {
    projection: { appointmentDate: 1, clientName: 1 },
  };
  const appointmentsQuery = {
    _id: new ObjectId(id),
  };

  const appointmentsRepository = new MongoDBRepository(appointmentsCollection);
  const databaseAdapter = new DatabaseAdapter(appointmentsRepository);
  const response = await databaseAdapter.findOne(
    appointmentsQuery,
    appointmentOptions
  );

  // workaround because of passing data from server to client
  const appointment: Appointment = JSON.parse(JSON.stringify(response));
  return appointment;
}

/**
 * Get all appointments
 * @returns appointments
 */
export async function readAllAppointments() {
  const appointmentsCollection = await connectToDatabaseAndCollection(
    'appointments'
  );
  const appointmentOptions = {
    projection: { appointmentDate: 1, clientName: 1, clientEmail: 1 },
  };
  const appointmentsQuery = {};

  const appointmentsRepository = new MongoDBRepository(appointmentsCollection);
  const databaseAdapter = new DatabaseAdapter(appointmentsRepository);
  const response = await databaseAdapter.find(
    appointmentsQuery,
    appointmentOptions
  );

  // workaround because of passing data from server to client
  const appointments: Appointment[] = JSON.parse(JSON.stringify(response));
  return appointments;
}
