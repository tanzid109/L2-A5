import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export interface AdminProperty {
    id: string
    title: string
    address: string
    city: string
    price: string
    bedrooms: number
    bathrooms: number
    status: "AVAILABLE" | "RENTED" | "PENDING"
    landlord: {
        id: string
        name: string
        email: string
        phone: string
    }
    category: {
        id: string
        name: string
    }
}

interface AdminPropertiesTableProps {
    properties: AdminProperty[]
}

const statusStyles: Record<string, string> = {
    AVAILABLE: "bg-primary/10 text-primary border-primary/20",
    RENTED: "bg-destructive/10 text-destructive border-destructive/20",
    PENDING: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
}

export function AdminPropertiesTable({ properties }: AdminPropertiesTableProps) {
    if (!properties.length) {
        return (
            <div className="bg-background border border-border rounded-xl p-8 text-center text-muted-foreground">
                No properties found.
            </div>
        )
    }

    return (
        <div className="bg-background border border-border rounded-xl overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Landlord</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Beds/Baths</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {properties.map((property) => (
                        <TableRow key={property.id}>
                            <TableCell className="font-medium text-foreground max-w-55 truncate">
                                {property.title}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                                <div className="flex flex-col">
                                    <span>{property.landlord.name}</span>
                                    <span className="text-xs">{property.landlord.email}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{property.category.name}</TableCell>
                            <TableCell className="text-muted-foreground">
                                {[property.address, property.city].filter(Boolean).join(", ")}
                            </TableCell>
                            <TableCell className="font-medium text-primary">
                                ${Number(property.price).toLocaleString()}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                                {property.bedrooms} bd / {property.bathrooms} ba
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant="outline"
                                    className={`capitalize ${statusStyles[property.status] ?? ""}`}
                                >
                                    {property.status.toLowerCase()}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}