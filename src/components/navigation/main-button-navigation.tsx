import { Locale } from '@/src/lib/lang/i18.config';
import { cn } from '@/src/lib/utils';
import Link from 'next/link';
import { Icons } from '../base/icons';
import { buttonVariants } from '../ui/button';
import NavigationLink from './link-navigation';

interface IMainButtonNav {
  lang: Locale;
  button: any;
}

export default async function MainButtonNavigation({
  lang,
  button,
}: IMainButtonNav) {
  return (
    <nav className="flex flex-row gap-2 items-center">
      <Link
        href={'https://github.com/TobiasGleiter/nextjs-appointment-booking'}
        target="_blank"
      >
        <Icons.gitHub className="w-6 h-6 hover:translate-x-1 duration-200" />
      </Link>
      <NavigationLink
        lang={lang}
        path={'/login'}
        className={cn(
          buttonVariants({ variant: 'default' }),
          'hidden sm:block'
        )}
      >
        {button.bookNow}
      </NavigationLink>
    </nav>
  );
}
