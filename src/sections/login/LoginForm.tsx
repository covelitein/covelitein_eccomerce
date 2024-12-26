"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";

export default function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <section className="">
      <div className="relative">
        <Input
          className="py-6 bg-gray-100 border-0 pl-14 text-black"
          placeholder="you@example.com"
        />
        <Button className="text-white absolute left-1.5 bg-white hover:bg-white text-blue-600 top-[4.5px] [&_svg]:size-5 px-3 py-2">
          <Mail />
        </Button>
      </div>
      <div className="relative mt-4">
        <Input
          type={isPasswordVisible ? "text" : "password"}
          className="py-6 bg-gray-100 border-0 pl-14 text-black"
          placeholder="At least 8 characters"
        />
        <Button className="text-white absolute left-1.5 bg-white hover:bg-white text-blue-600 top-[4.5px] [&_svg]:size-5 px-3 py-2">
          <Lock />
        </Button>
        <Button
          className="top-[4.5px] absolute right-1.5 [&_svg]:size-5 px-3 py-2 bg-transparent hover:bg-transparent text-gray-600"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? <EyeOff /> : <Eye />}
        </Button>
      </div>
      <div className="mt-2 text-right">
        <Link href={"/"} className="text-blue-600 underline text-sm ">
          Forgotten password?
        </Link>
      </div>
      <Button className="mt-4 w-full">Login</Button>
      <div className="mt-7">
        <div className="grid sm:grid-cols-2 grid-cols-1 mb-4 gap-3">
          <button className="border border-[#e5eaf2] rounded-md py-2 px-4 flex items-center gap-[10px] text-[#424242] hover:bg-gray-50 transition-all duration-200 sm:text-sm">
            <FcGoogle className="text-3xl" />
            Sign in with Google
          </button>
          <button className="border border-[#e5eaf2] rounded-md py-2 px-4 flex items-center gap-[10px] text-[#424242] hover:bg-gray-50 transition-all duration-200 sm:text-sm">
            <FaFacebook className="text-3xl text-blue-600" />
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
