import { z } from 'zod';

/**
 * Validate the input client side
 */
export const formAppointmentsSchema = z.object({
  bookedAt: z.date(),
  clientEmail: z.string(),
  clientName: z.string(),
  clientNotes: z.string(),
  sellerId: z.any(),
});
