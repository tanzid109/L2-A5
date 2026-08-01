import { Home, Calendar, CreditCard, Receipt } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Payment } from "@/lib/types"

interface PaymentCardProps {
    payment: Payment
}

const statusStyles: Record<string, string> = {
    SUCCESS: "bg-primary/10 text-primary border-primary/20",
    PENDING: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    FAILED: "bg-destructive/10 text-destructive border-destructive/20",
}

function formatDate(iso: string | null) {
    if (!iso) return "—"
    return new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    })
}

export function PaymentCard({ payment }: PaymentCardProps) {
    const { rentalRequest } = payment
    const { property } = rentalRequest

    return (
        <div className="bg-background border border-border rounded-xl p-5 flex flex-col gap-4">
            {/* Header: property + status */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                    <Home size={16} className="text-muted-foreground shrink-0" />
                    <span className="text-sm font-semibold text-foreground line-clamp-1">
                        {property.title}
                    </span>
                </div>
                <Badge
                    variant="outline"
                    className={`capitalize shrink-0 ${statusStyles[payment.status] ?? ""}`}
                >
                    {payment.status.toLowerCase()}
                </Badge>
            </div>

            <p className="text-xs text-muted-foreground -mt-2">
                {property.address}, {property.city}
            </p>

            {/* Amount */}
            <div className="flex items-baseline gap-1 py-3 border-y border-border">
                <span className="text-2xl font-bold text-primary">
                    ${payment.amount.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">via {payment.provider}</span>
            </div>

            {/* Transaction details */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Receipt size={13} className="shrink-0" />
                    <span className="truncate font-mono">{payment.transactionId}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar size={13} className="shrink-0" />
                    <span>
                        {payment.paidAt ? `Paid ${formatDate(payment.paidAt)}` : "Not yet paid"}
                    </span>
                </div>
            </div>

            {/* Lease info */}
            {rentalRequest.totalPrice !== null && (
                <div className="flex items-center gap-2 text-xs text-foreground/80 pt-2 border-t border-border/60">
                    <CreditCard size={13} className="text-muted-foreground shrink-0" />
                    <span>
                        Lease total ${rentalRequest.totalPrice.toLocaleString()}
                        {rentalRequest.startDate && rentalRequest.endDate && (
                            <> · {formatDate(rentalRequest.startDate)} → {formatDate(rentalRequest.endDate)}</>
                        )}
                    </span>
                </div>
            )}
        </div>
    )
}