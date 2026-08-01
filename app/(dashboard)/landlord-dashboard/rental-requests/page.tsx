import { Suspense } from "react"
import { getLandlordRentalRequests } from "../../_actions/landlordActions"
import { RentalRequestCard } from "../../_components/RentalRequestCard"
import Loading from "@/app/loading"

const page = async () => {
    const { success, data, message } = await getLandlordRentalRequests()

    if (!success || !data?.length) {
        return (
            <div className="bg-background border border-border rounded-xl p-8 text-center text-muted-foreground">
                {message ?? "No rental requests yet."}
            </div>
        )
    }

    return (
        <Suspense fallback={<Loading />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((request) => (
                    <RentalRequestCard key={request.id} request={request} />
                ))}
            </div>
        </Suspense>
    )
}

export default page