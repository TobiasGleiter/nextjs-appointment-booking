import { readAllSellers } from '@/src/lib/database/collection/seller/read-seller';
import { columns } from './columns';
import { DataTable } from './data-table';

export default async function SellersManagementPage() {
  const data = await readAllSellers();

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
