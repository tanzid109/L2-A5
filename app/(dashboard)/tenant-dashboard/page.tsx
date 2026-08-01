import { Suspense } from "react"
import Loading from "@/app/loading"
import TenantOverview from "../_components/Tenant/TenantOverview"

const page = () => {
    return (
        <Suspense fallback={<Loading />}>
            <div>
                <TenantOverview />
            </div>
        </Suspense>
    )
}

export default page