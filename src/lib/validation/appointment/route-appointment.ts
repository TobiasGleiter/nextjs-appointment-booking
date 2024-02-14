import { z } from 'zod';

/**
 * Defines the allowed appointment id (server side)
 */
export const routeContextAppointmentSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

/**
 * Defines the allowed appointment schema for a post request (server side)
 */
export const routeRequestPostAppointmentSchema = z.object({
  bookedAt: z.date(),
  clientEmail: z.string(),
  clientName: z.string(),
  clientNotes: z.string(),
  sellerId: z.any(),
});
