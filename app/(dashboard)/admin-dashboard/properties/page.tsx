import { Suspense } from "react"
import { getAllProperties } from "../../_actions/adminActions"
import { AdminPropertiesTable } from "../../_components/Admin/Adminpropertiestable"
import Loading from "@/app/loading"

export const dynamic = "force-dynamic"


const page = async () => {
    const { success, data, message } = await getAllProperties()

    if (!success || !data?.length) {
        return (
            <div className="bg-background border border-border rounded-xl p-8 text-center text-muted-foreground">
                {message ?? "No properties found."}
            </div>
        )
    }

    return (
        <Suspense fallback={<Loading />}>
            <div>
                <AdminPropertiesTable properties={data} />
            </div>
        </Suspense>
    )
}
export default page