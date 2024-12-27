'use client'

import { columns, Payment } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";
import React from "react";

const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "example@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "test@test.com",
  },
];

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
              { label: "Pending", value: "pending" },
              { label: "Processing", value: "processing" },
              { label: "Success", value: "success" },
              { label: "Failed", value: "failed" },
            ],
          },
        ]}
        searchableColumns={[
          {
            id: "email",
            title: "Email",
          },
        ]}
      />
    </div>
  );
}
