"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ToastComponent from "@/components/toast/toast-component";
import { useToast } from "@/components/toast/use-toast";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const { data: session } = useSession();
  const { toasts, addToast, removeToast } = useToast();
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (session?.user) {
      setFormState((prev) => ({
        ...prev,
        firstName: session.user.firstName ?? "",
        lastName: session.user.lastName ?? "",
        email: session.user.email ?? "",
      }));
    }
  }, [session?.user]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addToast({
      message: "Profile updated successfully.",
      type: "success",
      showLoader: true,
    });
  };

  return (
    <section className="px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Profile</h1>
        <p className="text-gray-500">
          Keep your personal information up to date for faster checkout.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900">Account</h2>
          <p className="mt-2 text-sm text-gray-500">
            Signed in as {session?.user.email ?? "customer@coveliteins.com"}.
          </p>
          <div className="mt-4 rounded-lg border border-dashed p-4 text-sm text-gray-600">
            Role: {session?.user.role ?? "customer"}
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900">
            Personal Information
          </h2>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  First name
                </label>
                <Input
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Last name
                </label>
                <Input
                  name="lastName"
                  value={formState.lastName}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <Input
                name="email"
                value={formState.email}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Delivery address
              </label>
              <Input
                name="address"
                value={formState.address}
                onChange={handleChange}
                className="mt-1"
                placeholder="Street, city, country"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Save changes</Button>
            </div>
          </form>
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
