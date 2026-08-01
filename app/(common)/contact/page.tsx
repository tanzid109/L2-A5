import { Suspense } from "react"
import Loading from "@/app/loading"
import ContactPage from "../_components/Contact/Contact"

const page = () => {
    return (
        <Suspense fallback={<Loading />}>
            <div>
                <ContactPage />
            </div>
        </Suspense>
    )
}

export default page