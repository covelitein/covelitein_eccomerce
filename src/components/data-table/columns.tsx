'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from './data-table-column-header';
import { ReactNode } from 'react';

// Define the type for an order
export interface OrderProps {
  id: string;
  products: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  totalPrice: number;
  deliveryETA: string;
};

// Define the columns for the order table
export const columns: ColumnDef<OrderProps>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order ID" />
    ),
    cell: ({ row }) => <div className="font-medium">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'products',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Products" />
    ),
    cell: ({ row }) => (
      <div className="truncate max-w-[200px]" title={row.getValue('products')}>
        {row.getValue('products')}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status');
      const statusColor =
        status === 'Delivered'
          ? 'text-green-600'
          : status === 'Shipped'
          ? 'text-blue-600'
          : status === 'Pending'
          ? 'text-yellow-600'
          : 'text-red-600';
      return <span className={`font-medium ${statusColor}`}>{(status as ReactNode)}</span>;
    },
  },
  {
    accessorKey: 'totalPrice',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Price" />
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('totalPrice'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'deliveryETA',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delivery ETA" />
    ),
    cell: ({ row }) => <div>{row.getValue('deliveryETA')}</div>,
  },
];


