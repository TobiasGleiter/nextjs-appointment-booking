import OpeningTimeCard from '@/src/components/card/opening-time-card';
import { DashboardHeader } from '@/src/components/navigation/header/dashboard-header';
import { readAllOpeningTime } from '@/src/lib/database/collection/opening-time/read-opening-time';
import { Locale } from '@/src/lib/lang/i18.config';
import { getDictionary } from '@/src/lib/lang/lang';
import { OpeningTime } from '@/src/types/database/opening-time-database';
import { Key } from 'react';

interface OpeningTimeManagementPageProps {
  params: { lang: Locale };
}

export default async function OpeningTimeManagementPage({
  params: { lang },
}: OpeningTimeManagementPageProps) {
  const { page } = await getDictionary(lang);

  const openingTime = await readAllOpeningTime();

  return (
    <div className="flex flex-col gap-4 ">
      <DashboardHeader
        heading={page.dashboard.openingHours.headline}
        text={page.dashboard.openingHours.description}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-col gap-2 px-1">
        {openingTime.map((openingTime: OpeningTime, key: Key) => {
          return (
            <OpeningTimeCard
              key={key}
              openingTime={openingTime}
              sections={page.dashboard.openingHours.sections}
            />
          );
        })}
      </div>
    </div>
  );
}
