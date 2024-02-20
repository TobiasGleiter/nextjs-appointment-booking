import {
  OpeningTime,
  TimeSlots,
} from '@/src/types/database/opening-time-database';
import { Locale } from '../lang/i18.config';

export function getUTCDate(date: Date): Date {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
}

/**
 * return weekday from Monday to Sunday (0-6)
 * @param date
 * @returns
 */
export function getWeekdayFromMondayToSunday(date: Date): number {
  const selectedDateByClient = new Date(date);
  const weekdayDate = getUTCDate(selectedDateByClient);

  const weekdaySundayToSaturday = weekdayDate.getUTCDay();
  const weekdayMondayToSunday = (weekdaySundayToSaturday + 6) % 7;
  return weekdayMondayToSunday;
}

export function getAllFreeAppointmentTimeSlots(
  openingTime: OpeningTime,
  alreadyBookedAppointments: Date[]
): TimeSlots[] {
  const bookedTimes = alreadyBookedAppointments.map((date) => {
    const appointmentDate = new Date(date);
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

  return filteredTimeSlots;
}

/**
 * Format date to make it readable for humans
 * @param date
 * @param lang
 * @return formatted date
 */
export function formatDateForHumans(date: Date, lang: Locale): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC',
  };
  return date.toLocaleDateString(lang, options);
}

export function getDayForHumans(day: number): string {
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  return daysOfWeek[day];
}
