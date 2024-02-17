import { z } from 'zod';

/**
 * Validate the goal input client side
 */
export const formSellerSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email().max(255),
  role: z.string(),
});
