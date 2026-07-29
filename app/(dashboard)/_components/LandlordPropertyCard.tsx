"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { MapPin, BedDouble, Bath, Pencil, Trash2, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { deleteProperty } from "../_actions/landlordActions"
import { MyProperty } from "@/lib/types"

interface LandlordPropertyCardProps {
    property: MyProperty
}

const statusStyles: Record<string, string> = {
    AVAILABLE: "bg-primary/10 text-primary border-primary/20",
    RENTED: "bg-destructive/10 text-destructive border-destructive/20",
    PENDING: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
}

export function LandlordPropertyCard({ property }: LandlordPropertyCardProps) {
    const [isPending, startTransition] = useTransition()
    const [deleted, setDeleted] = useState(false)

    const price = Number(property.price)
    const location = [property.address, property.city].filter(Boolean).join(", ")

    const handleDelete = () => {
        if (!window.confirm(`Delete "${property.title}"? This can't be undone.`)) return

        startTransition(async () => {
            const res = await deleteProperty(property.id)
            if (res.success) {
                setDeleted(true)
                toast.success(res.message ?? "Property deleted.")
            } else {
                toast.error(res.message ?? "Failed to delete property.")
            }
        })
    }

    if (deleted) return null

    return (
        <div className="bg-background border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-colors duration-300">
            {/* Image placeholder */}
            <div className="relative aspect-video w-full overflow-hidden bg-accent">
                <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm">
                    No image available
                </div>
                <Badge
                    variant="outline"
                    className={`absolute top-3 left-3 capitalize ${statusStyles[property.status] ?? ""}`}
                >
                    {property.status.toLowerCase()}
                </Badge>
            </div>

            <div className="p-4 flex flex-col gap-2">
                <h3 className="text-base font-semibold text-foreground line-clamp-1">
                    {property.title}
                </h3>

                <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <MapPin size={14} className="shrink-0" />
                    <span className="line-clamp-1">{location}</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-foreground/80 pt-1">
                    <div className="flex items-center gap-1.5">
                        <BedDouble size={16} className="text-muted-foreground" />
                        <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Bath size={16} className="text-muted-foreground" />
                        <span>{property.bathrooms}</span>
                    </div>
                </div>

                <div className="flex items-baseline gap-1 pt-1 border-t border-border/60 mt-1">
                    <span className="text-lg font-bold text-primary">
                        ${price.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">/ month</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3">
                    <Link href={`/landlord/properties/${property.id}/edit`} className="flex-1">
                        <Button
                            variant="outline"
                            className="w-full gap-1.5 border-border text-foreground hover:bg-accent"
                        >
                            <Pencil size={14} />
                            Edit
                        </Button>
                    </Link>
                    <Button
                        variant="outline"
                        onClick={handleDelete}
                        disabled={isPending}
                        className="gap-1.5 border-destructive/20 text-destructive hover:bg-destructive/10"
                    >
                        {isPending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                    </Button>
                </div>
            </div>
        </div>
    )
}