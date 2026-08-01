import { Suspense } from "react"
import Loading from "@/app/loading"
import AboutPage from "../_components/About/About"

const page = () => {
    return (
        <Suspense fallback={<Loading />}>
            <div>
                <AboutPage />
            </div>
        </Suspense>
    )
}

export default page