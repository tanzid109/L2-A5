import { ISidebarItem } from "@/lib/types";
import { LayoutDashboard } from "lucide-react";
import { BiMoney } from "react-icons/bi";
import { FaHouseCircleCheck } from "react-icons/fa6";

export const TENANT_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/tenant-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Rental",
    href: "/tenant-dashboard/my-requests",
    icon: FaHouseCircleCheck,
  },
  {
    label: "My Payments",
    href: "/tenant-dashboard/my-payments",
    icon: BiMoney,
  },
]
