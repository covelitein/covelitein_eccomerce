"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddProductModal from "../modals/AddProductModal";
import { useDialogForAddProduct } from "@/store/use-dialog";

export default function ProductHeader() {
  const { open } = useDialogForAddProduct();
  return (
    <header className="">
      <div className="flex items-center justify-between">
        <div className="">
          <h3 className="text-2xl font-semibold">Manage Products</h3>
        </div>
        <div className="">
          <Button onClick={open}>
            <Plus />
            <span>Add Product</span>
          </Button>
        </div>
      </div>
      <AddProductModal />
    </header>
  );
}
