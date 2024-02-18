import { Locale } from '@/src/lib/lang/i18.config';
import { cn } from '@/src/lib/utils';
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
    <nav className="flex flex-row gap-4 items-center ">
      <NavigationLink lang={lang} path={'/dashboard/appointments'}>
        Admin?
      </NavigationLink>
      <NavigationLink
        lang={lang}
        path={'/book-now'}
        className={cn(buttonVariants({ variant: 'default' }), 'hidden md:flex')}
      >
        {button.bookNow}
      </NavigationLink>
    </nav>
  );
}
