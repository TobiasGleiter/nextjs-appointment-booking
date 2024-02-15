import { readCurrentUser } from '@/src/lib/auth/read-auth';
import {
  VerifyAppointmentSchemaHandler,
  VerifyBusinessIsOpenHandler,
} from '@/src/lib/handler/appointments-handler';
import { VerifyUserHasRouteAccessHandler } from '@/src/lib/handler/auth-handler';
import { Appointment } from '@/src/types/database/appointments-database';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

/**
 * This routes handles creating a new appointment
 * @param request
 * @returns
 */

export async function POST(request: Request) {
  const verifyUserHasRouteAccessHandler = new VerifyUserHasRouteAccessHandler();
  const verifyAppointmentSchemaHandler = new VerifyAppointmentSchemaHandler();
  const verifyBusinessIsOpenHandler = new VerifyBusinessIsOpenHandler();
  const VerifySellerIsFreeOnDateAndTimeHandler =
    new VerifySellerIsFreeOnDateAndTimeHandler();

  // 0. Auth and validation
  // 0.1 User is authenticated?
  // 0.2 input fits to schema?
  // 1. Check opening time (opening-time collection)
  // 1.1 Check opening weekday
  // 1.2 Check opening time
  // 2. Check Seller
  // 2.1 Check Seller does work on this weekday
  // 2.2 Check Seller are free on this date and time
  verifyUserHasRouteAccessHandler
    .setNext(verifyAppointmentSchemaHandler)
    .setNext(verifyBusinessIsOpenHandler);

  try {
    const json = await request.json();
    const nextResponse = await verifyUserHasRouteAccessHandler.handle(json);

    if (nextResponse !== null) {
      return nextResponse;
    }

    // 3. Book Appointment
    const user = await readCurrentUser();
    const newAppointment: Appointment = {
      appointmentDate: new Date(json.appointmentDate),
      clientEmail: user.email,
      clientName: user.name,
      bookedAt: new Date(),
      sellerId: new ObjectId(json.sellerId),
      clientNotes: json.clientNotes,
    };

    // const response = await createAppointment(newAppointment);
    // if (!response) {
    //   return NextResponse.json('Failed', { status: 400 });
    // }
    console.log('Booked!');

    return NextResponse.json('Success', { status: 200 });
  } catch (error) {
    return NextResponse.json('Forbidden', { status: 403 });
  }
}
