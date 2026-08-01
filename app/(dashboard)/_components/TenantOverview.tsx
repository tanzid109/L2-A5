import { Home } from "lucide-react"

export default function TenantOverview() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-6">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Home className="h-8 w-8 text-primary" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Welcome to Your Dashboard
            </h1>
            <p className="mt-3 max-w-md text-muted-foreground">
                Browse properties, track your rental requests, and manage your payments — all in one place.
            </p>
        </div>
    )
}