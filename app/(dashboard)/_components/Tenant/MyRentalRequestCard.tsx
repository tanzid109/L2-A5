"use client"

import { useTransition } from "react"
import { Home, Calendar, MapPin, BedDouble, Bath, User, Mail, Phone, CreditCard, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { MyRentalRequest } from "@/lib/types"
import { makePayment } from "../../_actions/tenantAction"
import { ReviewDialog } from "./ReviewDialog"

interface MyRentalRequestCardProps {
    request: MyRentalRequest
}

const statusStyles: Record<string, string> = {
    PENDING: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    APPROVED: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    ACTIVE: "bg-primary/10 text-primary border-primary/20",
    REJECTED: "bg-destructive/10 text-destructive border-destructive/20",
    COMPLETED: "bg-muted text-muted-foreground border-border",
}

function formatDate(iso: string | null) {
    if (!iso) return "—"
    return new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })
}

export function MyRentalRequestCard({ request }: MyRentalRequestCardProps) {
    const { property, payment } = request
    const [isPending, startTransition] = useTransition()
    const canPay = request.status === "APPROVED" && payment?.status !== "SUCCESS"
    const canReview = payment?.status === "SUCCESS"


    const handlePayment = () => {
        startTransition(async () => {
            const res = await makePayment(request.id)
            if (res.success) {
                toast.success(res.message ?? "Payment initiated.")

            } else {
                toast.error(res.message ?? "Failed to start payment.")
            }
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
                    className={`capitalize shrink-0 ${statusStyles[request.status] ?? ""}`}
                >
                    {request.status.toLowerCase()}
                </Badge>
            </div>

            <div className="flex items-center gap-1.5 text-muted-foreground text-xs -mt-2">
                <MapPin size={13} className="shrink-0" />
                <span className="line-clamp-1">
                    {property.address}, {property.city}
                </span>
            </div>

            {/* Bed/bath + category */}
            <div className="flex items-center gap-4 text-sm text-foreground/80">
                <div className="flex items-center gap-1.5">
                    <BedDouble size={15} className="text-muted-foreground" />
                    <span>{property.bedrooms}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Bath size={15} className="text-muted-foreground" />
                    <span>{property.bathrooms}</span>
                </div>
                {property.category?.name && (
                    <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
                        {property.category.name}
                    </Badge>
                )}
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

            {/* Pricing */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/60">
                <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-primary">
                        ${Number(property.price).toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">/ month</span>
                </div>
                {request.totalPrice !== null && (
                    <div className="flex items-baseline gap-1">
                        <span className="text-xs text-muted-foreground">Total:</span>
                        <span className="text-sm font-semibold text-foreground">
                            ${request.totalPrice.toLocaleString()}
                        </span>
                    </div>
                )}
            </div>

            {/* Landlord contact */}
            <div className="bg-accent/50 rounded-lg p-3 flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-sm text-foreground">
                    <User size={14} className="text-muted-foreground shrink-0" />
                    <span>{property.landlord.name}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail size={14} className="shrink-0" />
                    <span>{property.landlord.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Phone size={14} className="shrink-0" />
                    <span>{property.landlord.phone}</span>
                </div>
            </div>

            {canPay && (
                <Button
                    onClick={handlePayment}
                    disabled={isPending}
                    className="w-full gap-1.5"
                >
                    {isPending ? (
                        <Loader2 size={14} className="animate-spin" />
                    ) : (
                        <CreditCard size={14} />
                    )}
                    Pay Now
                </Button>
            )}

            {payment?.status === "FAILED" && (
                <p className="text-xs text-destructive text-center -mt-2">
                    Last payment attempt failed — try again.
                </p>
            )}
            {canReview && (
                <ReviewDialog propertyId={property.id} />
            )}
        </div>
    )
}