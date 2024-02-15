import { readCurrentUser } from '@/src/lib/auth/read-auth';
import { createAppointment } from '@/src/lib/database/collection/appointments/create-appointments';
import {
  VerifyAppointmentSchemaHandler,
  VerifyBusinessIsOpenHandler,
  VerifySellerIsAvailableHandler,
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
  const verifySellerIsAvailableHandler = new VerifySellerIsAvailableHandler();

  verifyUserHasRouteAccessHandler
    .setNext(verifyAppointmentSchemaHandler)
    .setNext(verifyBusinessIsOpenHandler)
    .setNext(verifySellerIsAvailableHandler);

  try {
    const json = await request.json();
    const nextResponse = await verifyUserHasRouteAccessHandler.handle(json);

    if (nextResponse !== null) {
      return nextResponse;
    }

    // 3. Book Appointment
    const user = await readCurrentUser();
    const germanDate = new Date(json.appointmentDate);
    console.log(germanDate);
    const newAppointment: Appointment = {
      appointmentDate: germanDate,
      clientEmail: user.email,
      clientName: user.name,
      bookedAt: new Date(),
      sellerId: new ObjectId(json.sellerId),
      clientNotes: json.clientNotes,
    };

    const result = await createAppointment(newAppointment);
    if (!result) {
      return NextResponse.json('Failed', { status: 400 });
    }

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json('Forbidden', { status: 403 });
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
  return NextResponse.json('Forbidden', { status: 403 });
}
export async function OPTIONS() {
  return NextResponse.json('Forbidden', { status: 403 });
}
