import { Suspense } from "react"
import { getAllRentals } from "../../_actions/adminActions"
import { AdminRentalsTable } from "../../_components/Adminrentalstable"
import Loading from "@/app/loading"

const page = async () => {
    const { success, data, message } = await getAllRentals()

    if (!success || !data?.length) {
        return (
            <div className="bg-background border border-border rounded-xl p-8 text-center text-muted-foreground">
                {message ?? "No rentals found."}
            </div>
        )
    }

    return (
        <Suspense fallback={<Loading />}>
            <div>
                <AdminRentalsTable rentals={data} />
            </div>
        </Suspense>

    )
}
export default page