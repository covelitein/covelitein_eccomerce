import { LoginForm, Sidebar } from "@/sections/login";
import React from "react";

export default function Login() {
  return (
    <section className="h-screen overflow-hidden text-gray-500">
      <div className="grid lg:grid-cols-2 grid-cols-1 h-full w-full">
        <div className="bg-gray-100 h-full w-full lg:block hidden">
          <Sidebar />
        </div>
        <div className="h-full overflow-y-scroll max-sm:pt-5">
          <div className="md:w-2/3 h-full sm:w-11/12 w-full max-sm:px-4 mx-auto flex flex-col justify-center">
            {/* heading start */}
            <div className="mb-3">
              <h3 className="sm:text-3xl text-2xl font-semibold text-black">
                Welcome back!
              </h3>
              <p className="font-semibold text-sm mt-1">
                Start shopping right away without stress.
              </p>
            </div>
            {/* heading end */}

            {/* login form start */}
            <div className="mt-5">
              <LoginForm />
            </div>
            {/* login form end */}
          </div>
        </div>
      </div>
    </section>
  );
}
