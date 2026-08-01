export default function AboutPage() {
    return (
        <div className="mx-auto max-w-4xl px-6 py-16">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    About RentNest
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Making renting simple, transparent, and stress-free.
                </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
                <div className="rounded-lg border border-border bg-card p-6">
                    <h3 className="mb-2 font-semibold text-card-foreground">For Tenants</h3>
                    <p className="text-sm text-muted-foreground">
                        Browse verified listings, submit rental requests, and manage payments — all in one place.
                    </p>
                </div>

                <div className="rounded-lg border border-border bg-card p-6">
                    <h3 className="mb-2 font-semibold text-card-foreground">For Landlords</h3>
                    <p className="text-sm text-muted-foreground">
                        List your properties, review tenant requests, and track payments without the paperwork.
                    </p>
                </div>

                <div className="rounded-lg border border-border bg-card p-6">
                    <h3 className="mb-2 font-semibold text-card-foreground">Secure & Simple</h3>
                    <p className="text-sm text-muted-foreground">
                        Built with role-based access, secure payments via Stripe, and a streamlined booking flow.
                    </p>
                </div>
            </div>

            <div className="mt-16 border-t border-border pt-10">
                <h2 className="mb-4 text-2xl font-semibold text-foreground">Our Mission</h2>
                <p className="leading-relaxed text-muted-foreground">
                    RentNest was built to remove the friction from renting — no more scattered listings,
                    confusing paperwork, or unclear payment trails. Whether you&apos;re searching for your
                    next home or managing multiple properties, RentNest keeps everything organized and
                    transparent from request to move-in.
                </p>
            </div>
        </div>
    )
}