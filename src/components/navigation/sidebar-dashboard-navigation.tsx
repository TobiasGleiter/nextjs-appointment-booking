'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Locale } from '@/src/lib/lang/i18.config';
import { cn } from '@/src/lib/utils';
import { Icons } from '../base/icons';
import { Separator } from '../ui/separator';

interface DashboardNavProps {
  items: any[];
  lang: Locale;
}

export function SidebarDashboardNavigation({ items, lang }: DashboardNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      <Link href={'/dashboard'}>
        <span
          className={cn(
            'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
            path === '/dashboard' ? 'bg-accent' : 'transparent'
          )}
        >
          <Icons.dashboard className="mr-2 h-4 w-4" />
          <span className="hidden md:flex">Dashboard</span>
        </span>
      </Link>
      <Separator />
      {items.map((item, index) => {
        const Icon = Icons[item.icon || 'arrowRight'];
        return (
          item.role !== 'seller' &&
          item.href && (
            <Link key={index} href={item.disabled ? '/' : item.href}>
              <span
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                  path === item.href ? 'bg-accent' : 'transparent',
                  item.disabled && 'cursor-not-allowed opacity-80'
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span className="hidden md:flex">{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
      <div className="mt-2" />
      {/* <Link href={'/dashboard/settings'}>
        <span
          className={cn(
            'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
            path === '/dashboard/settings' ? 'bg-accent' : 'transparent'
          )}
        >
          <Icons.settings className="mr-2 h-4 w-4" />
          <span className="hidden md:flex">Settings</span>
        </span>
      </Link> */}
    </nav>
  );
}
