import { z } from 'zod';

/**
 * Defines the allowed param
 */
export const routeContextClientOpeningTimeSchema = z.object({
  params: z.object({
    date: z.date(),
  }),
});

/**
 * Defines the allowed openingTime schema for a patch request (server side)
 */
export const routeRequestPatchOpeningTimeSchema = z.object({
  open: z.boolean(),
  timeSlots: z.any(),
});
