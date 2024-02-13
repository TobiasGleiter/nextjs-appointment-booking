import { Locale } from '@/src/lib/lang/i18.config';
import { cn } from '@/src/lib/utils';
import Link from 'next/link';
import { Icons } from '../../base/icons';
import { buttonVariants } from '../../ui/button';

interface SiteFooterProps {
  className?: string;
  lang: Locale;
}

export function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer className={className}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 h-48 mb-24 md:mb-0 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.logo />
          <p className="text-center text-sm leading-loose md:text-left">
            &copy; 2024 Appointment Bookings
          </p>
          <Link
            href={'/en/privacy'}
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'default' })
            )}
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
