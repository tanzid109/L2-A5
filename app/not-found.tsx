import Link from "next/link"
import { Home, SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
            <div className="text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <SearchX className="h-10 w-10 text-primary" />
                </div>

                <p className="text-sm font-medium tracking-widest text-primary">
                    404
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Page not found
                </h1>
                <p className="mx-auto mt-4 max-w-md text-muted-foreground">
                    The page you&apos;re looking for doesn&apos;t exist or may have been moved.
                </p>

                <div className="mt-8 flex justify-center gap-3">
                    <Button asChild size="lg" className="gap-2">
                        <Link href="/">
                            <Home size={16} />
                            Return Home
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <Link href="/properties">Browse Properties</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}