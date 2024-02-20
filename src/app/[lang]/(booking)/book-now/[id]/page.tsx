import NavigationLink from '@/src/components/navigation/link-navigation';
import { buttonVariants } from '@/src/components/ui/button';
import { Label } from '@/src/components/ui/label';
import { readAppointmentById } from '@/src/lib/database/collection/appointments/read-appointments';
import { formatDateForHumans } from '@/src/lib/helper/date-helper';
import { Locale } from '@/src/lib/lang/i18.config';
import { getDictionary } from '@/src/lib/lang/lang';
import { cn } from '@/src/lib/utils';
import { notFound } from 'next/navigation';

export default async function BookNowDetailsPage({
  params: { lang, id },
}: {
  params: { lang: Locale; id: string };
}) {
  const { page, button } = await getDictionary(lang);

  const appointment = await readAppointmentById(id);

  if (!appointment) {
    notFound();
  }

  const appointmentDate = new Date(appointment.appointmentDate);
  const humanReadableData = formatDateForHumans(appointmentDate, lang);

  return (
    <div className="flex flex-col w-full items-center gap-10 justify-between">
      <div className="flex w-full items-end justify-between">
        <div className="flex flex-row items-center gap-2">
          <NavigationLink
            lang={lang}
            path={'/'}
            className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}
          >
            {button.home}
          </NavigationLink>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">
          {page.bookNow.sections.details.headline}
        </h1>
        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {page.bookNow.sections.details.description}
        </p>
        <div className="flex flex-col gap-2">
          <div>
            <Label>Name</Label>
            <p>{appointment.clientName}</p>
          </div>
          <div>
            <Label>Date</Label>
            <p>{humanReadableData}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
