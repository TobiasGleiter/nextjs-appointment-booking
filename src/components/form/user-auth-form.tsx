'use client';

//import { signIn } from "next-auth/react";
import { signIn } from 'next-auth/react';
import * as React from 'react';

import { cn } from '@/src/lib/utils';
import { useSearchParams } from 'next/navigation';
import { Icons } from '../base/icons';
import { buttonVariants } from '../ui/button';

export function UserAuthForm({ lang }) {
  const handleSignInWithProviderAndRedirect = async (
    provider: string,
    callbackUrl: string
  ) => {
    setIsAuthLoading(true);
    await signIn(provider, {
      redirect: true,
      callbackUrl: callbackUrl,
    });
    setIsAuthLoading(false);
  };

  const [isAuthLoading, setIsAuthLoading] = React.useState<boolean>(false);

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  return (
    <div className={cn('grid gap-6')}>
      <button
        type="button"
        className={cn(buttonVariants({ variant: 'outline' }))}
        onClick={() =>
          handleSignInWithProviderAndRedirect('google', `/${lang}/book-now`)
        }
        disabled={isAuthLoading}
      >
        {isAuthLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{' '}
        Google
      </button>
    </div>
  );
}
