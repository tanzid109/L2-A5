import { getAllRentals } from "../../_actions/adminActions"
import { AdminRentalsTable } from "../../_components/Adminrentalstable"

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
        <div>
            <AdminRentalsTable rentals={data} />
        </div>
    )
}
export default page