import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Cog, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const [auth, setAuth] = React.useState<boolean>(false);

  const handleRegisterNavigation = () => {
    router.push("/register");
  };

  const handleLoginNavigation = () => {
    router.push("/login");
  };
  return (
    <header className="sticky top-0 flex justify-between shrink-0 items-center gap-2 border-b py-3 px-5 bg-white z-50">
      <SidebarTrigger className="-ml-1" />
      <div className="flex items-center gap-3">
        {auth ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-10 w-10 rounded-full cursor-pointer">
                  <AvatarImage
                    src={"/illustrations/user-1.jpg"}
                    alt={"user.name"}
                  />
                  <AvatarFallback className="rounded-full">CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="sm:w-[25rem] w-[90vw] overflow-x-hidden sm:px-6 px-2 sm:py-4"
              >
                <DropdownMenuLabel className="text-xl font-semibold py-3">
                  User Profile
                </DropdownMenuLabel>
                <DropdownMenuItem>
                  <h3>hello</h3>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="py-4  [&_svg]:size-6 px-3">
                  <div className="bg-[#000080]/40 p-3 rounded-full text-white">
                    <User />
                  </div>
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-4  [&_svg]:size-6 px-3">
                  <div className="bg-[#000080]/40 p-3 rounded-full text-white">
                    <Cog />
                  </div>
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link
              href={"/login"}
              className="hover:bg-blue-700 bg-blue-600 px-5 rounded-lg text-white py-2 border-[2px] border-blue-600 text-sm"
            >
              Login
            </Link>
            <Link
              href={"/register"}
              className="bg-transparent px-5 py-2 border-[2px] rounded-lg border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 text-sm duration-100 transition-background"
            >
              Create account
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
