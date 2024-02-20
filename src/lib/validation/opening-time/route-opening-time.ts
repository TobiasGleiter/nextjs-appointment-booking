import { z } from 'zod';

/**
 * Defines the allowed param
 */
export const routeContextClientOpeningTimeSchema = z.object({
  params: z.object({
    date: z.date(),
  }),
});
