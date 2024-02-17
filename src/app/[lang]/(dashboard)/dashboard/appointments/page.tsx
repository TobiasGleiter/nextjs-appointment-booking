import { DashboardHeader } from '@/src/components/navigation/header/dashboard-header';
import { Locale } from '@/src/lib/lang/i18.config';
import { getDictionary } from '@/src/lib/lang/lang';

interface AppointmentManagementPageProps {
  params: { lang: Locale };
}

export default async function AppointmentsManagementPage({
  params: { lang },
}: AppointmentManagementPageProps) {
  const { page, button } = await getDictionary(lang);
  return (
    <div>
      <DashboardHeader
        heading={page.dashboard.appointments.headline}
        text={page.dashboard.appointments.description}
      ></DashboardHeader>
    </div>
  );
}
