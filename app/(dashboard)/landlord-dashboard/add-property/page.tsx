import { Suspense } from "react"
import { getCategory } from "../../_actions/landlordActions"
import AddPropertyForm from "../../_components/AddPropertyForm"
import Loading from "@/app/loading"

const page = async () => {
    const { success, data, message } = await getCategory()

    if (!success || !data?.categories?.length) {
        return (
            <div className="bg-background border border-border rounded-xl p-8 text-center text-muted-foreground">
                {message ?? "No categories available. Add one first."}
            </div>
        )
    }

    return (
        <Suspense fallback={<Loading />}>
            <div className="flex justify-center py-10">
                <AddPropertyForm categories={data.categories} />
            </div>
        </Suspense>
    )
}

export default page