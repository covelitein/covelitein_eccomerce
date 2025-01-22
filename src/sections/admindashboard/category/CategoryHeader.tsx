"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useDialogForAddCategory } from "@/store/use-dialog";
import AddCategoryModal from "../modals/AddCategoryModal";

export default function CategoryHeader() {
  const { open } = useDialogForAddCategory();
  return (
    <header className="">
      <div className="flex items-center justify-between">
        <div className="">
          <h3 className="text-2xl font-semibold">Manage Categories</h3>
        </div>
        <div className="">
          <Button onClick={open}>
            <Plus />
            <span>Add Category</span>
          </Button>
        </div>
      </div>
      <AddCategoryModal />
    </header>
  );
}
