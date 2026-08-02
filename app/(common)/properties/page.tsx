import { Suspense } from "react"
import Loading from "@/app/loading"
import { getAllProperties } from "../_actions/allProperty"
import { PropertyCard } from "../_components/Properties/AllProperties"
import { PropertyFilters } from "../_components/Properties/PropertyFilters"

interface PropertiesPageProps {
    searchParams: Promise<{
        city?: string
        category?: string
        search?: string
        status?: "AVAILABLE" | "RENTED" | "PENDING"
        minPrice?: string
        maxPrice?: string
        page?: string
    }>
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
    const params = await searchParams

    const { success, data, message } = await getAllProperties({
        city: params.city,
        category: params.category,
        search: params.search,
        status: params.status,
        minPrice: params.minPrice ? Number(params.minPrice) : undefined,
        maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
        page: params.page ? Number(params.page) : undefined,
    })

    if (!success || !data?.length) {
        return (
            <div className="w-10/12 mx-auto py-10">
                <h1 className="text-2xl font-semibold text-foreground mb-6">Properties</h1>
                <PropertyFilters />
                <div className="text-center py-16 text-muted-foreground">
                    No properties found
                </div>
            </div>
        )
    }

    return (
        <Suspense fallback={<Loading />}>
            <div className="w-10/12 mx-auto py-10">
                <h1 className="text-2xl font-semibold text-foreground mb-6">Properties</h1>
                <PropertyFilters />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </div>
        </Suspense>
    )
}