import { Appointment } from '@/src/types/database/appointments-database';
import { ObjectId } from 'mongodb';
import { readAppointmentIsAvailable } from '../database/collection/appointments/read-appointments';
import { readOpeningTimeByDay } from '../database/collection/opening-time/read-opening-time';
import { readAllEmployees } from '../database/collection/seller/read-seller';

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

  const openingTime = await readOpeningTimeByDay(weekdayMondayToSunday);

  return openingTime.open;
}

/**
 *  Check if the given appointment time is between opening hours
 * @param appointmentDate
 * @returns true/false
 */
export async function checkAppointmentIsBetweenOpeningHours(
  appointmentDate: Date
): Promise<boolean> {
  const date = new Date(appointmentDate);
  const weekdaySundayToSaturday = date.getUTCDay();
  const weekdayMondayToSunday = (weekdaySundayToSaturday + 6) % 7;

  const { timeSlots } = await readOpeningTimeByDay(weekdayMondayToSunday);

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

export async function getAllBookedAppointments(
  appointments: Appointment[]
): Promise<Date[]> {
  // read all employees:
  const employees = await readAllEmployees();
  const timeSlotCounts = {};

  appointments.forEach((appointment) => {
    const appointmentDate = new Date(appointment.appointmentDate);
    const hour = appointmentDate.getHours();
    const minute = appointmentDate.getMinutes();
    const timeSlot = `${hour}:${minute}`;
    timeSlotCounts[timeSlot] = (timeSlotCounts[timeSlot] || 0) + 1;
  });

  // Filter time slots that are fully booked
  const fullyBookedTimeSlots = Object.keys(timeSlotCounts)
    .filter((timeSlot) => timeSlotCounts[timeSlot] === employees.length) // Assuming there are 2 employees
    .map((timeSlot) => {
      const [hour, minute] = timeSlot.split(':').map(Number);
      const date = new Date();
      date.setHours(hour);
      date.setMinutes(minute);
      return date;
    });

  return fullyBookedTimeSlots;
}
