"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { categorySchema } from "@/schemaValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRequest } from "@/composables/use-request";
import { useToast } from "@/components/toast/use-toast";
import ToastComponent from "@/components/toast/toast-component";

export default function AddCategoryForm() {
  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const { execute: createCategory, loading } = useRequest("/api/categories", {
    enabled: false,
  });
  const { toasts, addToast, removeToast } = useToast();

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    await createCategory({
      method: "POST",
      data: values,
      onSuccess: () => {
        addToast({
          message: "Category created successfully.",
          type: "success",
          showLoader: true,
        });
        form.reset();
      },
      onError: (error) => {
        addToast({
          message:
            (error as any)?.message ?? "Unable to create category.",
          type: "danger",
          showLoader: true,
        });
      },
    });
  };

  return (
    <main className="mt-5">
      <div className="max-w-xl max-md:px-4 mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Product Name */}
            <div className="mb-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter category name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Adding..." : "Add Category"}
            </Button>
          </form>
        </Form>
      </div>
      <div>
        {toasts.map((toast) => (
          <ToastComponent
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            showLoader={toast.showLoader}
            onDismiss={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </main>
  );
}
