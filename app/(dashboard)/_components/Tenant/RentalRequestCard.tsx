"use client"

import { useState, useTransition } from "react"
import { User, Mail, Phone, Home, Calendar, CreditCard, Check, X, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { rentalStatusChange } from "../../_actions/landlordActions"
import { RentalRequest } from "@/lib/types"

interface RentalRequestCardProps {
    request: RentalRequest
}

const statusStyles: Record<string, string> = {
    PENDING: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    ACTIVE: "bg-primary/10 text-primary border-primary/20",
    REJECTED: "bg-destructive/10 text-destructive border-destructive/20",
    COMPLETED: "bg-muted text-muted-foreground border-border",
}

const paymentStatusStyles: Record<string, string> = {
    SUCCESS: "bg-primary/10 text-primary border-primary/20",
    FAILED: "bg-destructive/10 text-destructive border-destructive/20",
    PENDING: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
}

function formatDate(iso: string | null) {
    if (!iso) return "—"
    return new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })
}

export function RentalRequestCard({ request }: RentalRequestCardProps) {
    const { tenant, property, payment } = request
    const [isPending, startTransition] = useTransition()
    const [status, setStatus] = useState(request.status)
    const [activeAction, setActiveAction] = useState<"APPROVED" | "REJECTED" | null>(null)

    const handleStatusChange = (nextStatus: "APPROVED" | "REJECTED") => {
        if (nextStatus === "REJECTED") {
            const confirmed = window.confirm(
                "Reject this rental request? This can't be undone."
            )
            if (!confirmed) return
        }

        setActiveAction(nextStatus)
        startTransition(async () => {
            const res = await rentalStatusChange(request.id, nextStatus)
            if (res.success) {
                setStatus(nextStatus === "APPROVED" ? "ACTIVE" : "REJECTED")
                toast.success(res.message ?? `Request ${nextStatus.toLowerCase()}.`)
            } else {
                toast.error(res.message ?? "Failed to update rental request.")
            }
            setActiveAction(null)
        })
    }

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
                    className={`capitalize shrink-0 ${statusStyles[status] ?? ""}`}
                >
                    {status.toLowerCase()}
                </Badge>
            </div>

            <p className="text-xs text-muted-foreground -mt-2">
                {property.address}, {property.city} · ${Number(property.price).toLocaleString()}/mo
            </p>

            {/* Tenant info */}
            <div className="bg-accent/50 rounded-lg p-3 flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-sm text-foreground">
                    <User size={14} className="text-muted-foreground shrink-0" />
                    <span>{tenant.name}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail size={14} className="shrink-0" />
                    <span>{tenant.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Phone size={14} className="shrink-0" />
                    <span>{tenant.phone}</span>
                </div>
            </div>

            {/* Lease dates */}
            {(request.startDate || request.endDate) && (
                <div className="flex items-center gap-2 text-sm text-foreground/80">
                    <Calendar size={14} className="text-muted-foreground shrink-0" />
                    <span>
                        {formatDate(request.startDate)} → {formatDate(request.endDate)}
                    </span>
                </div>
            )}

            {request.totalPrice !== null && (
                <div className="flex items-baseline gap-1">
                    <span className="text-sm text-muted-foreground">Total:</span>
                    <span className="text-base font-semibold text-primary">
                        ${request.totalPrice.toLocaleString()}
                    </span>
                </div>
            )}

            {/* Payment */}
            {payment ? (
                <div className="flex items-center justify-between gap-2 text-xs pt-2 border-t border-border/60">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                        <CreditCard size={13} />
                        <span>{payment.provider} · {formatDate(payment.paidAt)}</span>
                    </div>
                    <Badge
                        variant="outline"
                        className={`capitalize ${paymentStatusStyles[payment.status] ?? ""}`}
                    >
                        {payment.status.toLowerCase()}
                    </Badge>
                </div>
            ) : (
                <p className="text-xs text-muted-foreground pt-2 border-t border-border/60">
                    No payment made yet.
                </p>
            )}

            {/* Approve / Reject — only for PENDING requests */}
            {status === "PENDING" && (
                <div className="flex items-center gap-2 pt-2 border-t border-border/60 mt-1">
                    <Button
                        variant="outline"
                        onClick={() => handleStatusChange("APPROVED")}
                        disabled={isPending}
                        className="flex-1 gap-1.5 border-primary/20 text-primary hover:bg-primary/10"
                    >
                        {isPending && activeAction === "APPROVED" ? (
                            <Loader2 size={14} className="animate-spin" />
                        ) : (
                            <Check size={14} />
                        )}
                        Approve
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => handleStatusChange("REJECTED")}
                        disabled={isPending}
                        className="flex-1 gap-1.5 border-destructive/20 text-destructive hover:bg-destructive/10"
                    >
                        {isPending && activeAction === "REJECTED" ? (
                            <Loader2 size={14} className="animate-spin" />
                        ) : (
                            <X size={14} />
                        )}
                        Reject
                    </Button>
                </div>
            )}
        </div>
    )
}