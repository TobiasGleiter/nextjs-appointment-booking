import { useLockBody } from '@/src/lib/hooks/use-lock-body';
import { Locale } from '@/src/lib/lang/i18.config';
import { cn } from '@/src/lib/utils';
import { MainNavItem } from '@/src/types/navigation/main-navigation';
import Link from 'next/link';
import * as React from 'react';
import { Icons } from '../base/icons';

interface MobileNavProps {
  items: MainNavItem[];
  lang: Locale;
  setShowMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

export function MobileNav({
  items,
  lang,
  setShowMobileMenu,
  children,
}: MobileNavProps) {
  useLockBody();

  return (
    <div
      className={cn(
        'fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden'
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover backdrop-blur-md p-4 text-popover-foreground shadow-md">
        <Link href={'/'} className="flex items-center space-x-2">
          <Icons.logo />
          <span className="font-bold">Appointment Bookings</span>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items.map((item, index) => (
            <Link
              key={index}
              onClick={() => setShowMobileMenu(false)}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline',
                item.disabled && 'cursor-not-allowed opacity-60'
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
}
