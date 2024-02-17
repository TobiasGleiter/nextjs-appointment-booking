import { MainNavigation } from '@/src/components/navigation/main-navigation';
import { SidebarDashboardNavigation } from '@/src/components/navigation/sidebar-dashboard-navigation';
import { UserAccountNav } from '@/src/components/navigation/user-account-navigation';
import { readCurrentUser } from '@/src/lib/auth/read-auth';
import { Locale, i18n } from '@/src/lib/lang/i18.config';
import { getDictionary } from '@/src/lib/lang/lang';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface DashboardLayoutProps {
  children?: React.ReactNode;
  params: { lang: Locale };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function DashboardLayout({
  children,
  params: { lang },
}: DashboardLayoutProps) {
  const user = await readCurrentUser();
  const { button, navigation } = await getDictionary(lang);

  if (!user) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="z-40 bg-background">
        <div className="container flex h-16 items-center bg-background justify-between py-4">
          <MainNavigation
            items={navigation.dashboard}
            button={button}
            lang={lang}
          />
          <UserAccountNav user={user} lang={lang} button={button} />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <Suspense>
            <SidebarDashboardNavigation
              items={navigation.dashboard}
              lang={lang}
            />
          </Suspense>
        </aside>
        <main className="flex w-full  min-h-screen flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      {/** FOOTER */}
    </div>
  );
}
