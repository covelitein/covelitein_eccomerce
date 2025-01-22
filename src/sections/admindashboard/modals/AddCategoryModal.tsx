import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDialogForAddCategory } from "@/store/use-dialog";
import AddCategoryForm from "../modalContents/AddCategoryForm";

export default function AddCategoryModal() {
  const { isOpen, close } = useDialogForAddCategory();

  return (
    <Dialog open={isOpen} onOpenChange={isOpen ? close : undefined}>
      <DialogContent className="max-w-full md:max-w-xl max-h-full overflow-y-scroll sm:px-4 px-2 md:px-6">
        <DialogHeader>
          <DialogTitle>Add Category Modal</DialogTitle>
          <DialogDescription>Add Category here.</DialogDescription>
        </DialogHeader>
        <section>
          <AddCategoryForm />
        </section>
      </DialogContent>
    </Dialog>
  );
}
