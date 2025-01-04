'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from './data-table-column-header';
import { ReactNode } from 'react';
import { productImages } from '@/sections/userdashboard/Order';

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
    cell: ({ row }) => {
      const productName = row.getValue('products');
      const imageUrl = productImages[(productName as string)] || "/images/default_product.jpg";
      return (
        <div className="flex items-center space-x-2">
          <img src={imageUrl} alt={(productName as string)} className="h-8 w-8 rounded" />
          <span className="truncate max-w-[200px]" title={(productName as string)}>
            {(productName as string).split(',').join(', ')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status');
      const statusStyles = {
        Delivered: "bg-green-100 text-green-600",
        Shipped: "bg-blue-100 text-blue-600",
        Pending: "bg-yellow-100 text-yellow-600",
        Cancelled: "bg-red-100 text-red-600",
      };
      const style = statusStyles[status as keyof typeof statusStyles];
      return (
        <span className={`font-medium px-2 py-1 rounded ${style}`}>
          {status as ReactNode}
        </span>
      );
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