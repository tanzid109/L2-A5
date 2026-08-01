import Link from "next/link"
import { CheckCircle2, Home, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default async function PaymentSuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string }>
}) {
    const { session_id } = await searchParams

    return (
        <div className="flex min-h-[80vh] items-center justify-center px-6">
            <Card className="w-full max-w-md text-center">
                <CardContent className="pt-10 pb-8 px-6">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                        <CheckCircle2 className="h-9 w-9 text-green-500" />
                    </div>

                    <h1 className="text-2xl font-bold text-foreground">
                        Payment Successful
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Your payment has been processed successfully. A confirmation has
                        been sent to your email.
                    </p>

                    {session_id && (
                        <div className="mt-6 rounded-lg border border-border bg-muted/30 px-4 py-3 text-left">
                            <p className="text-xs text-muted-foreground">Transaction ID</p>
                            <p className="mt-1 truncate text-sm font-mono text-foreground">
                                {session_id}
                            </p>
                        </div>
                    )}

                    <div className="mt-8 flex flex-col gap-3">
                        <Button asChild size="lg" className="gap-2">
                            <Link href="/tenant-dashboard">
                                <Home size={16} />
                                Go to Dashboard
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="gap-2">
                            <Link href="/tenant-dashboard/payments">
                                <Receipt size={16} />
                                View Payment History
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}