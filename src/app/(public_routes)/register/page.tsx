import { Sidebar } from "@/sections/login";
import { RegisterForm } from "@/sections/register";
import React from "react";

export default function Register() {
  return (
    <section className="h-screen overflow-hidden text-gray-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 h-full w-full">
        <div className="hidden lg:block bg-gray-100 h-full w-full">
          <Sidebar />
        </div>
        <div className="h-full lg:col-span-2 px-5 sm:px-8 overflow-y-scroll">
          <div className="flex flex-col py-10 h-full lg:w-2/3 sm:w-11/12 w-full mx-auto">
            {/* Heading */}
            <div className="mb-3 lg:text-left">
              <h3 className="text-2xl sm:text-3xl font-semibold text-black">
                Begin your journey now!
              </h3>
              <p className="font-medium text-sm sm:text-base mt-1">
                Enjoy easy and secure shopping with us.
              </p>
            </div>

            {/* Form */}
            <div className="mt-5 pb-7">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
