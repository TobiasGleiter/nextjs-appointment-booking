import { ObjectId } from 'mongodb';
import { readAppointmentIsAvailable } from '../database/collection/appointments/read-appointments';
import { readOpeningTime } from '../database/collection/opening-time/read-opening-time';

/**
 *  Check if the given appointment date is in the open times of the business
 * @param appointmentDate
 * @returns true/false
 */
export async function checkIfBusinessIsOpenOnWeekday(
  appointmentDate: Date
): Promise<boolean> {
  const date = new Date(appointmentDate);
  const weekdaySundayToSaturday = date.getUTCDay();
  const weekdayMondayToSunday = (weekdaySundayToSaturday + 6) % 7;

  const openingTime = await readOpeningTime(0);

  // check the database

  // const dayConfig = openingTime[dayOfWeekString];
  // if (!dayConfig || !dayConfig.open) {
  //   return false;
  // }

  // const appointmentTime = appointmentDate.toISOString().slice(11, 19);
  // const startTime = dayConfig.start;
  // const endTime = dayConfig.end;

  return openingTime.open; //appointmentTime >= startTime && appointmentTime <= endTime;
}

/**
 *  Check if the given appointment date is between opening hours
 * @param appointmentDate
 * @returns true/false
 */
export async function checkAppointmentIsBetweenOpeningHours(
  appointmentDate: Date
): Promise<boolean> {
  const date = new Date(appointmentDate);
  const weekdaySundayToSaturday = date.getUTCDay();
  const weekdayMondayToSunday = (weekdaySundayToSaturday + 6) % 7;

  const { timeSlots } = await readOpeningTime(weekdayMondayToSunday);

  if (timeSlots.length <= 0) {
    return false;
  }

  const appointmentStartHour = date.getUTCHours();
  const appointmentStartMinute = date.getUTCMinutes();

  // time is in format string: "10:00"; "HH:mm"
  const startHour = Number(timeSlots[0].time.slice(0, 2));
  const startMinute = Number(timeSlots[0].time.slice(3, 5));

  const timeSlotsIndex = timeSlots.length - 1;
  const endHour = Number(timeSlots[timeSlotsIndex].time.slice(0, 2));
  const endMinute = Number(timeSlots[timeSlotsIndex].time.slice(3, 5));

  // check if appointment is between start and end opening time (time slots)
  if (appointmentStartHour < startHour) return false;
  if (appointmentStartMinute < startMinute) return false;
  if (appointmentStartHour > endHour) return false;
  if (appointmentStartMinute > endMinute) return false;

  return true;
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
