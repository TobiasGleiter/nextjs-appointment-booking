import { DashboardHeader } from '@/src/components/navigation/header/dashboard-header';
import { readAllSellers } from '@/src/lib/database/collection/seller/read-seller';
import { Locale } from '@/src/lib/lang/i18.config';
import { getDictionary } from '@/src/lib/lang/lang';
import { columns } from './columns';
import { DataTable } from './data-table';

interface SellersManagementPageProps {
  params: { lang: Locale };
}

export default async function SellersManagementPage({
  params: { lang },
}: SellersManagementPageProps) {
  const { page } = await getDictionary(lang);
  const data = await readAllSellers();

  return (
    <div>
      <DashboardHeader
        heading={page.sellers.headline}
        text={page.sellers.description}
      />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
