import { Suspense } from "react"
import { getAllProperties } from "../_actions/allProperty"
import { PropertyCard } from "../_components/Properties/AllProperties"
import Loading from "@/app/loading"

export default async function PropertiesPage() {
    const { success, data, message } = await getAllProperties()

    if (!success || !data?.length) {
        return (
            <div className="w-10/12 mx-auto py-16 text-center text-muted-foreground">
                {message ?? "No properties found."}
            </div>
        )
    }

    return (
        <Suspense fallback={<Loading />}>
            <div className="w-10/12 mx-auto py-10">
                <h1 className="text-2xl font-semibold text-foreground mb-6">Properties</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </div>
        </Suspense>
    )
}