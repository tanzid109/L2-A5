import { Suspense } from "react"
import Loading from "@/app/loading"
import RegisterForm from "../_components/RegisterForm"

const page = () => {
    return (
        <Suspense fallback={<Loading />}>
            <div>
                <RegisterForm />
            </div>
        </Suspense>
    )
}

export default page