import { createAppointment } from '@/src/lib/database/collection/appointments/create-appointments';
import {
  VerifyAppointmentIsBetweenOpeningHoursHandler,
  VerifyAppointmentSchemaHandler,
  VerifyBusinessIsOpenOnWeekdayHandler,
  VerifySellerIsAvailableHandler,
  VerifyUserIsEmployeeHandler,
} from '@/src/lib/handler/appointments-handler';
import { VerifyUserHasRouteAccessHandler } from '@/src/lib/handler/auth-handler';
import { getUTCDate } from '@/src/lib/helper/date-helper';
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
  const verifyUserIsEmployeeHandler = new VerifyUserIsEmployeeHandler();
  const verifyAppointmentSchemaHandler = new VerifyAppointmentSchemaHandler();
  const verifyBusinessIsOpenOnWeekdayHandler =
    new VerifyBusinessIsOpenOnWeekdayHandler();
  const verifyAppointmentIsBetweenOpeningHoursHandler =
    new VerifyAppointmentIsBetweenOpeningHoursHandler();
  const verifySellerIsAvailableHandler = new VerifySellerIsAvailableHandler();

  verifyUserHasRouteAccessHandler
    .setNext(verifyAppointmentSchemaHandler)
    .setNext(verifyUserIsEmployeeHandler)
    .setNext(verifyBusinessIsOpenOnWeekdayHandler)
    .setNext(verifyAppointmentIsBetweenOpeningHoursHandler)
    .setNext(verifySellerIsAvailableHandler);

  try {
    const json = await request.json();
    const nextResponse = await verifyUserHasRouteAccessHandler.handle(json);

    if (nextResponse !== null) {
      return nextResponse;
    }

    const newAppointment: Appointment = {
      appointmentDate: new Date(json.appointmentDate),
      clientEmail: json.clientEmail,
      clientName: json.clientName,
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
export async function PUT(request: Request) {
  const verifyUserHasRouteAccessHandler = new VerifyUserHasRouteAccessHandler();
  const verifyUserIsEmployeeHandler = new VerifyUserIsEmployeeHandler();
  const verifyAppointmentSchemaHandler = new VerifyAppointmentSchemaHandler();
  const verifyBusinessIsOpenOnWeekdayHandler =
    new VerifyBusinessIsOpenOnWeekdayHandler();
  const verifyAppointmentIsBetweenOpeningHoursHandler =
    new VerifyAppointmentIsBetweenOpeningHoursHandler();
  const verifySellerIsAvailableHandler = new VerifySellerIsAvailableHandler();

  verifyUserHasRouteAccessHandler
    .setNext(verifyUserIsEmployeeHandler)
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

    const newAppointment: Appointment = {
      appointmentDate: new Date(json.appointmentDate),
      clientEmail: json.clientEmail,
      clientName: json.clientName,
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
export async function OPTIONS() {
  return NextResponse.json('Forbidden', { status: 403 });
}