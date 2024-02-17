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
import { toast } from '@/src/components/ui/use-toast';
import { formatDateForHumans } from '@/src/lib/helper/date-helper';
import { constructPathWithLocale } from '@/src/lib/utils';
import { Appointment } from '@/src/types/database/appointments-database';
import { ObjectId } from 'mongodb';

/**
 * Delete the seller from the database by given id
 * @param sellerId
 * @returns
 */
export async function deleteAppointmentById(
  appointmentId: ObjectId
): Promise<void> {
  const response = await fetch(`/api/v1/appointments/admin/${appointmentId}`, {
    method: 'DELETE',
  });

  if (!response?.ok) {
    toast({
      title: 'Something went wrong.',
      description: 'It was not deleted. Please try again.',
      variant: 'destructive',
    });
  }
}

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
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  window.location.href = constructPathWithLocale(
                    'en',
                    `/editor/appointments/${appointment._id}`
                  );
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async (event) => {
                  event.preventDefault();
                  await deleteAppointmentById(appointment._id);
                  window.location.href = constructPathWithLocale(
                    'en',
                    `/dashboard/appointments`
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
