import { CreateAppointmentEditorForm } from '@/src/components/form/admin-create-appointment-editor-form';
import AppointmentFormSkeleton from '@/src/components/skeleton/appointment-form-skeleton';
import { readOpeningTimeByDay } from '@/src/lib/database/collection/opening-time/read-opening-time';
import { readAllSellers } from '@/src/lib/database/collection/seller/read-seller';
import { Locale } from '@/src/lib/lang/i18.config';
import { getDictionary } from '@/src/lib/lang/lang';
import { Appointment } from '@/src/types/database/appointments-database';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function BookNowPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page, button, error } = await getDictionary(lang);

  const sellers = await readAllSellers();
  const weekDay = new Date().getDay();
  const openingTime = await readOpeningTimeByDay(weekDay);

  if (!sellers || !openingTime) {
    notFound();
  }

  const emptyAppointment: Appointment = {
    appointmentDate: new Date(),
    clientEmail: '',
    clientName: '',
    sellerId: sellers[0]._id,
    bookedAt: new Date(),
  };

  return (
    <div className="flex flex-col w-full gap-10  justify-between">
      <div className="flex flex-col gap-2 w-fit px-2">
        <h1 className="text-xl font-bold">{page.bookNow.headline}</h1>
        <Suspense fallback={<AppointmentFormSkeleton />}>
          <CreateAppointmentEditorForm
            appointment={emptyAppointment}
            sections={page.bookNow.sections}
            buttonBookNow={button.bookNow}
            lang={lang}
            sellers={sellers}
            openingTime={openingTime}
          />
        </Suspense>
      </div>
    </div>
  );
}
