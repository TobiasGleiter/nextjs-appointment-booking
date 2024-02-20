import { AdminUpdateAppointmentEditorForm } from '@/src/components/form/admin-update-appointment-editor-form';
import NavigationLink from '@/src/components/navigation/link-navigation';
import AppointmentFormSkeleton from '@/src/components/skeleton/appointment-form-skeleton';
import { buttonVariants } from '@/src/components/ui/button';
import { readAppointmentById } from '@/src/lib/database/collection/appointments/read-appointments';
import { readOpeningTimeByDay } from '@/src/lib/database/collection/opening-time/read-opening-time';
import { readAllSellers } from '@/src/lib/database/collection/seller/read-seller';
import { Locale } from '@/src/lib/lang/i18.config';
import { getDictionary } from '@/src/lib/lang/lang';
import { cn } from '@/src/lib/utils';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function SellerEditorPage({
  params: { lang, appointmentId },
}: {
  params: { lang: Locale; appointmentId: string };
}) {
  const { page, button } = await getDictionary(lang);

  const appointment = await readAppointmentById(appointmentId);
  const sellers = await readAllSellers();
  const openingTime = await readOpeningTimeByDay(0);

  if (!sellers || !openingTime) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full gap-10 items-center justify-between">
      <div className="flex w-full items-start justify-between">
        <div className="flex flex-row items-center gap-2">
          <NavigationLink
            lang={lang}
            path={'/dashboard/appointments'}
            className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}
          >
            {button.back}
          </NavigationLink>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">{page.editor.bookNow.headline}</h1>
        <Suspense fallback={<AppointmentFormSkeleton />}>
          <AdminUpdateAppointmentEditorForm
            appointment={appointment}
            sections={page.editor.bookNow.sections}
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
