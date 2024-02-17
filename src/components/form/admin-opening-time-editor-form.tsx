'use client';

import { Button } from '@/src/components/ui/button';
import { Form } from '@/src/components/ui/form';
import { openingTimeFormSchema } from '@/src/lib/validation/dashboard/form-dashboard';
import { OpeningTime } from '@/src/types/database/opening-time-database';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Icons } from '../base/icons';
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
    defaultValues: {},
  });

  async function onSubmit(data: z.infer<typeof openingTimeFormSchema>) {
    setIsLoading(true);

    const response = await fetch(`/api/v1/opening-time/admin/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    setIsLoading(false);

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
      title: 'Appointment updated!',
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
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
