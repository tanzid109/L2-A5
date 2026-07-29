"use client";

import { useTransition } from "react";
import Link from "next/link";
import { User, LogOut, Loader2, LucideLayoutDashboard } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/components/ui/avatar";
import { logout } from "@/service/logout";

type Role = "TENANT" | "LANDLORD" | "ADMIN";

interface ProfileDropdownProps {
    user: {
        name: string;
        email?: string;
        role?: Role;
        avatarUrl?: string;
    };
}

const dashboardByRole: Record<Role, { href: string; label: string }> = {
    TENANT: { href: "/tenant-dashboard", label: "My Dashboard" },
    LANDLORD: { href: "/landlord-dashboard", label: "My Dashboard" },
    ADMIN: { href: "/admin-dashboard", label: "My Dashboard" },
};

export function ProfileDropdown({ user }: ProfileDropdownProps) {
    const [isPending, startTransition] = useTransition();

    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const dashboard = user.role ? dashboardByRole[user.role] : dashboardByRole.TENANT;

    const handleSignOut = () => {
        startTransition(async () => {
            await logout();
        });
    };

    return (
        <DropdownMenu>
            {/* ── Trigger ── */}
            <DropdownMenuTrigger asChild>
                <Avatar className="h-10 w-10 cursor-pointer ring-2 ring-primary/20 hover:ring-primary/50 transition-all duration-200 focus:outline-none focus-visible:ring-ring">
                    {user.avatarUrl && (
                        <AvatarImage src={user.avatarUrl} alt={user.name} className="object-cover" />
                    )}
                    <AvatarFallback className="bg-primary/10 text-primary text-base font-semibold">
                        {initials}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            {/* ── Panel ── */}
            <DropdownMenuContent
                align="end"
                sideOffset={10}
                className="w-64 rounded-xl bg-popover border border-border shadow-xl p-0"
            >
                {/* Profile header */}
                <div className="flex flex-col items-center gap-3 px-6 py-4">
                    <Avatar className="h-18 w-18 ring-2 ring-primary/20">
                        {user.avatarUrl && (
                            <AvatarImage src={user.avatarUrl} alt={user.name} className="object-cover" />
                        )}
                        <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center gap-0.5">
                        <span className="text-popover-foreground font-semibold text-base tracking-tight">
                            {user.name}
                        </span>
                        {user.email && (
                            <span className="text-muted-foreground text-xs">{user.email}</span>
                        )}
                    </div>
                </div>

                <DropdownMenuSeparator className="bg-border mx-0" />

                {/* Dashboard (role-based) */}
                <DropdownMenuItem asChild className="rounded-none px-5 py-3 cursor-pointer focus:bg-accent">
                    <Link href={dashboard.href} className="flex items-center gap-3 text-popover-foreground">
                        <LucideLayoutDashboard className="h-5 w-5 shrink-0 text-muted-foreground" />
                        <span className="text-base font-medium">{dashboard.label}</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border mx-0" />
                {/* Sign Out */}
                <DropdownMenuItem
                    onClick={handleSignOut}
                    disabled={isPending}
                    className="rounded-none rounded-b-2xl px-5 py-3 cursor-pointer focus:bg-destructive/10"
                >
                    {isPending ? (
                        <Loader2 className="h-5 w-5 shrink-0 text-destructive animate-spin" />
                    ) : (
                        <LogOut className="h-5 w-5 shrink-0 text-destructive" />
                    )}
                    <span className="text-base font-medium text-destructive">
                        {isPending ? "Signing out..." : "Sign Out"}
                    </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}