import { Review } from "@/lib/types"
import { Star, User, Home } from "lucide-react"

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })
}

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={14}
                    className={
                        star <= rating
                            ? "fill-primary text-primary"
                            : "text-muted-foreground/30"
                    }
                />
            ))}
        </div>
    )
}

export function AllReviewsList({ reviews }: { reviews: Review[] }) {
    if (!reviews.length) {
        return (
            <div className="text-center py-10 text-muted-foreground text-sm">
                No reviews yet.
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            {reviews.map((review) => (
                <div
                    key={review.id}
                    className="border border-border rounded-lg p-4 flex flex-col gap-2 bg-background"
                >
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <User size={14} className="text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground">
                                    {review.tenant.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {formatDate(review.createdAt)}
                                </p>
                            </div>
                        </div>
                        <StarRating rating={review.rating} />
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Home size={12} />
                        <span>{review.property.title}</span>
                    </div>

                    <p className="text-sm text-foreground/80 leading-relaxed">
                        {review.comment}
                    </p>
                </div>
            ))}
        </div>
    )
}