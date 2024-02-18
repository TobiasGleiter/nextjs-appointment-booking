import { z } from 'zod';

const timeSlotSchema = z.object({
  time: z.string(),
  value: z.string(),
});

export const openingTimeFormSchema = z.object({
  open: z.boolean(),
  timeSlots: z.any(), //array(timeSlotSchema),
  timeSlot: z.string().optional(),
});
