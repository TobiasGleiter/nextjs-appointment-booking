import { openingTime } from '@/src/config/opening-time-config';
import { DayOfWeek } from '@/src/types/helper/appointments-helper';
import { getDay } from 'date-fns';
import { ObjectId } from 'mongodb';
import { readAppointmentIsAvailable } from '../database/collection/appointments/read-appointments';

/**
 * Select the weekday from the given date
 * @param date
 * @returns weekday: 'sunday', ...
 */
export function selectWeekdayNameFromDate(date: Date): DayOfWeek {
  const dayOfWeek = getDay(date);
  const dayNames: DayOfWeek[] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  return dayNames[dayOfWeek];
}

/**
 *  Check if the given appointment date is in the open times of the business
 * @param appointmentDate
 * @returns
 */
export function checkIfBusinessIsOpen(appointmentDate: Date): boolean {
  const dayOfWeekString = selectWeekdayNameFromDate(appointmentDate);
  const dayConfig = openingTime[dayOfWeekString];
  if (!dayConfig || !dayConfig.open) {
    return false;
  }

  const appointmentTime = appointmentDate.toISOString().slice(11, 19);
  const startTime = dayConfig.start;
  const endTime = dayConfig.end;

  return appointmentTime >= startTime && appointmentTime <= endTime;
}

/**
 *  Check if the given appointment date is in the open times of the business
 * @param appointmentDate
 * @returns
 */
export async function checkIfSellerIsAvailable(
  appointmentDate: Date,
  sellerId: ObjectId
): Promise<boolean> {
  const isAppointmentAvailable = await readAppointmentIsAvailable(
    appointmentDate,
    sellerId
  );
  if (!isAppointmentAvailable) {
    return false;
  }

  return true;
}
