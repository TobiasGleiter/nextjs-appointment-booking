'use client';

import { Icons } from '@/src/components/base/icons';
import { Button } from '@/src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { Seller } from '@/src/types/database/sellers-database';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { toast } from '@/src/components/ui/use-toast';
import { constructPathWithLocale } from '@/src/lib/utils';
import { ObjectId } from 'mongodb';

/**
 * Delete the seller from the database by given id
 * @param sellerId
 * @returns
 */
export async function deleteSellerById(sellerId: ObjectId): Promise<void> {
  //const router = useRouter();
  const response = await fetch(`/api/v1/employees/${sellerId}`, {
    method: 'DELETE',
  });

  if (!response?.ok) {
    toast({
      title: 'Something went wrong.',
      description: 'It was not deleted. Please try again.',
      variant: 'destructive',
    });
  }

  //router.refresh();
}

export const columns: ColumnDef<Seller>[] = [
  {
    accessorKey: 'name',
    header: () => <div>Name</div>,
    cell: ({ row }) => {
      // just to show the coll formating
      const formatted = row.getValue('name').toString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'role',
    header: () => <div>Role</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const seller = row.original;
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
                onClick={() => navigator.clipboard.writeText(seller.email)}
              >
                Copy seller email
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  window.location.href = constructPathWithLocale(
                    'en',
                    `/editor/employees/${seller._id}`
                  );
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async (event) => {
                  event.preventDefault();
                  await deleteSellerById(seller._id);
                  window.location.href = constructPathWithLocale(
                    'en',
                    `/dashboard/employees`
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
