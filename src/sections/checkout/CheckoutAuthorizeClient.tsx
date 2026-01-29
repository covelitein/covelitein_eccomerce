"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ToastComponent from "@/components/toast/toast-component";
import { useToast } from "@/components/toast/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function CheckoutAuthorizeClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const { toasts, addToast, removeToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmPayment = async () => {
    if (!reference) {
      addToast({
        message: "Missing transaction reference.",
        type: "danger",
        showLoader: true,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message ?? "Payment verification failed.");
      }

      addToast({
        message: "Payment successful! Redirecting to orders.",
        type: "success",
        showLoader: true,
      });
      router.push("/orders");
    } catch (error) {
      addToast({
        message:
          error instanceof Error ? error.message : "Unable to verify payment.",
        type: "danger",
        showLoader: true,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">
          Paystack Checkout (Mock)
        </h1>
        <p className="text-gray-500">
          Confirm your payment to complete the order.
        </p>
      </div>

      <Card className="p-6 space-y-4 max-w-xl">
        <div>
          <p className="text-sm text-gray-500">Reference</p>
          <p className="font-semibold text-gray-900">
            {reference ?? "Not provided"}
          </p>
        </div>
        <p className="text-sm text-gray-500">
          This is a simulated Paystack flow. Clicking “Confirm payment” will
          finalize the transaction and create an order record.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleConfirmPayment} disabled={isSubmitting}>
            {isSubmitting ? "Confirming..." : "Confirm payment"}
          </Button>
          <Button variant="outline" onClick={() => router.push("/checkout")}>
            Cancel
          </Button>
        </div>
      </Card>

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
    </>
  );
}
