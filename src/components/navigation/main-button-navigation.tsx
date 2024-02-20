import { Locale } from '@/src/lib/lang/i18.config';
import { cn } from '@/src/lib/utils';
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
    <nav className="flex flex-row gap-1 items-center ">
      <NavigationLink
        lang={lang}
        path={'/dashboard/appointments'}
        className={cn(buttonVariants({ variant: 'outline' }), 'gap-1')}
      >
        Admin?
      </NavigationLink>
      <NavigationLink
        lang={lang}
        path={'/book-now'}
        className={cn(
          buttonVariants({ variant: 'default' }),
          'gap-1 hidden sm:flex'
        )}
      >
        <Icons.arrowRight className="-rotate-45" />
        <p>{button.bookNow}</p>
      </NavigationLink>
    </nav>
  );
}
