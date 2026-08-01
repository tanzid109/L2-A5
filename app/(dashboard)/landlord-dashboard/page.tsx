import { Suspense } from "react"
import Loading from "@/app/loading"
import LandlordOverview from "../_components/Landlord/LandlordOverview"

const page = () => {
    return (
        <Suspense fallback={<Loading />}>
            <div>
                <LandlordOverview />
            </div>
        </Suspense>
    )
}

export default page