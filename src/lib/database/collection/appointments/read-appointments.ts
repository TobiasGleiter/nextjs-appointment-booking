import { Appointment } from '@/src/types/database/appointments-database';
import { addDays, endOfDay, startOfDay } from 'date-fns';
import { ObjectId } from 'mongodb';
import { DatabaseAdapter } from '../../adapter-database';
import { connectToDatabaseAndCollection } from '../../connect-database';
import { MongoDBRepository } from '../../repository/mongodb-repository';
import { readSellerById } from '../seller/read-seller';

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
  const appointmentsCollection = await connectToDatabaseAndCollection(
    'appointments'
  );

  const appointmentsQuery = {
    $and: [{ sellerId: sellerId }, { appointmentDate: appointmentDate }],
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
    projection: {
      appointmentDate: 1,
      clientName: 1,
      clientEmail: 1,
      sellerId: 1,
    },
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
    projection: {
      appointmentDate: 1,
      clientName: 1,
      clientEmail: 1,
      sellerId: 1,
    },
    sort: {
      appointmentDate: 1,
    },
  };

  const today = startOfDay(new Date());
  const nextWeek = addDays(today, 7);
  const endOfNextWeek = endOfDay(nextWeek);

  const appointmentsQuery = {
    appointmentDate: {
      $gte: today,
      // $lte: endOfNextWeek,
    },
  };

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

export async function readAllAppointmentsWithSellerNameForSevenDays(): Promise<
  Appointment[]
> {
  const appointments = await readAllAppointments();
  for (const appointment of appointments) {
    const { sellerId } = appointment;
    const seller = await readSellerById(sellerId.toString());
    if (seller) appointment.sellerName = seller.name;
  }
  return appointments;
}

/**
 * Get all appointments for the given day
 * @returns appointments
 */
export async function readAllAppointmentsForGivenDay(
  date: Date
): Promise<Appointment[]> {
  const appointmentsCollection = await connectToDatabaseAndCollection(
    'appointments'
  );
  const appointmentOptions = {
    projection: {
      appointmentDate: 1,
    },
    sort: {
      appointmentDate: 1,
    },
  };

  const startOfToday = startOfDay(date);
  const endOfToday = endOfDay(date);

  const appointmentsQuery = {
    appointmentDate: {
      $gte: startOfToday,
      $lte: endOfToday,
    },
  };

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
