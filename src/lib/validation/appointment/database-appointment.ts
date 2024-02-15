import { ObjectId } from 'mongodb';
import { z } from 'zod';

/**
 * Validate the input client side
 */
export const appointmentSchema = z.object({
  appointmentDate: z.date(),
  clientEmail: z.string(),
  clientName: z.string(),
  sellerId: z.instanceof(ObjectId),
  bookedAt: z.date(),
  clientNotes: z.string().optional(),
});
