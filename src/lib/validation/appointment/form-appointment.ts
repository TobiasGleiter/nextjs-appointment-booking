import { z } from 'zod';

/**
 * Validate the input client side
 */
export const appointmentFormSchema = z.object({
  bookingDate: z.date(),
  bookingTimeSlotStart: z.string(),
  sellerId: z.string(),
  clientName: z.string().min(3),
  clientEmail: z.string().optional(),
});

export const clientAppointmentFormSchema = z.object({
  bookingDate: z.date(),
  bookingTimeSlotStart: z.string(),
  sellerId: z.string(),
});
