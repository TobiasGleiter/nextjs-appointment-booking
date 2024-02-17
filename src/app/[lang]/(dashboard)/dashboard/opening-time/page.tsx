import { DashboardHeader } from '@/src/components/navigation/header/dashboard-header';
import { readAllOpeningTime } from '@/src/lib/database/collection/opening-time/read-opening-time';
import { Locale } from '@/src/lib/lang/i18.config';
import { getDictionary } from '@/src/lib/lang/lang';

interface OpeningTimeManagementPageProps {
  params: { lang: Locale };
}

export default async function OpeningTimeManagementPage({
  params: { lang },
}: OpeningTimeManagementPageProps) {
  const { page, button } = await getDictionary(lang);
  const openingTime = await readAllOpeningTime();
  console.log(openingTime);
  return (
    <div>
      <DashboardHeader
        heading={page.dashboard.openingHours.headline}
        text={page.dashboard.openingHours.description}
      ></DashboardHeader>
      <div>Cards</div>
    </div>
  );
}
