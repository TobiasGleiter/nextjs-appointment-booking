import { z } from 'zod';

/**
 * Defines the allowed param
 */
export const routeContextClientOpeningTimeSchema = z.object({
  params: z.object({
    day: z.string(),
  }),
});
