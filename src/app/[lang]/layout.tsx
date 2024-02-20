import '@/src/app/globals.css';
import { Locale, i18n } from '@/src/lib/lang/i18.config';
import { getDictionary } from '@/src/lib/lang/lang';
import { cn } from '@/src/lib/utils';
import { Metadata } from 'next';
import { Raleway as FontHeading, Inter as FontSans } from 'next/font/google';
import Providers from './providers';

interface RootLayoutProps {
  children: React.ReactNode;
  params: { lang: Locale };
}

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontHeading = FontHeading({
  subsets: ['latin'],
  variable: '--font-heading',
});

export async function generateMetadata({ params }): Promise<Metadata> {
  const { meta } = await getDictionary(params.lang);

  return {
    title: {
      default: meta.home.title,
      template: `%s | ${meta.home.title}`,
    },
    description: meta.home.description,
    applicationName: 'Appointment Booking System',
    openGraph: {
      title: meta.home.title,
      description: meta.home.description,
    },
    keywords: ['Appointment', 'Booking'],
    authors: [
      {
        name: 'Tobias Gleiter',
        url: 'https://tobiasgleiter.de',
      },
    ],
    creator: 'Tobias Gleiter',
    metadataBase: new URL('https://localhost:3000'),
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params: { lang },
}: RootLayoutProps) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
