'use client';

import { buttonVariants } from '@/src/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { roles } from '@/src/config/auth';
import { Locale } from '@/src/lib/lang/i18.config';
import { cn, constructPathWithLocale } from '@/src/lib/utils';
import { formSellerSchema } from '@/src/lib/validation/editor/seller/form-seller';
import { Seller } from '@/src/types/database/sellers-database';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { Key } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Icons } from '../base/icons';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { toast } from '../ui/use-toast';

interface SellerEditorProps {
  seller: Seller;
  button: any;
  lang: Locale;
}

export default function SellerEditor({
  seller,
  button,
  lang,
}: SellerEditorProps) {
  const form = useForm<z.infer<typeof formSellerSchema>>({
    resolver: zodResolver(formSellerSchema),
    defaultValues: {
      name: seller.name,
      email: seller.email,
      role: seller.role,
    },
  });

  const router = useRouter();

  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  async function onSubmit(data: z.infer<typeof formSellerSchema>) {
    setIsSaving(true);

    const response = await fetch(`/api/v1/employees/${seller._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        name: data.name,
        email: data.email,
        role: data.role,
      }),
    });

    setIsSaving(false);

    if (!response?.ok) {
      return toast({
        title: 'Error',
        variant: 'destructive',
      });
    }

    router.refresh();

    return toast({
      description: 'Seller udpated',
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <div className="grid w-full gap-10">
          <div className="flex w-full items-start justify-between">
            <div className="flex flex-row items-center gap-2">
              <Link
                href={constructPathWithLocale(lang, '/dashboard/employees')}
                className={cn(buttonVariants({ variant: 'ghost' }))}
              >
                <>
                  <Icons.chevronLeft className="mr-2 h-4 w-4" />
                  {button.back}
                </>
              </Link>
            </div>
            <button type="submit" className={cn(buttonVariants())}>
              {isSaving && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>{button.save}</span>
            </button>
          </div>
          <div className="flex flex-col prose prose-stone mx-auto md:w-[700px] dark:prose-invert gap-2 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seller name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seller Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={'Select role of employee'} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles &&
                        roles.map((role, key: Key) => {
                          return (
                            <SelectItem key={key} value={role}>
                              {role}
                            </SelectItem>
                          );
                        })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
