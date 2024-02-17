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
  appointmentDate: z.string(),
  clientNotes: z.string().optional(),
  sellerId: z.string(),
});

/**
 * Defines the allowed appointment schema for a post request (server side)
 */
export const routeRequestPatchAppointmentSchema = z.object({
  appointmentDate: z.string(),
  clientNotes: z.string().optional(),
  sellerId: z.string(),
  clientName: z.string(),
  clientEmail: z.string().optional(),
});
