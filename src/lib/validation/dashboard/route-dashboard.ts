import { z } from 'zod';

/**
 * Defines the allowed appointment id (server side)
 */
export const routeContextDashboardSellerSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

/**
 * Defines the allowed appointment schema for a post request (server side)
 */
export const routeRequestPostDashboardSellerSchema = z.object({
  name: z.string(),
  email: z.string(),
});
