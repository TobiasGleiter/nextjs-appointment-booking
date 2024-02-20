import { Locale } from '@/src/lib/lang/i18.config';

interface BookNowLayoutProps {
  children: React.ReactNode;
  params: { lang: Locale };
}

export default async function BookNowLayout({ children }: BookNowLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col py-8">
      <main className="flex w-full items-center container min-h-screen flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}
