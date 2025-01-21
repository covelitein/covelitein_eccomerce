"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

export function Navlinks({
  items
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    isAdmin?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
    isModalEnabled?: boolean;
    openModal?: () => void;
  }[];
}) {
  const router = useRouter();

  // State to track the active menu item
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleNavigation = (pathname: string) => {
    if (!pathname) return;
    router.push(pathname);
  };

  const handleActiveItem = (title: string) => {
    setActiveItem(title);
  };

  // Filter items based on isAdmin property
  const filteredItems = items.filter(
    (item) => item?.isAdmin === undefined || item.isAdmin === true
  );

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sm text-gray-400">
        Platform
      </SidebarGroupLabel>
      <SidebarMenu className="mt-2">
        {filteredItems.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            {item.isModalEnabled ? (
              <SidebarMenuItem onClick={item.openModal}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`[&_svg]:size-5 py-6 px-3 hover:bg-blue-50 hover:text-blue-600 ${
                      activeItem === item.title
                        ? "bg-blue-600 text-white"
                        : "bg-transparent text-gray-900"
                    }`}
                    onClick={() => handleActiveItem(item.title)}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>
            ) : (
              <SidebarMenuItem
                onClick={() => {
                  handleNavigation(item.url);
                  handleActiveItem(item.title);
                }}
              >
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`[&_svg]:size-5 py-6 px-3 hover:bg-blue-50 hover:text-blue-600 ${
                      activeItem === item.title
                        ? "bg-blue-600 text-white"
                        : "bg-transparent text-gray-900"
                    }`}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    {item.items && (
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a> 
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            )}
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
