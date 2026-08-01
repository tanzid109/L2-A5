"use client"
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Building2, Menu, Sun, Moon } from "lucide-react"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "../ui/button"
import { ProfileDropdown } from "./ProfileDropdown"

const navItems = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
]

interface NavbarUser {
    id: string
    name: string
    email: string
    phone?: string
    role: "TENANT" | "LANDLORD" | "ADMIN"
    activeStatus: string
}

interface GetMeResponse {
    success: boolean
    message?: string
    data?: { user: NavbarUser }
}

export default function Navbar({ user }: { user: GetMeResponse }) {
    const pathname = usePathname()
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => setMounted(true), [])

    const isDark = resolvedTheme === "dark"
    const toggleTheme = () => setTheme(isDark ? "light" : "dark")

    const currentUser = user?.success ? user.data?.user : undefined
    const isLoggedIn = Boolean(currentUser)

    const mobileNav = isLoggedIn
        ? [...navItems, { name: "Profile", href: "/profile" }]
        : navItems

    return (
        <nav className="bg-background border-b border-border sticky top-0 z-50 w-full py-2">
            <div className="w-10/12 mx-auto py-2 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 text-primary">
                    <Building2 size={30} />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => {
                        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`relative text-base font-medium transition-all duration-300
                                ${isActive ? "text-primary font-semibold" : "text-foreground hover:text-primary/70"}
                                after:absolute after:left-0 after:-bottom-1 after:h-0.5
                                after:bg-primary after:transition-all after:duration-300
                                ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}
                                `}
                            >
                                {item.name}
                            </Link>
                        )
                    })}
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <button
                        type="button"
                        aria-label="Toggle theme"
                        onClick={toggleTheme}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground hover:bg-accent hover:text-primary transition-colors duration-200"
                    >
                        {mounted && isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {isLoggedIn && currentUser ? (
                        <ProfileDropdown user={currentUser} />
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/login">
                                <Button className="bg-transparent border border-border text-foreground hover:bg-accent">
                                    Log In
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                                    Register
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden flex items-center gap-3">
                    <button
                        type="button"
                        aria-label="Toggle theme"
                        onClick={toggleTheme}
                        className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground hover:bg-accent hover:text-primary transition-colors duration-200"
                    >
                        {mounted && isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <Sheet>
                        <SheetTrigger asChild>
                            <button
                                aria-label="Open menu"
                                className="text-foreground focus:outline-none"
                            >
                                <Menu size={26} />
                            </button>
                        </SheetTrigger>
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        <SheetContent side="right" className="bg-background border-l border-border w-72">
                            <div className="flex flex-col h-full pt-10 pb-8 px-6">

                                {/* Mobile Nav Links */}
                                <div className="flex flex-col gap-6">
                                    {mobileNav.map((item) => {
                                        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
                                        return (
                                            <SheetClose asChild key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    className={`relative text-lg font-medium transition-all duration-300
                                                    ${isActive ? "text-primary font-semibold" : "text-foreground hover:text-primary/70"}
                                                    after:absolute after:left-0 after:-bottom-1 after:h-0.5
                                                    after:bg-primary after:transition-all after:duration-300
                                                    ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}
                                                    `}
                                                >
                                                    {item.name}
                                                </Link>
                                            </SheetClose>
                                        )
                                    })}
                                </div>

                                {/* Mobile Auth Buttons */}
                                <div className="mt-8 flex flex-col gap-3">
                                    {isLoggedIn ? (
                                        <SheetClose asChild>
                                            <form action="/api/logout" method="post">
                                                <Button
                                                    type="submit"
                                                    className="w-full py-5 bg-transparent border border-border text-destructive hover:bg-destructive/10"
                                                >
                                                    Sign Out
                                                </Button>
                                            </form>
                                        </SheetClose>
                                    ) : (
                                        <>
                                            <SheetClose asChild>
                                                <Link href="/login">
                                                    <Button className="w-full py-5 bg-transparent border border-border text-foreground hover:bg-accent">
                                                        Log In
                                                    </Button>
                                                </Link>
                                            </SheetClose>
                                            <SheetClose asChild>
                                                <Link href="/register">
                                                    <Button className="w-full py-5 bg-primary text-primary-foreground hover:bg-primary/90">
                                                        Register
                                                    </Button>
                                                </Link>
                                            </SheetClose>
                                        </>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

            </div>
        </nav>
    )
}