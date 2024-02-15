import { AppointmentForm } from '@/src/components/form/appointment-form';
import { Locale } from '@/src/lib/lang/i18.config';
import { getDictionary } from '@/src/lib/lang/lang';
import { Suspense } from 'react';

export default async function BookNowPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page, button, error } = await getDictionary(lang);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-bold">{page.bookNow.headline}</h1>
      <Suspense>
        <AppointmentForm
          sections={page.bookNow.sections}
          buttonBookNow={button.bookNow}
          error={error}
        />
      </Suspense>
    </div>
  );
}
