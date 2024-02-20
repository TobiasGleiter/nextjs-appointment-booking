'use client';

import { Button, buttonVariants } from '@/src/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { openingTimeSlots } from '@/src/config/opening-time';
import { getDayForHumans } from '@/src/lib/helper/date-helper';
import { cn } from '@/src/lib/utils';
import { openingTimeFormSchema } from '@/src/lib/validation/dashboard/form-dashboard';
import { OpeningTime } from '@/src/types/database/opening-time-database';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
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

    const response = await fetch(
      `/api/v1/opening-time/admin/${openingTime._id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          open: data.open,
          timeSlots: data.timeSlots,
        }),
      }
    );

    setIsLoading(false);

    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });

    if (!response?.ok) {
      if (response.status === 404) {
        return toast({
          title: 'This date is not available',
          description: 'Please try a different date.',
          variant: 'destructive',
        });
      }

      return toast({
        title: 'Error',
        description: 'Error occured',
        variant: 'destructive',
      });
    }

    return toast({
      title: 'Timeslots updated!',
    });
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
              <div
                className={cn(
                  'flex flex-col md:flex-row w-full md:items-center gap-2'
                )}
              >
                <FormField
                  control={form.control}
                  name="timeSlot"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={'Select a time'} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {openingTimeSlots.map((timeSlot, key) => {
                            return (
                              <SelectItem key={key} value={timeSlot.time}>
                                {timeSlot.time}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  className={cn(
                    buttonVariants({ variant: 'secondary' }),
                    'flex-row gap-1'
                  )}
                  onClick={() => {
                    const inputValue = form.getValues('timeSlot');
                    if (inputValue.trim() !== '') {
                      field.onChange([
                        ...field.value,
                        { time: inputValue, label: inputValue },
                      ]);
                      form.setValue('timeSlot', '');
                    }
                  }}
                >
                  <Icons.add className="w-4 h-4" />
                  Add time slot
                </Button>
              </div>
              {field.value.map((timeSlot, index) => (
                <div
                  key={index}
                  className="flex flex-row items-start space-x-3 space-y-0"
                >
                  <FormItem>
                    {/* <Input
                      defaultValue={timeSlot.time}
                      onChange={(e) => {
                        const newTimeSlots = [...field.value];
                        newTimeSlots[index].time = e.target.value;
                        newTimeSlots[index].value = e.target.value;
                        console.log(newTimeSlots);
                        field.onChange(newTimeSlots);
                      }}
                    /> */}
                    <FormField
                      control={form.control}
                      name="timeSlots"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={(e) => {
                              const newTimeSlots = [...field.value];
                              newTimeSlots[index].time = e;
                              newTimeSlots[index].label = e;
                              console.log(newTimeSlots);
                              field.onChange(newTimeSlots);
                            }}
                            defaultValue={timeSlot.time}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={'Select a time'} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {openingTimeSlots.map((timeSlot, key) => {
                                return (
                                  <SelectItem key={key} value={timeSlot.time}>
                                    {timeSlot.time}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
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
