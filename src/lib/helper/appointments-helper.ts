import { ObjectId } from 'mongodb';
import { readAppointmentIsAvailable } from '../database/collection/appointments/read-appointments';
import { readOpeningTime } from '../database/collection/opening-time/read-opening-time';

/**
 *  Check if the given appointment date is in the open times of the business
 * @param appointmentDate
 * @returns
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
