import { readAllAppointmentsForGivenDay } from '@/src/lib/database/collection/appointments/read-appointments';
import { readOpeningTimeByDay } from '@/src/lib/database/collection/opening-time/read-opening-time';
import { VerifyUserHasRouteAccessHandler } from '@/src/lib/handler/auth-handler';
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
    let selectedDateByClient = new Date(params.date);
    const timezoneOffset = selectedDateByClient.getTimezoneOffset();
    selectedDateByClient.setMinutes(
      selectedDateByClient.getMinutes() - timezoneOffset
    );
    const weekdaySundayToSaturday = selectedDateByClient.getUTCDay();
    const weekdayMondayToSunday = (weekdaySundayToSaturday + 6) % 7;
    const openingTime = await readOpeningTimeByDay(weekdayMondayToSunday);

    if (openingTime.open === false) {
      return NextResponse.json({ result: {} }, { status: 200 });
    }

    // read the appointments for that day
    const alreadyBookedAppointments = await readAllAppointmentsForGivenDay(
      selectedDateByClient
    );

    const bookedTimes = alreadyBookedAppointments.map((date) => {
      const appointmentDate = new Date(date);
      // Adjusting for timezone offset
      const timezoneOffset = appointmentDate.getTimezoneOffset();
      appointmentDate.setMinutes(appointmentDate.getMinutes() + timezoneOffset);
      return {
        hour: appointmentDate.getHours(),
        minute: appointmentDate.getMinutes(),
      };
    });

    const filteredTimeSlots = openingTime.timeSlots.filter((slot) => {
      const slotTime = slot.time.split(':');
      const slotHour = parseInt(slotTime[0]);
      const slotMinute = parseInt(slotTime[1]);

      // Check if slot matches any booked time
      return !bookedTimes.some(
        (bookedTime) =>
          bookedTime.hour === slotHour && bookedTime.minute === slotMinute
      );
    });

    const result: OpeningTime = {
      open: openingTime.open,
      day: openingTime.day,
      timeSlots: filteredTimeSlots,
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
