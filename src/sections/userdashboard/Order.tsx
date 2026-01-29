"use client";

import { columns, OrderProps } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";
import React, { useEffect, useState } from "react";

export default function Order() {
  const [data, setData] = useState<OrderProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        const payload = await response.json();
        if (response.ok) {
          setData(payload.orders ?? []);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="rounded-md border p-6 text-gray-500">Loading orders...</div>;
  }

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
