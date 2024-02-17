import { updateOpeningTimeById } from '@/src/lib/database/collection/opening-time/update-opening-time';
import { VerifyUserIsEmployeeHandler } from '@/src/lib/handler/appointments-handler';
import { VerifyUserHasRouteAccessHandler } from '@/src/lib/handler/auth-handler';
import { routeContextDashboardAppointmentSchema } from '@/src/lib/validation/dashboard/route-dashboard';
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
  const verifyUserIsEmployeeHandler = new VerifyUserIsEmployeeHandler();

  verifyUserHasRouteAccessHandler.setNext(verifyUserIsEmployeeHandler);

  try {
    const json = await request.json();
    const nextResponse = await verifyUserHasRouteAccessHandler.handle(json);

    if (nextResponse !== null) {
      return nextResponse;
    }

    const { params } = context;
    const openingTime = json;
    const result = await updateOpeningTimeById(params.id, openingTime);
    if (!result) {
      return NextResponse.json('Failed', { status: 400 });
    }

    return NextResponse.json({ result }, { status: 200 });
  } catch (err) {
    return NextResponse.json('Forbidden', { status: 403 });
  }
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
