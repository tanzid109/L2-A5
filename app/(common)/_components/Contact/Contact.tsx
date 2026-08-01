export default function ContactPage() {
    return (
        <div className="mx-auto max-w-2xl px-6 py-16">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Get in Touch
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Questions about a listing, your account, or RentNest in general? We&apos;d love to hear from you.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-card p-6">
                    <h3 className="mb-1 font-semibold text-card-foreground">Email</h3>
                    <p className="text-sm text-muted-foreground">support@rentnest.com</p>
                </div>

                <div className="rounded-lg border border-border bg-card p-6">
                    <h3 className="mb-1 font-semibold text-card-foreground">Phone</h3>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>

                <div className="rounded-lg border border-border bg-card p-6">
                    <h3 className="mb-1 font-semibold text-card-foreground">Office</h3>
                    <p className="text-sm text-muted-foreground">
                        123 Market Street, Suite 400<br />
                        San Francisco, CA 94103
                    </p>
                </div>

                <div className="rounded-lg border border-border bg-card p-6">
                    <h3 className="mb-1 font-semibold text-card-foreground">Hours</h3>
                    <p className="text-sm text-muted-foreground">
                        Mon – Fri, 9:00 AM – 6:00 PM
                    </p>
                </div>
            </div>
        </div>
    )
}