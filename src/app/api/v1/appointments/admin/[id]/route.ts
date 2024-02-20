import { deleteAppointmentById } from '@/src/lib/database/collection/appointments/delete-appointments';
import { updateAppointmentById } from '@/src/lib/database/collection/appointments/update-appointment';
import {
  VerifyAppointmentAdminSchemaHandler,
  VerifyAppointmentIsBetweenOpeningHoursHandler,
  VerifyBusinessIsOpenOnWeekdayHandler,
  VerifySellerIsAvailableHandler,
  VerifyUserIsEmployeeHandler,
} from '@/src/lib/handler/appointments-handler';
import { VerifyUserHasRouteAccessHandler } from '@/src/lib/handler/auth-handler';
import { getUTCDate } from '@/src/lib/helper/date-helper';
import { routeContextDashboardAppointmentSchema } from '@/src/lib/validation/dashboard/route-dashboard';
import { Appointment } from '@/src/types/database/appointments-database';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * This route handles update appointments from the dashboard (as admin or seller)
 * @param request
 * @param context
 * @returns
 */
export async function PATCH(
  request: Request,
  context: z.infer<typeof routeContextDashboardAppointmentSchema>
) {
  // Init necessary handlers
  const verifyUserHasRouteAccessHandler = new VerifyUserHasRouteAccessHandler();
  const verifyAppointmentAdminSchemaHandler =
    new VerifyAppointmentAdminSchemaHandler();
  const verifyUserIsEmployeeHandler = new VerifyUserIsEmployeeHandler();
  const verifyBusinessIsOpenOnWeekdayHandler =
    new VerifyBusinessIsOpenOnWeekdayHandler();
  const verifyAppointmentIsBetweenOpeningHoursHandler =
    new VerifyAppointmentIsBetweenOpeningHoursHandler();
  const verifySellerIsAvailableHandler = new VerifySellerIsAvailableHandler();

  // Setup chain of responsibility
  verifyUserHasRouteAccessHandler
    .setNext(verifyUserIsEmployeeHandler)
    .setNext(verifyAppointmentAdminSchemaHandler)
    .setNext(verifyBusinessIsOpenOnWeekdayHandler)
    .setNext(verifyAppointmentIsBetweenOpeningHoursHandler)
    .setNext(verifySellerIsAvailableHandler);

  try {
    const json = await request.json();
    const nextResponse = await verifyUserHasRouteAccessHandler.handle(json);

    if (nextResponse !== null) {
      return nextResponse;
    }

    const updatedAppointment: Appointment = {
      appointmentDate: new Date(json.appointmentDate),
      clientEmail: json.clientEmail,
      clientName: json.clientName,
      bookedAt: getUTCDate(new Date()),
      sellerId: new ObjectId(json.sellerId),
      clientNotes: json.clientNotes,
    };

    const { params } = context;
    const appointmentId = params.id;
    const result = await updateAppointmentById(
      appointmentId,
      updatedAppointment
    );

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
  // Init necessary handlers
  const verifyUserHasRouteAccessHandler = new VerifyUserHasRouteAccessHandler();
  const verifyUserIsEmployeeHandler = new VerifyUserIsEmployeeHandler();

  // Setup chain of responsibility
  verifyUserHasRouteAccessHandler.setNext(verifyUserIsEmployeeHandler);

  try {
    const json = {};
    const nextResponse = await verifyUserHasRouteAccessHandler.handle(json);

    if (nextResponse !== null) {
      return nextResponse;
    }

    const { params } = context;
    const appointmentId = params.id;
    const result = await deleteAppointmentById(appointmentId);

    if (!result) {
      return NextResponse.json('Failed', { status: 400 });
    }

    return NextResponse.json({ result }, { status: 200 });
  } catch (err) {
    return NextResponse.json('Forbidden', { status: 403 });
  }
}
export async function GET() {
  return NextResponse.json('Forbidden', { status: 403 });
}
export async function POST() {
  return NextResponse.json('Forbidden', { status: 403 });
}
export async function PUT() {
  return NextResponse.json('Forbidden', { status: 403 });
}
export async function OPTIONS() {
  return NextResponse.json('Forbidden', { status: 403 });
}
