import { Locale } from '@/src/lib/lang/i18.config';
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
    <nav className="flex flex-row gap-2">
      <NavigationLink lang={lang} path={'/login'}>
        {button.bookNow}
      </NavigationLink>
    </nav>
  );
}
