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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    onClick={handleLoginNavigation}
                    className="relative inline-flex items-center justify-center px-5 py-2.5 overflow-hidden font-medium text-primary transition duration-300 ease-out border-2 border-primary group bg-blue-600 hover:bg-transparent text-white border border-blue-600"
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-blue-600 duration-300 -translate-x-full bg-transparent group-hover:translate-x-0 ease">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                      Login
                    </span>
                    <span className="relative invisible">Login</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-black/80 text-white">
                  login
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <Button
                    onClick={handleRegisterNavigation}
                    className="relative inline-flex items-center justify-center px-5 py-2.5 overflow-hidden font-medium text-primary transition duration-300 ease-out border-2 border-primary group bg-transparent text-white border border-blue-600"
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-primary group-hover:translate-x-0 ease">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-primary transition-all duration-300 transform group-hover:translate-x-full ease">
                      Create an Account
                    </span>
                    <span className="relative invisible">
                      Create an Account
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-black/80 text-white">
                  Create an Account
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
      </div>
    </header>
  );
}
