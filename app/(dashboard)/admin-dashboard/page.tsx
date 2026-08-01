import { Suspense } from "react"
import Loading from "@/app/loading"
import AdminOverview from "../_components/AdminOverview"

const page = () => {
    return (
        <Suspense fallback={<Loading />}>
            <div>
                <AdminOverview />
            </div>
        </Suspense>
    )
}

export default page