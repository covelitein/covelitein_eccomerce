"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemaValidations";
import { z } from "zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

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
    console.log(values);
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  const handleFacebookSignIn = async () => {
    await signIn("facebook", { callbackUrl: "/dashboard" });
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
          <Button className="mt-4 w-full">Login</Button>
        </form>
      </Form>
      <div className="mt-7">
        <div className="grid sm:grid-cols-2 grid-cols-1 mb-4 gap-3">
          <button
            className="border border-[#e5eaf2] rounded-md py-2 px-4 flex items-center gap-[10px] text-[#424242] hover:bg-gray-50 transition-all duration-200 sm:text-sm"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </button>
          <button
            className="border border-[#e5eaf2] rounded-md py-2 px-4 flex items-center gap-[10px] text-[#424242] hover:bg-gray-50 transition-all duration-200 sm:text-sm"
            onClick={handleFacebookSignIn}
          >
            <FaFacebook className="text-2xl text-blue-600" />
            Sign in with Facebook
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
