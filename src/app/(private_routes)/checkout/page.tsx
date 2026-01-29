"use client";

import { products } from "@/constants/products";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ToastComponent from "@/components/toast/toast-component";
import { useToast } from "@/components/toast/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { toasts, addToast, removeToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cartItems = useMemo(
    () =>
      products.slice(0, 3).map((item) => ({
        ...item,
        quantity: 1,
      })),
    []
  );

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session?.user.email,
          items: cartItems.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.message ?? "Unable to start payment.");
      }

      addToast({
        message: "Redirecting to Paystack checkout...",
        type: "info",
        showLoader: true,
      });
      router.push(payload.data.authorizationUrl);
    } catch (error) {
      addToast({
        message:
          error instanceof Error
            ? error.message
            : "Payment initialization failed.",
        type: "danger",
        showLoader: true,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Checkout</h1>
        <p className="text-gray-500">
          Review your items and complete payment with our mock Paystack flow.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  ₦{item.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Subtotal</span>
            <span>₦{total.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Shipping</span>
            <span>₦0.00</span>
          </div>
          <div className="flex items-center justify-between text-lg font-semibold text-gray-900">
            <span>Total</span>
            <span>₦{total.toFixed(2)}</span>
          </div>
          <Button onClick={handlePayment} disabled={isSubmitting}>
            {isSubmitting ? "Starting payment..." : "Pay with Paystack (Mock)"}
          </Button>
          <p className="text-xs text-gray-500">
            This demo uses a Paystack-like flow without real charges.
          </p>
        </Card>
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
    </section>
  );
}
