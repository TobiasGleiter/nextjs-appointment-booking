import { z } from 'zod';

const timeSlotSchema = z.object({
  time: z.string(),
  value: z.string(),
});

export const openingTimeFormSchema = z.object({
  open: z.boolean(),
  day: z.number().int().min(0).max(6),
  timeSlots: z.array(timeSlotSchema),
});
