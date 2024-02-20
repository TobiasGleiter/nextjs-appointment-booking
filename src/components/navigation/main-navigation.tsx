'use client';

import { Locale } from '@/src/lib/lang/i18.config';
import { cn } from '@/src/lib/utils';
import { MainNavItem } from '@/src/types/navigation/main-navigation';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import * as React from 'react';
import { Icons } from '../base/icons';
import { MobileNav } from './mobile-navigation';

interface MainNavProps {
  items?: MainNavItem[];
  button: any;
  lang: Locale;
  children?: React.ReactNode;
}

export function MainNavigation({
  items,
  button,
  lang,
  children,
}: MainNavProps) {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href={'/'} className="hidden items-center space-x-2 md:flex">
        <span className="hidden font-heading antialiased font-bold sm:inline-block">
          Appointment Bookings
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
                item.href.startsWith(`/${segment}`)
                  ? 'text-foreground'
                  : 'text-foreground/60',
                item.disabled && 'cursor-not-allowed opacity-80'
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo />}
        <span className="font-bold">{button.menu}</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav
          items={items}
          lang={lang}
          setShowMobileMenu={setShowMobileMenu}
        >
          {children}
        </MobileNav>
      )}
    </div>
  );
}
