import { ISidebarItem } from "@/lib/types";
import { FileText, HouseIcon, LayoutDashboard } from "lucide-react";

export const LANDLORD_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/landlord-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Properties",
    href: "/landlord-dashboard/my-properties",
    icon: HouseIcon,
  },
  {
    label: "Rental Requests",
    href: "/landlord-dashboard/rental-requests",
    icon: FileText,
  },

]