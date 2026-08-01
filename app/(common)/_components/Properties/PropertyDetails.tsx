import {
    MapPin,
    BedDouble,
    Bath,
    Tag,
    User,
    Mail,
    Calendar,
    Clock,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Property } from "../../_actions/allProperty"
import { RentButton } from "./RentButton"

const statusStyles: Record<string, string> = {
    AVAILABLE: "bg-primary/10 text-primary border-primary/20",
    RENTED: "bg-destructive/10 text-destructive border-destructive/20",
    PENDING: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}

export function PropertyDetailsCard({ property }: { property: Property }) {
    const price = Number(property.price)
    const location = [property.address, property.city].filter(Boolean).join(", ")

    return (
        <div className="bg-background border border-border rounded-xl overflow-hidden">
            {/* Image placeholder */}
            <div className="relative aspect-video w-full overflow-hidden bg-accent">
                <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm">
                    No image available
                </div>
                {property.status && (
                    <Badge
                        variant="outline"
                        className={`absolute top-4 left-4 capitalize ${statusStyles[property.status] ?? ""}`}
                    >
                        {property.status.toLowerCase()}
                    </Badge>
                )}
            </div>

            <div className="p-6 flex flex-col gap-6">
                {/* Title + category */}
                <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                        <h1 className="text-2xl font-semibold text-foreground">
                            {property.title}
                        </h1>
                        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-2">
                            <MapPin size={15} className="shrink-0" />
                            <span>{location}</span>
                        </div>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1.5 text-sm px-3 py-1.5">
                        <Tag size={13} />
                        {property.category.name}
                    </Badge>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 py-4 border-y border-border">
                    <span className="text-3xl font-bold text-primary">
                        ${price.toLocaleString()}
                    </span>
                    <span className="text-base text-muted-foreground">/ month</span>
                </div>
                <RentButton propertyId={property.id} status={property.status} />

                {/* Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2.5 text-foreground">
                        <BedDouble size={20} className="text-muted-foreground" />
                        <div>
                            <p className="text-sm font-medium">{property.bedrooms}</p>
                            <p className="text-xs text-muted-foreground">Bedrooms</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2.5 text-foreground">
                        <Bath size={20} className="text-muted-foreground" />
                        <div>
                            <p className="text-sm font-medium">{property.bathrooms}</p>
                            <p className="text-xs text-muted-foreground">Bathrooms</p>
                        </div>
                    </div>
                </div>

                {/* Description */}
                {property.description && (
                    <div>
                        <h2 className="text-sm font-semibold text-foreground mb-2">Description</h2>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {property.description}
                        </p>
                    </div>
                )}

                {/* Address block */}
                <div>
                    <h2 className="text-sm font-semibold text-foreground mb-2">Address</h2>
                    <p className="text-sm text-muted-foreground">{property.address}</p>
                    <p className="text-sm text-muted-foreground">{property.city}</p>
                </div>

                {/* Landlord */}
                <div className="bg-accent/50 rounded-lg p-4 flex flex-col gap-2">
                    <h2 className="text-sm font-semibold text-foreground mb-1">Listed by</h2>
                    <div className="flex items-center gap-2.5 text-sm text-foreground">
                        <User size={16} className="text-muted-foreground" />
                        <span>{property.landlord.name}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <Mail size={16} />
                        <span>{property.landlord.email}</span>
                    </div>
                </div>

                {/* Meta / timestamps */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground pt-2 border-t border-border/60">
                    <div className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        <span>Listed on {formatDate(property.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock size={13} />
                        <span>Updated {formatDate(property.updatedAt)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}