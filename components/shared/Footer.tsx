import Link from "next/link"
import { Home, Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
    company: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Properties", href: "/properties" },
    ],
    legal: [
        { label: "Terms of Service", href: "/#" },
        { label: "Privacy Policy", href: "/#" },
    ],
    account: [
        { label: "Login", href: "/login" },
        { label: "Register", href: "/register" },
    ],
}

export default function Footer() {
    return (
        <footer className="border-t border-border bg-background z-50">
            <div className="w-10/12 mx-auto py-12">
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                    {/* Brand */}
                    <div className="col-span-2 sm:col-span-1">
                        <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
                            <Home className="h-5 w-5 text-primary" />
                            RentNest
                        </Link>
                        <p className="mt-3 text-sm text-muted-foreground">
                            Find your next home, without the hassle.
                        </p>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">Company</h4>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">Legal</h4>
                        <ul className="space-y-2">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Account */}
                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">Account</h4>
                        <ul className="space-y-2">
                            {footerLinks.account.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Contact strip */}
                <div className="mt-10 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Mail size={14} />
                            support@rentnest.com
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Phone size={14} />
                            +1 (555) 123-4567
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPin size={14} />
                            San Francisco, CA
                        </div>
                    </div>

                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} RentNest. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}