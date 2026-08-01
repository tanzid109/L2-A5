"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { ISidebarItem, NavbarProps } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarMenuItems } from "../_config/sidebarMenuItems";

export default function DashboardSidebar({ user }: NavbarProps) {
  const pathname = usePathname();

  let navItems: ISidebarItem[] = [];

  if (user?.data?.user?.role === "TENANT") {
    navItems = sidebarMenuItems.TENANT
  } else if (user?.data?.user?.role === "LANDLORD") {
    navItems = sidebarMenuItems.LANDLORD;
  } else if (user?.data?.user?.role === "ADMIN") {
    navItems = sidebarMenuItems.ADMIN;
  }

  return (
    <Sidebar
      collapsible="offcanvas"
      className="border-r border-sidebar-border"
    >
      <SidebarContent>
        <SidebarHeader className="px-4 py-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Dashboard
          </p>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    size={"lg"}
                    asChild
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href} className="text-md!">
                      <item.icon className="size-4!" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
