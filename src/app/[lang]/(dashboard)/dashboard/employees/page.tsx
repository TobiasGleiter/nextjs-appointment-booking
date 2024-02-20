import { SellerCreateButton } from '@/src/components/button/seller-create-button';
import { DashboardHeader } from '@/src/components/navigation/header/dashboard-header';
import { readAllEmployees } from '@/src/lib/database/collection/seller/read-seller';
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
  const { page, button } = await getDictionary(lang);

  const data = await readAllEmployees();

  return (
    <div>
      <DashboardHeader
        heading={page.dashboard.employees.headline}
        text={page.dashboard.employees.description}
      >
        <SellerCreateButton lang={lang} button={button} />
      </DashboardHeader>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
