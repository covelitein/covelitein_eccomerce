import * as React from "react";
import {
  Grid2x2,
  Cog,
  Heart,
  ClipboardList,
  ShoppingBag,
  List,
  Grid,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Footer } from "./Footer";
import { Navlinks } from "@/components/layout/Navlinks";
import { useDialogForSettings } from "@/store/use-dialog";
import { Settings } from "../userdashboard/modals/Settings";
import { useSession } from "next-auth/react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useDialogForSettings();

  const { data: session } = useSession();

  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: Grid2x2,
        isActive: true,
      },
      {
        title: "Products",
        url: "/products",
        icon: ShoppingBag,
        isActive: false,
      },
      {
        title: "My Orders",
        url: "/orders",
        icon: ClipboardList,
        isActive: false,
        isAdmin: false,
      },
      {
        title: "Wishlist",
        url: "/wishlist",
        icon: Heart,
        isActive: false,
        isAdmin: false,
      },
      {
        title: "Checkout",
        url: "/checkout",
        icon: ShoppingBag,
        isActive: false,
        isAdmin: false,
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Cog,
        isActive: false,
        isModalEnabled: true,
        openModal: open,
      },
      {
        title: "Manage Products",
        url: "/manage-products",
        icon: List,
        isAdmin: true,
      },
      {
        title: "Manage Orders",
        url: "/manage-orders",
        icon: ClipboardList,
        isAdmin: true,
      },
      {
        title: "Manage Categories",
        url: "/manage-categories",
        icon: Grid,
        isAdmin: true,
      },
    ],
  };
  return (
    <>
      <Sidebar className="bg-white" {...props}>
        <SidebarHeader className="bg-white px-5">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-blue-600 data-[state=open]:text-white py-3 hover:bg-blue-600/10 hover:text-blue-600 "
              >
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-bold">Ecommerce</h3>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="bg-white px-2">
          <Navlinks role={session?.user.role} items={data.navMain} />
        </SidebarContent>
        <SidebarFooter className="p-4 bg-white">
          <Footer user={session?.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      {/* modals start */}
      <Settings />
      {/* modals end */}
    </>
  );
}
