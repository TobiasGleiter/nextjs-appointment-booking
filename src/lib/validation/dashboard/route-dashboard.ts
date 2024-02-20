import { z } from 'zod';

/**
 * Defines the allowed seller id (server side)
 */
export const routeContextDashboardSellerSchema = z.object({
  params: z.object({
    sellerId: z.string(),
  }),
});

/**
 * Defines the allowed appointment schema for a post request (server side)
 */
export const routeRequestPostDashboardSellerSchema = z.object({
  name: z.string(),
  email: z.string(),
  role: z.string().optional(),
});

/**
 * Defines the allowed appointment schema for a post request (server side)
 */
export const routeRequestPatchDashboardSellerSchema = z.object({
  name: z.string(),
  email: z.string(),
  role: z.string(),
});

/**
 * Defines the allowed appointment id
 */
export const routeContextDashboardAppointmentSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

/**
 * Appointment schema on pach is possible with the client Name and client Id (not directly with the session)
 */
export const routeRequestPatchDashboardAppointmentSchema = z.object({
  appointmentDate: z.string(),
  clientNotes: z.string().optional(),
  sellerId: z.string(),
  clientName: z.string(),
  clientId: z.string(),
});
