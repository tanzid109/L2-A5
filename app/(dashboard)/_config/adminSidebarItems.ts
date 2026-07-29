import { ISidebarItem } from "@/lib/types";
import { FileText, LayoutDashboard } from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        label : "Admin Dashboard",
        href : "/admin-dashboard",
        icon : LayoutDashboard
    },
    {
        label : "All Users",
        href : "/admin-dashboard/all-users",
        icon : FileText
    },
]
