import { DashboardHeader } from '@/src/components/navigation/header/dashboard-header';
import { readAllAppointmentsWithSellerName } from '@/src/lib/database/collection/appointments/read-appointments';
import { Locale } from '@/src/lib/lang/i18.config';
import { getDictionary } from '@/src/lib/lang/lang';
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
  const data = await readAllAppointmentsWithSellerName();

  return (
    <div>
      <DashboardHeader
        heading={page.dashboard.appointments.headline}
        text={page.dashboard.appointments.description}
      ></DashboardHeader>
      <Suspense fallback={'Loading...'}>
        <DataTable columns={columns} data={data} />
      </Suspense>
    </div>
  );
}
