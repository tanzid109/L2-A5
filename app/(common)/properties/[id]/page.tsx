import Loading from "@/app/loading"
import { getAllProperties } from "../../_actions/allProperty"
import { PropertyDetailsCard } from "../../_components/Properties/PropertyDetails"
import { Suspense } from "react"


export default async function PropertyDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    const { data } = await getAllProperties()
    const property = data?.find((p) => p.id === id)

    if (!property) {
        return (
            <div className="w-10/12 mx-auto py-16 text-center text-muted-foreground">
                Property not found.
            </div>
        )
    }

    return (
        <Suspense fallback={<Loading />}>
            <div className="w-10/12 mx-auto py-10 max-w-3xl">
                <PropertyDetailsCard property={property} />
            </div>
        </Suspense>
    )
}