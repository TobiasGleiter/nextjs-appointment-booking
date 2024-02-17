import { AppointmentForm } from '@/src/components/form/appointment-form';
import AppointmentFormSkeleton from '@/src/components/skeleton/appointment-form-skeleton';
import { readOpeningTime } from '@/src/lib/database/collection/opening-time/read-opening-time';
import { readAllSellers } from '@/src/lib/database/collection/seller/read-seller';
import { Locale } from '@/src/lib/lang/i18.config';
import { getDictionary } from '@/src/lib/lang/lang';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function BookNowPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page, button, error } = await getDictionary(lang);
  const sellers = await readAllSellers();
  const openingTime = await readOpeningTime(0);

  if (!sellers || !openingTime) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full gap-10  justify-between">
      <div className="flex flex-col gap-2 w-fit px-2">
        <h1 className="text-xl font-bold">{page.bookNow.headline}</h1>
        <Suspense fallback={<AppointmentFormSkeleton />}>
          <AppointmentForm
            sections={page.bookNow.sections}
            buttonBookNow={button.bookNow}
            error={error}
            lang={lang}
            sellers={sellers}
            openingTime={openingTime}
          />
        </Suspense>
      </div>
    </div>
  );
}
