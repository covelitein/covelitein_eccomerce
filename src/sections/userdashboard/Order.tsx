

import { columns, OrderProps } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";
import React from "react";

// Sample data for the table
const data: OrderProps[] = Array.from({ length: 50 }, (_, index) => ({
    id: `ORD-${String(index + 1).padStart(5, '0')}`,
    products: index % 3 === 0
      ? 'iPhone 13, AirPods'
      : index % 3 === 1
      ? 'MacBook Pro'
      : 'Apple Watch Ultra',
    status: index % 4 === 0
      ? 'Shipped'
      : index % 4 === 1
      ? 'Delivered'
      : index % 4 === 2
      ? 'Pending'
      : 'Cancelled',
    totalPrice: index % 3 === 0
      ? 1250
      : index % 3 === 1
      ? 2500
      : 899,
    deliveryETA: index % 4 === 0
      ? 'Dec 30, 2024'
      : index % 4 === 1
      ? 'Dec 23, 2024'
      : index % 4 === 2
      ? 'TBD'
      : 'Cancelled',
  }));
  

export default function Order() {
  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        filterableColumns={[
          {
            id: "status",
            title: "Status",
            options: [
              { label: "Shipped", value: "shipped" },
              { label: "Delivered", value: "delivered" },
              { label: "Pending", value: "pending" },
              { label: "Cancelled", value: "cancelled" },
            ],
          },
        ]}
        searchableColumns={[
          {
            id: "id",
            title: "id",
          },
          {
            id: "products",
            title: "Products",
          },
        ]}
      />
    </div>
  );
}
