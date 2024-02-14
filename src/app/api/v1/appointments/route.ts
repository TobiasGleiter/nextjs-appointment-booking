import { routeRequestPostAppointmentSchema } from '@/src/lib/validation/appointment/route-appointment';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json('Forbidden', { status: 403 });
}
export async function POST(request: Request) {
  const json = await request.json();
  const parsedAppointment = routeRequestPostAppointmentSchema.parse(json);

  console.log(parsedAppointment);

  // Add appointment to the collection

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
