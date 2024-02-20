import { Icons } from '@/src/components/base/icons';
import { DashboardHeader } from '@/src/components/navigation/header/dashboard-header';
import NavigationLink from '@/src/components/navigation/link-navigation';
import { buttonVariants } from '@/src/components/ui/button';
import { readAllAppointmentsWithSellerNameForSevenDays } from '@/src/lib/database/collection/appointments/read-appointments';
import { Locale } from '@/src/lib/lang/i18.config';
import { getDictionary } from '@/src/lib/lang/lang';
import { cn } from '@/src/lib/utils';
import { Suspense } from 'react';
import { columns } from './columns';
import { DataTable } from './data-table';

interface AppointmentManagementPageProps {
  params: { lang: Locale };
}

export default async function AppointmentsManagementPage({
  params: { lang },
}: AppointmentManagementPageProps) {
  const { page, button } = await getDictionary(lang);

  const appointments = await readAllAppointmentsWithSellerNameForSevenDays();

  return (
    <div>
      <DashboardHeader
        heading={page.dashboard.appointments.headline}
        text={page.dashboard.appointments.description}
      >
        <NavigationLink
          lang={lang}
          path={'/dashboard/appointments/book-now'}
          className={cn(buttonVariants({ variant: 'default' }))}
        >
          <Icons.add className="mr-2 h-4 w-4" />
          {button.add}
        </NavigationLink>
      </DashboardHeader>
      <Suspense fallback={'Loading...'}>
        <DataTable columns={columns} data={appointments} button={button} />
      </Suspense>
    </div>
  );
}
