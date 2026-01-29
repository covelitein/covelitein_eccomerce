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

const categories = [
  { id: "cat-1", name: "Electronics", products: 42, status: "Active" },
  { id: "cat-2", name: "Home & Kitchen", products: 31, status: "Active" },
  { id: "cat-3", name: "Accessories", products: 18, status: "Active" },
  { id: "cat-4", name: "Fitness", products: 9, status: "Draft" },
  { id: "cat-5", name: "Furniture", products: 12, status: "Active" },
];

export default function CategoryTable() {
  return (
    <div className="mt-6 rounded-xl border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium text-gray-900">
                {category.name}
              </TableCell>
              <TableCell>{category.products}</TableCell>
              <TableCell>
                <Badge
                  className={
                    category.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }
                >
                  {category.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    Archive
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
