import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDialogForAddProduct } from "@/store/use-dialog";
import AddProductForm from "../modalContents/AddProductForm";

export default function AddProductModal() {
  const { isOpen, close } = useDialogForAddProduct();

  return (
    <Dialog open={isOpen} onOpenChange={isOpen ? close : undefined}>
      <DialogContent className="max-w-full md:max-w-xl max-h-full overflow-y-scroll sm:px-4 px-2 md:px-6">
        <DialogHeader>
          <DialogTitle>Add Product Modal</DialogTitle>
          <DialogDescription>Add products here.</DialogDescription>
        </DialogHeader>
        <section>
          <AddProductForm />
        </section>
      </DialogContent>
    </Dialog>
  );
}
