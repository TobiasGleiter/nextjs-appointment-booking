import { SiteFooter } from '@/src/components/navigation/footer/site-footer';
import { Locale } from '@/src/lib/lang/i18.config';

interface MarketingLayoutProps {
  children: React.ReactNode;
  params: { lang: Locale };
}

export default async function MarketingLayout({
  children,
  params: { lang },
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40">
        <div className="flex h-20 items-center justify-between py-6">
          {/* <Suspense>
            <MainNav items={navigation.marketing} button={button} lang={lang} />
          </Suspense> */}
          {/* <MainButtonNav lang={lang} button={button} /> */}
        </div>
      </header>
      <main className="container flex-1">{children}</main>
      <SiteFooter lang={lang} />
    </div>
  );
}
