'use client';

import { Locale } from '@/src/lib/lang/i18.config';
import { cn } from '@/src/lib/utils';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Icons } from '../base/icons';
import { ButtonProps, buttonVariants } from '../ui/button';
import { toast } from '../ui/use-toast';

interface VisionCreateButtonProps extends ButtonProps {
  lang: Locale;
  button: any;
}

export function SellerCreateButton({
  lang,
  button,
  className,
  variant,
  ...props
}: VisionCreateButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onClick() {
    setIsLoading(true);

    const response = await fetch('/api/v1/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Seller Name',
        email: '',
      }),
    });

    setIsLoading(false);

    if (!response?.ok) {
      return toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      });
    }

    const { result } = await response.json();

    router.refresh();

    router.push(`/${lang}/editor/employees/${result.insertedId}`);
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant: 'default' }),
        {
          'cursor-not-allowed opacity-60': isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      {button.add}
    </button>
  );
}
