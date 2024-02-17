'use client';

import { Seller } from '@/src/types/database/sellers-database';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Seller>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
];
