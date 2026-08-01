import { Suspense } from "react"
import { getReviews } from "../../_actions/tenantAction"
import { AllReviewsList } from "../../_components/Tenant/AllReviewsList"
import Loading from "@/app/loading"

export default async function ReviewsPage() {
    const { success, data, message } = await getReviews()

    if (!success || !data?.length) {
        return (
            <div className="bg-background border border-border rounded-xl p-8 text-center text-muted-foreground">
                {message ?? "No reviews yet."}
            </div>
        )
    }

    return (
        <Suspense fallback={<Loading />}>
            <div >
                <h1 className="text-2xl font-semibold text-foreground mb-6">All Reviews</h1>
                <AllReviewsList reviews={data} />
            </div>
        </Suspense>
    )
}