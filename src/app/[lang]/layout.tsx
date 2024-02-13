import '@/src/app/globals.css';
import { Locale, i18n } from '@/src/lib/lang/i18.config';
import { cn } from '@/src/lib/utils';
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
