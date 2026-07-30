import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export interface AdminRental {
    id: string
    status: string
    startDate: string | null
    endDate: string | null
    totalPrice: number | null
    tenant: {
        id: string
        name: string
        email: string
    }
    property: {
        id: string
        title: string
        price: string
        status: string
    }
    payment: {
        id: string
        transactionId: string
        amount: number
        provider: string
        status: string
        paidAt: string | null
    } | null
}

interface AdminRentalsTableProps {
    rentals: AdminRental[]
}

const rentalStatusStyles: Record<string, string> = {
    ACTIVE: "bg-primary/10 text-primary border-primary/20",
    APPROVED: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    PENDING: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    REJECTED: "bg-destructive/10 text-destructive border-destructive/20",
    CANCELLED: "bg-destructive/10 text-destructive border-destructive/20",
}

const paymentStatusStyles: Record<string, string> = {
    SUCCESS: "bg-primary/10 text-primary border-primary/20",
    PENDING: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    FAILED: "bg-destructive/10 text-destructive border-destructive/20",
}

function formatDate(value: string | null) {
    if (!value) return "—"
    return new Date(value).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    })
}

export function AdminRentalsTable({ rentals }: AdminRentalsTableProps) {
    if (!rentals.length) {
        return (
            <div className="bg-background border border-border rounded-xl p-8 text-center text-muted-foreground">
                No rentals found.
            </div>
        )
    }

    return (
        <div className="bg-background border border-border rounded-xl overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Property</TableHead>
                        <TableHead>Tenant</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Start</TableHead>
                        <TableHead>End</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Payment</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rentals.map((rental) => (
                        <TableRow key={rental.id}>
                            <TableCell className="font-medium text-foreground max-w-55 truncate">
                                {rental.property.title}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                                <div className="flex flex-col">
                                    <span>{rental.tenant.name}</span>
                                    <span className="text-xs">{rental.tenant.email}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant="outline"
                                    className={`capitalize ${rentalStatusStyles[rental.status] ?? ""}`}
                                >
                                    {rental.status.toLowerCase()}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{formatDate(rental.startDate)}</TableCell>
                            <TableCell className="text-muted-foreground">{formatDate(rental.endDate)}</TableCell>
                            <TableCell className="font-medium text-primary">
                                {rental.totalPrice ? `$${rental.totalPrice.toLocaleString()}` : "—"}
                            </TableCell>
                            <TableCell>
                                {rental.payment ? (
                                    <Badge
                                        variant="outline"
                                        className={`capitalize ${paymentStatusStyles[rental.payment.status] ?? ""}`}
                                    >
                                        {rental.payment.status.toLowerCase()}
                                    </Badge>
                                ) : (
                                    <span className="text-muted-foreground">—</span>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}