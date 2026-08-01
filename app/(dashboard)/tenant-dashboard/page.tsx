import { Suspense } from "react"
import Loading from "@/app/loading"

const page = () => {
    return (
        <Suspense fallback={<Loading />}>
            <div>
                tenant
            </div>
        </Suspense>
    )
}

export default page