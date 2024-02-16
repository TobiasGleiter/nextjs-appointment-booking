import { SiteFooter } from '@/src/components/navigation/footer/site-footer';
import MainButtonNavigation from '@/src/components/navigation/main-button-navigation';
import { MainNavigation } from '@/src/components/navigation/main-navigation';
import { Locale } from '@/src/lib/lang/i18.config';
import { getDictionary } from '@/src/lib/lang/lang';
import { Suspense } from 'react';

interface MarketingLayoutProps {
  children: React.ReactNode;
  params: { lang: Locale };
}

export default async function MarketingLayout({
  children,
  params: { lang },
}: MarketingLayoutProps) {
  const { button, navigation } = await getDictionary(lang);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40">
        <div className="flex h-20 items-center justify-between py-6">
          <Suspense>
            <MainNavigation
              items={navigation.marketing}
              button={button}
              lang={lang}
            />
          </Suspense>
          <MainButtonNavigation lang={lang} button={button} />
        </div>
      </header>
      <main className=" flex-1">{children}</main>
      <SiteFooter lang={lang} />
    </div>
  );
}
