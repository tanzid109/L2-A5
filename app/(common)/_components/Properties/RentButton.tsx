"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Home, Ban } from "lucide-react"
import { toast } from "sonner"
import { createRentalRequest } from "../../_actions/createRentalRequest"

interface RentButtonProps {
    propertyId: string
    status: "AVAILABLE" | "RENTED" | "PENDING"
}

export function RentButton({ propertyId, status }: RentButtonProps) {
    const [isPending, startTransition] = useTransition()
    const [requested, setRequested] = useState(false)

    const isAvailable = status === "AVAILABLE"

    const handleRentRequest = () => {
        startTransition(async () => {
            const res = await createRentalRequest(propertyId)

            if (res.success) {
                setRequested(true)
                toast.success("Rental request sent to the landlord.")
            } else {
                toast.error(res.message ?? "Failed to send rental request. Try again.")
            }
        })
    }

    if (!isAvailable) {
        return (
            <Button
                disabled
                className="w-full sm:w-auto gap-2 bg-muted text-muted-foreground cursor-not-allowed"
            >
                <Ban size={16} />
                {status === "RENTED" ? "Already Rented" : "Pending"}
            </Button>
        )
    }

    if (requested) {
        return (
            <Button
                disabled
                className="w-full sm:w-auto gap-2 bg-primary/10 text-primary border border-primary/20"
            >
                Request Sent
            </Button>
        )
    }

    return (
        <Button
            onClick={handleRentRequest}
            disabled={isPending}
            className="w-full sm:w-auto gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
            {isPending ? (
                <Loader2 size={16} className="animate-spin" />
            ) : (
                <Home size={16} />
            )}
            {isPending ? "Sending Request..." : "Rent This Property"}
        </Button>
    )
}