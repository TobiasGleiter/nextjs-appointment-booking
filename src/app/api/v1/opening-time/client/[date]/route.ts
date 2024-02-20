import { readAllAppointmentsForGivenDay } from '@/src/lib/database/collection/appointments/read-appointments';
import { readOpeningTimeByDay } from '@/src/lib/database/collection/opening-time/read-opening-time';
import { VerifyUserHasRouteAccessHandler } from '@/src/lib/handler/auth-handler';
import { getAllBookedAppointments } from '@/src/lib/helper/appointments-helper';
import {
  getAllFreeAppointmentTimeSlots,
  getWeekdayFromMondayToSunday,
} from '@/src/lib/helper/date-helper';
import { routeContextClientOpeningTimeSchema } from '@/src/lib/validation/opening-time/route-opening-time';
import { OpeningTime } from '@/src/types/database/opening-time-database';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET(
  request: Request,
  context: z.infer<typeof routeContextClientOpeningTimeSchema>
) {
  const verifyUserHasRouteAccessHandler = new VerifyUserHasRouteAccessHandler();

  verifyUserHasRouteAccessHandler;

  try {
    const json = {};
    const nextResponse = await verifyUserHasRouteAccessHandler.handle(json);

    if (nextResponse !== null) {
      return nextResponse;
    }

    const { params } = context;
    const weekdayFromMondayToSunday = getWeekdayFromMondayToSunday(params.date);
    const openingTime = await readOpeningTimeByDay(weekdayFromMondayToSunday);

    if (openingTime.open === false) {
      return NextResponse.json({ result: {} }, { status: 200 });
    }

    const appointmentsForGivenDay = await readAllAppointmentsForGivenDay(
      params.date
    );
    const alreadyBookedAppointments = await getAllBookedAppointments(
      appointmentsForGivenDay
    );
    const freeAppointmentTimeSlots = getAllFreeAppointmentTimeSlots(
      openingTime,
      alreadyBookedAppointments
    );

    const result: OpeningTime = {
      open: openingTime.open,
      day: openingTime.day,
      timeSlots: freeAppointmentTimeSlots,
    };

    if (!result) {
      return NextResponse.json('Failed', { status: 400 });
    }

    return NextResponse.json({ result }, { status: 200 });
  } catch (err) {
    return NextResponse.json('Forbidden', { status: 403 });
  }
}
export async function POST() {
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
