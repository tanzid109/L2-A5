import { ISidebarItem } from "@/lib/types"
import { Bookmark, Building, FileText, LayoutDashboard, Users } from "lucide-react"
import { BiCategory } from "react-icons/bi"

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/admin-dashboard/users",
    icon: Users,
  },
  {
    label: "Properties",
    href: "/admin-dashboard/properties",
    icon: Building,
  },
  {
    label: "Rentals",
    href: "/admin-dashboard/rentals",
    icon: Bookmark,
  },
  {
    label: "Categories",
    href: "/admin-dashboard/categories",
    icon: BiCategory,
  },
]
