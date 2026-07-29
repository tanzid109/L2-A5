import { getMyRentalRequests } from "../../_actions/tenantAction"
import { MyRentalRequestCard } from "../../_components/Myrentalrequestcard"

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
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-xl font-semibold text-foreground">Rental Requests</h1>
                <p className="text-sm text-muted-foreground">
                    {data.length} request{data.length === 1 ? "" : "s"} across your properties
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((request) => (
                    <MyRentalRequestCard key={request.id} request={request} />
                ))}
            </div>
        </div>
    )
}

export default page