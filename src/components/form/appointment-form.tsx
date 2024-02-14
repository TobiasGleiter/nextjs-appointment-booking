'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { toast } from '@/src/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function AppointmentForm({ sections, buttonBookNow, error }) {
  const FormSchema = z.object({
    date: z.date({
      required_error: error.form.date.description,
    }),
    timeSlot: z.string({
      required_error: error.form.timeSlot.description,
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data.date);

    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
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
          name="date"
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
          name="timeSlot"
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
                  <SelectItem value="10">10:00 - 10:30</SelectItem>
                  <SelectItem value="11">11:00 - 11:30</SelectItem>
                  <SelectItem value="12">12:00 - 12:30</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {buttonBookNow}
        </Button>
      </form>
    </Form>
  );
}
