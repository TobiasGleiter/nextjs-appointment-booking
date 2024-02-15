'use client';

import { Button } from '@/src/components/ui/button';
import { Calendar } from '@/src/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Icons } from '../base/icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { toast } from '../ui/use-toast';

export function AppointmentForm({ sections, buttonBookNow, error }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const FormSchema = z.object({
    bookingDate: z.date({
      required_error: error.form.date.description,
    }),
    bookingTimeSlotStart: z.string({
      required_error: error.form.timeSlot.description,
    }),
    sellerId: z.string({ required_error: 'A seller is required' }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    const timeSlotStart = new Date(data.bookingTimeSlotStart);
    const bookingDate = new Date(data.bookingDate);

    const formattedTimeSlotStart = format(timeSlotStart, 'HH:mm');
    const formattedBookingDate = format(bookingDate, 'yyyy-MM-dd');
    const fullDateWithTime = `${formattedBookingDate}T${formattedTimeSlotStart}`;

    const response = await fetch('/api/v1/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        appointmentDate: new Date(fullDateWithTime),
        sellerId: data.sellerId,
      }),
    });

    setIsLoading(false);

    if (!response?.ok) {
      return toast({
        title: 'Error',
        description: 'Error occured',
        variant: 'destructive',
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="bookingDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{sections.date.headline}</FormLabel>
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                defaultMonth={field.value}
                disabled={(date) => date <= new Date()}
                initialFocus
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bookingTimeSlotStart"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{sections.timeSlot.headline}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={sections.date.headline} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1970-01-01T10:00:00.000Z">
                    10:00 - 10:30
                  </SelectItem>
                  <SelectItem value="1970-01-01T11:00:00.000Z">
                    11:00 - 11:30
                  </SelectItem>
                  <SelectItem value="1970-01-01T12:00:00.000Z">
                    12:00 - 12:30
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sellerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{'Select Your prefered seller'}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={'Select a seller'} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="6025e2f1c6061f068b55c7e0">
                    Tobias Gleiter
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.add className="mr-2 h-4 w-4" />
          )}
          {buttonBookNow}
        </Button>
      </form>
    </Form>
  );
}
