import { Metadata } from 'next';

import { Locale } from '@/src/lib/lang/i18.config';

export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: 'Appointment Bookings',
    description: 'Book your appointment now!',
  };
}

export default async function LoginPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      Login
    </div>
  );
}
