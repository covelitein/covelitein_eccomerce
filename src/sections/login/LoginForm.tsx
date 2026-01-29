"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemaValidations";
import { z } from "zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/toast/use-toast";
import ToastComponent from "@/components/toast/toast-component";
import { Loader2 } from "lucide-react";

export default function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toasts, addToast, removeToast } = useToast();
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true);
    const response = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/dashboard",
    });

    if (response?.error) {
      addToast({
        message: "Invalid email or password. Please try again.",
        type: "danger",
        showLoader: true,
      });
      setIsSubmitting(false);
      return;
    }

    addToast({
      message: "Welcome back!",
      type: "success",
      showLoader: true,
    });
    router.push(response?.url ?? "/dashboard");
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <section className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <Input
                    className="py-6 bg-gray-100 border-0 pl-14 text-black"
                    placeholder="you@example.com"
                    {...field}
                  />
                  <Button
                    type="button"
                    className="text-white absolute left-1.5 bg-white hover:bg-white text-blue-600 top-[4.5px] [&_svg]:size-5 px-3 py-2"
                  >
                    <Mail />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="relative mt-4">
                  <Input
                    type={isPasswordVisible ? "text" : "password"}
                    className="py-6 bg-gray-100 border-0 pl-14 text-black"
                    placeholder="At least 8 characters"
                    {...field}
                  />
                  <Button
                    type="button"
                    className="text-white absolute left-1.5 bg-white hover:bg-white text-blue-600 top-[4.5px] [&_svg]:size-5 px-3 py-2"
                  >
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
          <div className="mt-2 text-right">
            <Link href={"/"} className="text-blue-600 underline text-sm ">
              Forgotten password?
            </Link>
          </div>
          <Button className="mt-4 w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Signing in
              </span>
            ) : (
              "Login"
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
            onDismiss={() => removeToast(toast.id)}
          />
        ))}
      </div>
      <div className="mt-7">
        <div className=" mb-4 gap-3">
          <button
            className="border border-[#e5eaf2] rounded-md py-2 px-4 flex items-center gap-[10px] text-[#424242] hover:bg-gray-50 transition-all duration-200 sm:text-sm w-full justify-center"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </button>
        </div>
        <p className="text-center sm:text-sm">
          Don&apos;t have an account?{" "}
          <Link href={"/register"} className="text-blue-600 underline">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}
