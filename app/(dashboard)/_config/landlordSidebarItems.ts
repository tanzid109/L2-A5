import { ISidebarItem } from "@/lib/types";
import { FileText, LayoutDashboard } from "lucide-react";

export const LANDLORD_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/landlord-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Rental Requests",
    href: "/landlord-dashboard/rental-requests",
    icon: FileText,
  },
]