'use client';

import { Button } from '@/src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Icons } from '@/src/components/base/icons';
import { formatDateForHumans } from '@/src/lib/helper/date-helper';
import { constructPathWithLocale } from '@/src/lib/utils';
import { Appointment } from '@/src/types/database/appointments-database';

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: 'appointmentDate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-translate-x-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Appointment-Date
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      // just to show the coll formating
      const dateStringValue = row.getValue('appointmentDate').toString();
      const date = new Date(dateStringValue);
      const formattedDate = formatDateForHumans(date, 'en');
      return <div className="font-medium">{formattedDate}</div>;
    },
  },
  {
    accessorKey: 'clientName',
    header: () => <div>Client-Name</div>,
  },
  {
    accessorKey: 'clientEmail',
    header: () => <div>Client-Email</div>,
  },
  {
    accessorKey: 'sellerName',
    header: () => <div>Seller</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(appointment.clientEmail)
                }
              >
                Copy seller email
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  window.location.href = constructPathWithLocale(
                    'en',
                    `/editor/appointment/${appointment._id}`
                  );
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async (event) => {
                  event.preventDefault();

                  window.location.href = constructPathWithLocale(
                    'en',
                    `/dashboard/appointment`
                  );
                }}
              >
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
