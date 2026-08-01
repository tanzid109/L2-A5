import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-background px-6 py-24 sm:py-32">
            <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                    Find your next home,
                    <br />
                    <span className="text-primary">without the hassle</span>
                </h1>

                <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
                    Browse verified rentals, connect with landlords, and manage everything
                    from request to move-in — all in one place.
                </p>

                {/* Quick stats / trust signals */}
                <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
                    <span>500+ Verified Listings</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Secure Payments</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Trusted by Tenants & Landlords</span>
                </div>
            </div>
        </section>
    )
}