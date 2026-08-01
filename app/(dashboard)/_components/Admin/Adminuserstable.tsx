"use client"

import { useState, useTransition } from "react"
import { Loader2, Ban, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { toast } from "sonner"
import { updateUserStatus, UserStatus } from "../../_actions/adminActions"

export interface AdminUser {
    id: string
    name: string
    email: string
    phone: string
    activeStatus: UserStatus
    role: "TENANT" | "LANDLORD" | "ADMIN"
    createdAt: string
    updatedAt: string
}

interface AdminUsersTableProps {
    users: AdminUser[]
}

const roleStyles: Record<string, string> = {
    ADMIN: "bg-primary/10 text-primary border-primary/20",
    LANDLORD: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    TENANT: "bg-muted text-muted-foreground border-border",
}

const statusStyles: Record<string, string> = {
    ACTIVE: "bg-primary/10 text-primary border-primary/20",
    BANNED: "bg-destructive/10 text-destructive border-destructive/20",
}

export function AdminUsersTable({ users: initialUsers }: AdminUsersTableProps) {
    const [users, setUsers] = useState(initialUsers)
    const [pendingId, setPendingId] = useState<string | null>(null)
    const [, startTransition] = useTransition()

    const handleToggleStatus = (user: AdminUser) => {
        const nextStatus: UserStatus = user.activeStatus === "ACTIVE" ? "BANNED" : "ACTIVE"
        const verb = nextStatus === "BANNED" ? "ban" : "reactivate"

        setPendingId(user.id)
        startTransition(async () => {
            const res = await updateUserStatus(user.id, nextStatus)
            if (res.success) {
                setUsers((prev) =>
                    prev.map((u) => (u.id === user.id ? { ...u, activeStatus: nextStatus } : u))
                )
                toast.success(res.message ?? `User ${nextStatus === "BANNED" ? "banned" : "reactivated"}.`)
            } else {
                toast.error(res.message ?? `Failed to ${verb} user.`)
            }
            setPendingId(null)
        })
    }

    if (!users.length) {
        return (
            <div className="bg-background border border-border rounded-xl p-8 text-center text-muted-foreground">
                No users found.
            </div>
        )
    }

    return (
        <div className="bg-background border border-border rounded-xl overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium text-foreground">{user.name}</TableCell>
                            <TableCell className="text-muted-foreground">{user.email}</TableCell>
                            <TableCell className="text-muted-foreground">{user.phone}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className={`capitalize ${roleStyles[user.role] ?? ""}`}>
                                    {user.role.toLowerCase()}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant="outline"
                                    className={`capitalize ${statusStyles[user.activeStatus] ?? ""}`}
                                >
                                    {user.activeStatus.toLowerCase()}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={pendingId === user.id || user.role === "ADMIN"}
                                    onClick={() => handleToggleStatus(user)}
                                    className={
                                        user.activeStatus === "ACTIVE"
                                            ? "gap-1.5 border-destructive/20 text-destructive hover:bg-destructive/10"
                                            : "gap-1.5 border-primary/20 text-primary hover:bg-primary/10"
                                    }
                                >
                                    {pendingId === user.id ? (
                                        <Loader2 size={14} className="animate-spin" />
                                    ) : user.activeStatus === "ACTIVE" ? (
                                        <Ban size={14} />
                                    ) : (
                                        <CheckCircle2 size={14} />
                                    )}
                                    {user.activeStatus === "ACTIVE" ? "Ban" : "Reactivate"}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}