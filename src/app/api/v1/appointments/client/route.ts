import { readCurrentUser } from '@/src/lib/auth/read-auth';
import { createAppointment } from '@/src/lib/database/collection/appointments/create-appointments';
import {
  VerifyAppointmentIsBetweenOpeningHoursHandler,
  VerifyAppointmentSchemaHandler,
  VerifyBusinessIsOpenOnWeekdayHandler,
  VerifySellerIsAvailableHandler,
} from '@/src/lib/handler/appointments-handler';
import { VerifyUserHasRouteAccessHandler } from '@/src/lib/handler/auth-handler';
import { getUTCDate } from '@/src/lib/helper/date-helper';
import { Appointment } from '@/src/types/database/appointments-database';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

/**
 * This routes handles creating a new appointment as a client
 * @param request
 * @returns
 */
export async function POST(request: Request) {
  // Init necessary handlers
  const verifyUserHasRouteAccessHandler = new VerifyUserHasRouteAccessHandler();
  const verifyAppointmentSchemaHandler = new VerifyAppointmentSchemaHandler();
  const verifyBusinessIsOpenOnWeekdayHandler =
    new VerifyBusinessIsOpenOnWeekdayHandler();
  const verifyAppointmentIsBetweenOpeningHoursHandler =
    new VerifyAppointmentIsBetweenOpeningHoursHandler();
  const verifySellerIsAvailableHandler = new VerifySellerIsAvailableHandler();

  // Setup chain of responsibility
  verifyUserHasRouteAccessHandler
    .setNext(verifyAppointmentSchemaHandler)
    .setNext(verifyBusinessIsOpenOnWeekdayHandler)
    .setNext(verifyAppointmentIsBetweenOpeningHoursHandler)
    .setNext(verifySellerIsAvailableHandler);

  try {
    const json = await request.json();
    const nextResponse = await verifyUserHasRouteAccessHandler.handle(json);

    if (nextResponse !== null) {
      return nextResponse;
    }

    const user = await readCurrentUser();
    const newAppointment: Appointment = {
      appointmentDate: new Date(json.appointmentDate),
      clientEmail: user.email,
      clientName: user.name,
      bookedAt: getUTCDate(new Date()),
      sellerId: new ObjectId(json.sellerId),
      clientNotes: json.clientNotes,
    };

    const result = await createAppointment(newAppointment);
    if (!result) {
      return NextResponse.json('Failed', { status: 400 });
    }

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json('Forbidden1', { status: 403 });
  }
}
export async function GET() {
  return NextResponse.json('Forbidden', { status: 403 });
}
export async function PATCH() {
  return NextResponse.json('Forbidden', { status: 403 });
}
export async function DELETE() {
  return NextResponse.json('Forbidden', { status: 403 });
}
export async function PUT() {
  return NextResponse.json('Forbidden1', { status: 403 });
}
export async function OPTIONS() {
  return NextResponse.json('Forbidden', { status: 403 });
}
