"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Cog, User, LogOut, Bell, Sun, Moon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  const router = useRouter();
  const [auth, setAuth] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    const updateCSSVariable = () => {
      if (headerRef.current) {
        const headerWidth = headerRef.current.offsetWidth - 10;

        // Apply CSS variable for dropdown width based on breakpoints
        if (window.innerWidth < 640) {
          // 'sm' breakpoint: Fixed width for small screens
          document.documentElement.style.setProperty(
            "--dropdown-width",
            `${headerWidth}px`
          );
        } else {
          // Dynamic width for larger screens
          document.documentElement.style.setProperty(
            "--dropdown-width",
            `${headerWidth}px`
          );
        }
      }
    };

    // Initial call and update on resize
    updateCSSVariable();
    window.addEventListener("resize", updateCSSVariable);

    return () => {
      window.removeEventListener("resize", updateCSSVariable);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 flex justify-between items-center px-4 py-3 bg-white dark:bg-gray-900 border-b z-50"
    >
      <SidebarTrigger />
      <div className="flex items-center gap-2">
        {/* Notification Button */}
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>

        {/* Profile Avatar with Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-10 w-10 rounded-full cursor-pointer">
              <AvatarImage src="/illustrations/user-1.jpg" alt="User Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="mt-3 p-2 shadow-lg rounded-lg bg-white dark:bg-gray-800 max-sm:w-[var(--dropdown-width)] w-[12rem] max-sm:ml-1.5"
          >
            <DropdownMenuLabel className="text-lg font-semibold">
              John Doe
            </DropdownMenuLabel>
            <DropdownMenuItem>
              <User className="w-5 h-5 mr-2 text-gray-600" />
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Cog className="w-5 h-5 mr-2 text-gray-600" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="w-5 h-5 mr-2 text-gray-600" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Dark Mode Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {darkMode ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </Button>
      </div>
    </header>
  );
}
