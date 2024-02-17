'use client';

import { Button } from '@/src/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { getDayForHumans } from '@/src/lib/helper/date-helper';
import { openingTimeFormSchema } from '@/src/lib/validation/dashboard/form-dashboard';
import { OpeningTime } from '@/src/types/database/opening-time-database';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Icons } from '../base/icons';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { toast } from '../ui/use-toast';

interface AdminUpdateOpeningTimeEditorFormProps {
  openingTime: OpeningTime;
  button: any;
}

export function AdminUpdateOpeningTimeEditorForm({
  openingTime,
  button,
}: AdminUpdateOpeningTimeEditorFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof openingTimeFormSchema>>({
    resolver: zodResolver(openingTimeFormSchema),
    defaultValues: {
      open: openingTime.open,
      timeSlots: openingTime.timeSlots,
    },
  });

  async function onSubmit(data: z.infer<typeof openingTimeFormSchema>) {
    setIsLoading(true);

    console.log(data);

    const response = await fetch(
      `/api/v1/opening-time/admin/${openingTime._id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data,
        }),
      }
    );

    setIsLoading(false);

    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    // if (!response?.ok) {
    //   if (response.status === 404) {
    //     return toast({
    //       title: 'This date is not available',
    //       description: 'Please try a different date.',
    //       variant: 'destructive',
    //     });
    //   }

    //   return toast({
    //     title: 'Error',
    //     description: 'Error occured',
    //     variant: 'destructive',
    //   });
    // }

    // return toast({
    //   title: 'Appointment updated!',
    // });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="open"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Open</FormLabel>
                <FormDescription>
                  If the business is open on {getDayForHumans(openingTime.day)}
                  s.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-readonly
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timeSlots"
          render={({ field }) => (
            <FormItem>
              <FormLabel>TimeSlots</FormLabel>

              {field.value.map((timeSlot, index) => (
                <div
                  key={index}
                  className="flex flex-row items-start space-x-3 space-y-0"
                >
                  <FormItem>
                    <Input
                      defaultValue={timeSlot.time}
                      onChange={(e) => {
                        const newTimeSlots = [...field.value];
                        newTimeSlots[index].time = e.target.value;
                        console.log(newTimeSlots);
                        field.onChange(newTimeSlots);
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                </div>
              ))}
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.add className="mr-2 h-4 w-4" />
          )}
          Update Time
        </Button>
      </form>
    </Form>
  );
}
