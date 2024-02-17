import { deleteAppointmentById } from '@/src/lib/database/collection/appointments/delete-appointments';
import { updateAppointmentById } from '@/src/lib/database/collection/appointments/update-appointment';
import {
  VerifyAppointmentIsBetweenOpeningHoursHandler,
  VerifyAppointmentSchemaHandler,
  VerifyBusinessIsOpenOnWeekdayHandler,
  VerifySellerIsAvailableHandler,
} from '@/src/lib/handler/appointments-handler';
import { VerifyUserHasRouteAccessHandler } from '@/src/lib/handler/auth-handler';
import { getUTCDate } from '@/src/lib/helper/date-helper';
import { routeContextDashboardAppointmentSchema } from '@/src/lib/validation/dashboard/route-dashboard';
import { Appointment } from '@/src/types/database/appointments-database';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET() {
  return NextResponse.json('Forbidden', { status: 403 });
}
export async function POST() {
  return NextResponse.json('Forbidden', { status: 403 });
}
export async function PATCH(
  request: Request,
  context: z.infer<typeof routeContextDashboardAppointmentSchema>
) {
  const verifyUserHasRouteAccessHandler = new VerifyUserHasRouteAccessHandler();
  const verifyAppointmentSchemaHandler = new VerifyAppointmentSchemaHandler();
  const verifyBusinessIsOpenOnWeekdayHandler =
    new VerifyBusinessIsOpenOnWeekdayHandler();
  const verifyAppointmentIsBetweenOpeningHoursHandler =
    new VerifyAppointmentIsBetweenOpeningHoursHandler();
  const verifySellerIsAvailableHandler = new VerifySellerIsAvailableHandler();

  verifyUserHasRouteAccessHandler
    .setNext(verifyAppointmentSchemaHandler)
    .setNext(verifyBusinessIsOpenOnWeekdayHandler)
    .setNext(verifyAppointmentIsBetweenOpeningHoursHandler)
    .setNext(verifySellerIsAvailableHandler);

  // check if admin
  // check if data is valid
  // check if search params are valid

  try {
    const json = await request.json();
    const nextResponse = await verifyUserHasRouteAccessHandler.handle(json);

    if (nextResponse !== null) {
      return nextResponse;
    }

    const { params } = context;
    const newAppointment: Appointment = {
      appointmentDate: new Date(json.appointmentDate),
      clientEmail: json.clientEmail,
      clientName: json.clientName,
      bookedAt: getUTCDate(new Date()),
      sellerId: new ObjectId(json.sellerId),
      clientNotes: json.clientNotes,
    };
    const result = await updateAppointmentById(params.id, newAppointment);
    if (!result) {
      return NextResponse.json('Failed', { status: 400 });
    }

    return NextResponse.json({ result }, { status: 200 });
  } catch (err) {
    return NextResponse.json('Forbidden', { status: 403 });
  }
}
export async function DELETE(
  request: Request,
  context: z.infer<typeof routeContextDashboardAppointmentSchema>
) {
  const verifyUserHasRouteAccessHandler = new VerifyUserHasRouteAccessHandler();

  verifyUserHasRouteAccessHandler;
  // check if admin
  // check if search params are valid

  try {
    const json = {};
    const nextResponse = await verifyUserHasRouteAccessHandler.handle(json);

    if (nextResponse !== null) {
      return nextResponse;
    }

    const { params } = context;
    const result = await deleteAppointmentById(params.id);
    if (!result) {
      return NextResponse.json('Failed', { status: 400 });
    }

    return NextResponse.json({ result }, { status: 200 });
  } catch (err) {
    return NextResponse.json('Forbidden', { status: 403 });
  }
}
export async function PUT() {
  return NextResponse.json('Forbidden', { status: 403 });
}
export async function OPTIONS() {
  return NextResponse.json('Forbidden', { status: 403 });
}
