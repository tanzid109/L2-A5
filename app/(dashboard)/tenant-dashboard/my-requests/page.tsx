import { Suspense } from "react"
import { getMyRentalRequests } from "../../_actions/tenantAction"
import { MyRentalRequestCard } from "../../_components/Tenant/MyRentalRequestCard"
import Loading from "@/app/loading"

export const dynamic = "force-dynamic"


const page = async () => {
    const { success, data, message } = await getMyRentalRequests()

    if (!success || !data?.length) {
        return (
            <div className="bg-background border border-border rounded-xl p-8 text-center text-muted-foreground">
                {message ?? "No rental requests yet."}
            </div>
        )
    }

    return (
        <Suspense fallback={<Loading />}>
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((request) => (
                        <MyRentalRequestCard key={request.id} request={request} />
                    ))}
                </div>
            </div>
        </Suspense>
    )
}
export default page