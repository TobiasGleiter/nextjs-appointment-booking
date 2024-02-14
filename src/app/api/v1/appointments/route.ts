import { readCurrentUser } from '@/src/lib/auth/read-auth';
import { createAppointment } from '@/src/lib/database/collection/appointments/create-appointments';
import { routeRequestPostAppointmentSchema } from '@/src/lib/validation/appointment/route-appointment';
import { Appointment } from '@/src/types/database/appointments-database';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

/**
 * This routes handles creating a new appointment
 * @param request
 * @returns
 */
export async function POST(request: Request) {
  try {
    const user = await readCurrentUser();
    if (!user) {
      return NextResponse.json('Forbidden', { status: 403 });
    }

    const json: Appointment = await request.json();
    const parsedAppointment = routeRequestPostAppointmentSchema.parse(json);
    const newAppointment: Appointment = {
      bookedAt: new Date(parsedAppointment.bookedAt),
      clientEmail: user.email,
      clientName: user.name,
      clientNotes: parsedAppointment.clientNotes,
      sellerId: new ObjectId(parsedAppointment.sellerId),
    };

    const response = await createAppointment(newAppointment);
    if (!response) {
      return NextResponse.json('Failed', { status: 400 });
    }

    // Add appointment to the collection

    return NextResponse.json('Success', { status: 200 });
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
