"use client"

import { useState, useTransition } from "react"
import { Star, Loader2, MessageSquarePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { createReview } from "../../_actions/tenantAction"

export function ReviewDialog({ propertyId }: { propertyId: string }) {
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [comment, setComment] = useState("")
    const [isPending, startTransition] = useTransition()

    const handleSubmit = () => {
        if (rating === 0) {
            toast.error("Please select a rating.")
            return
        }
        if (!comment.trim()) {
            toast.error("Please write a comment.")
            return
        }

        startTransition(async () => {
            const res = await createReview(propertyId, { rating, comment })
            if (res.success) {
                toast.success(res.message ?? "Review submitted.")
                setOpen(false)
                setRating(0)
                setComment("")
            } else {
                toast.error(res.message ?? "Failed to submit review.")
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full gap-1.5">
                    <MessageSquarePlus size={14} />
                    Leave a Review
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Leave a Review</DialogTitle>
                </DialogHeader>

                <div className="flex items-center gap-1 py-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                        >
                            <Star
                                size={26}
                                className={
                                    star <= (hoverRating || rating)
                                        ? "fill-primary text-primary"
                                        : "text-muted-foreground"
                                }
                            />
                        </button>
                    ))}
                </div>

                <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience with this property..."
                    rows={4}
                />

                <DialogFooter>
                    <Button onClick={handleSubmit} disabled={isPending} className="gap-1.5">
                        {isPending ? <Loader2 size={14} className="animate-spin" /> : null}
                        Submit Review
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}