import { ISidebarItem } from "@/lib/types";
import { FileText, LayoutDashboard } from "lucide-react";

export const TENANT_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/tenant-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Rental",
    href: "/tenant-dashboard/my-requests",
    icon: FileText,
  },
]
