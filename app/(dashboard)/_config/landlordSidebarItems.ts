import { ISidebarItem } from "@/lib/types";
import { FileText, LayoutDashboard } from "lucide-react";
import { BsFillHouseAddFill, BsHouseFill } from "react-icons/bs";

export const LANDLORD_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/landlord-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Properties",
    href: "/landlord-dashboard/my-properties",
    icon: BsHouseFill,
  },
  {
    label: "Rental Requests",
    href: "/landlord-dashboard/rental-requests",
    icon: FileText,
  },
  {
    label: "Add New Property",
    href: "/landlord-dashboard/add-property",
    icon: BsFillHouseAddFill,
  },
]