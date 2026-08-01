import Link from "next/link"
import { MapPin, BedDouble, Bath } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Property } from "../../_actions/allProperty"

export function PropertyCard({ property }: { property: Property }) {
    const price = Number(property.price)
    const location = [property.address, property.city].filter(Boolean).join(", ")

    return (
        <Link
            href={`/properties/${property.id}`}
            className="group block bg-background border border-border rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all duration-300"
        >
            {/* Image */}
            <div className="relative aspect-4/3 w-full overflow-hidden bg-accent">
                <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm">
                    No image available
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {property.title}
                    </h3>
                    <Badge variant="secondary" className="shrink-0 text-xs font-medium">
                        {property.category.name}
                    </Badge>
                </div>

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
                    <span className="text-sm text-muted-foreground">/ year</span>
                </div>
            </div>
        </Link>
    )
}