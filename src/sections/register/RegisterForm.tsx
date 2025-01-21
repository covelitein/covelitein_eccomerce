"use client";

import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Mail, Lock, MapPin, EyeOff, Eye, User } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemaValidations";
import { z } from "zod";
import { useRequest } from "@/composables/use-request";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/toast/use-toast";
import { UserProps } from "@/types";
import ToastComponent from "@/components/toast/toast-component";
import { Loader2 } from 'lucide-react';

export default function RegisterForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isPasswordVisible);
  };

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirm: "",
    },
  });

  const router = useRouter()

  const { execute: createUser, loading: creating } =
    useRequest("/api/register");

    const { toasts, addToast } = useToast();

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    console.log(values);

    await createUser({
      method: "POST",
      data: values as UserProps,
      onSuccess: (data) => {
        console.log(data);
        addToast({ message: 'Registration successful!', type: 'success', showLoader: true })
        router.push('/login')
      },
      onError: (error) => {
        const errorMessage =
        (error as any).response?.data?.message || // Server-provided error message
        (error as any).response?.data?.error || // Alternative error field
        (error as any).message || // Fallback to Axios' default message
        "An unexpected error occurred";
        addToast({ message: `${errorMessage}`, type: 'danger', showLoader: true })
      },
    });
  };

  return (
    <section className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <Input
                      className="py-6 bg-gray-100 border-0 pl-14 text-black"
                      placeholder="First name"
                      {...field}
                    />
                    <Button
                      type="button"
                      className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white text-blue-600 px-3 py-2"
                    >
                      <User />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <Input
                      className="py-6 bg-gray-100 border-0 pl-14 text-black"
                      placeholder="Last name"
                      {...field}
                    />
                    <Button
                      type="button"
                      className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white text-blue-600 px-3 py-2"
                    >
                      <User />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="relative mt-4">
                  <Input
                    className="py-6 bg-gray-100 border-0 pl-14 text-black"
                    placeholder="you@example.com"
                    {...field}
                  />
                  <Button className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white text-blue-600 px-3 py-2">
                    <Mail />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number Field */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <div className="relative mt-4">
                  <PhoneInput
                    defaultCountry="NG"
                    placeholder="Enter a phone number"
                    {...field}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address Field */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <div className="relative mt-4">
                  <Input
                    className="py-6 bg-gray-100 border-0 pl-14 text-black"
                    placeholder="Address"
                    {...field}
                  />
                  <Button
                    type="button"
                    className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white text-blue-600 px-3 py-2"
                  >
                    <MapPin />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <Input
                      type={isPasswordVisible ? "text" : "password"}
                      className="py-6 bg-gray-100 border-0 pl-14 text-black"
                      placeholder="Password"
                      {...field}
                    />
                    <Button className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white text-blue-600 px-3 py-2">
                      <Lock />
                    </Button>
                    <Button
                      type="button"
                      className="top-[4.5px] absolute right-1.5 [&_svg]:size-5 px-3 py-2 bg-transparent hover:bg-transparent text-gray-600"
                      onClick={togglePasswordVisibility}
                    >
                      {isPasswordVisible ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <Input
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      className="py-6 bg-gray-100 border-0 pl-14 text-black"
                      placeholder="Confirm Password"
                      {...field}
                    />
                    <Button className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white text-blue-600 px-3 py-2">
                      <Lock />
                    </Button>
                    <Button
                      type="button"
                      className="top-[4.5px] absolute right-1.5 [&_svg]:size-5 px-3 py-2 bg-transparent hover:bg-transparent text-gray-600"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {isConfirmPasswordVisible ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={creating} type="submit" className="mt-4 w-full py-6">
            {creating ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Registering
              </span>
            ) : (
              'Register'
            )}
          </Button>
        </form>
      </Form>

      <div>
        {toasts.map((toast) => (
          <ToastComponent
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            showLoader={toast.showLoader}
            onDismiss={() => console.log('Toast dismissed')}
          />
        ))}
      </div>

      {/* Social Media Buttons */}
      <div className="mt-7">
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
