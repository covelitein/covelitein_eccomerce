import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

export default function ManageOrders() {
  const orders = [
    {
      id: "ORD-1092",
      customer: "Sophia Garcia",
      total: "$249.99",
      status: "Processing",
      date: "Mar 12, 2025",
    },
    {
      id: "ORD-1091",
      customer: "James Lee",
      total: "$89.00",
      status: "Delivered",
      date: "Mar 11, 2025",
    },
    {
      id: "ORD-1090",
      customer: "Ava Brown",
      total: "$149.50",
      status: "Shipped",
      date: "Mar 10, 2025",
    },
    {
      id: "ORD-1089",
      customer: "Noah Johnson",
      total: "$45.25",
      status: "Cancelled",
      date: "Mar 09, 2025",
    },
  ];

  return (
    <section className="px-4 py-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Manage Orders
          </h1>
          <p className="text-gray-500">
            Track and update customer orders across channels.
          </p>
        </div>
        <Button variant="outline">Export</Button>
      </div>

      <div className="rounded-xl border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium text-gray-900">
                  {order.id}
                </TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-700"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button size="sm">Update</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
