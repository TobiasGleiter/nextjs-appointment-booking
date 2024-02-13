import { Locale } from '@/src/lib/lang/i18.config';
import { cn } from '@/src/lib/utils';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';

interface IMainButtonNav {
  lang: Locale;
  button: any;
}

export default async function MainButtonNavigation({
  lang,
  button,
}: IMainButtonNav) {
  return (
    <nav className="flex flex-row gap-2">
      <Link
        href={'/en/book-now'}
        className={cn(buttonVariants({ size: 'sm' }), 'px-4')}
      >
        {button.bookNow}
      </Link>
    </nav>
  );
}
