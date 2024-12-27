"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Mail, User, Lock, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

export default function RegisterForm() {
  return (
    <section className="">
      {/* Name Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <Input
            className="py-6 bg-gray-100 border-0 pl-14 text-black"
            placeholder="First name"
          />
          <Button className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white text-blue-600 px-3 py-2">
            <User />
          </Button>
        </div>
        <div className="relative">
          <Input
            className="py-6 bg-gray-100 border-0 pl-14 text-black"
            placeholder="Last name"
          />
          <Button className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white text-blue-600 px-3 py-2">
            <User />
          </Button>
        </div>
      </div>

      {/* Email Field */}
      <div className="relative mt-4">
        <Input
          className="py-6 bg-gray-100 border-0 pl-14 text-black"
          placeholder="you@example.com"
        />
        <Button className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white text-blue-600 px-3 py-2">
          <Mail />
        </Button>
      </div>

      {/* Phone Number Field */}
      <div className="relative mt-4">
        <PhoneInput defaultCountry="NG" placeholder="Enter a phone number" />
      </div>

      {/* Address Field */}
      <div className="relative mt-4">
        <Input
          className="py-6 bg-gray-100 border-0 pl-14 text-black"
          placeholder="Address"
        />
        <Button className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white text-blue-600 px-3 py-2">
          <MapPin />
        </Button>
      </div>

      {/* Password Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div className="relative">
          <Input
            type="password"
            className="py-6 bg-gray-100 border-0 pl-14 text-black"
            placeholder="Password"
          />
          <Button className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white text-blue-600 px-3 py-2">
            <Lock />
          </Button>
        </div>
        <div className="relative">
          <Input
            type="password"
            className="py-6 bg-gray-100 border-0 pl-14 text-black"
            placeholder="Confirm Password"
          />
          <Button className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white text-blue-600 px-3 py-2">
            <Lock />
          </Button>
        </div>
      </div>

      <Button className="mt-4 w-full py-6">Register</Button>

      {/* Social Media Buttons */}
      <div className="mt-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button className="border border-gray-300 rounded-md py-2 px-4 flex items-center gap-3 text-gray-700 hover:bg-gray-50 transition">
            <FcGoogle className="text-2xl sm:text-3xl" />
            Sign up with Google
          </button>
          <button className="border border-gray-300 rounded-md py-2 px-4 flex items-center gap-3 text-gray-700 hover:bg-gray-50 transition">
            <FaFacebook className="text-2xl sm:text-3xl text-blue-600" />
            Sign up with Facebook
          </button>
        </div>
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
