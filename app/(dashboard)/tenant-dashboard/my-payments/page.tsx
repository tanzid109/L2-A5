import { Suspense } from "react"
import { getMyPayments } from "../../_actions/tenantAction"
import { PaymentCard } from "../../_components/PaymentCard"
import Loading from "@/app/loading"


const page = async () => {
    const { success, data, message } = await getMyPayments()

    if (!success || !data?.length) {
        return (
            <div className="bg-background border border-border rounded-xl p-8 text-center text-muted-foreground">
                {message ?? "No payments yet."}
            </div>
        )
    }

    return (
        <Suspense fallback={<Loading />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((payment) => (
                    <PaymentCard key={payment.id} payment={payment} />
                ))}
            </div>
        </Suspense>
    )
}

export default page