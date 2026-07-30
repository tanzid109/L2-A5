import { getCategory, getMyProperties } from "../../_actions/landlordActions"
import { LandlordPropertyCard } from "../../_components/LandlordPropertyCard"

const page = async () => {
    const { success, data, message } = await getMyProperties()
    const categoriesRes = await getCategory()

    if (!success || !data?.properties?.length) {
        return (
            <div className="bg-background border border-border rounded-xl p-8 text-center text-muted-foreground">
                {message ?? "You haven't listed any properties yet."}
            </div>
        )
    }

    const categories = categoriesRes.data?.categories ?? []

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.properties.map((property) => (
                <LandlordPropertyCard key={property.id} property={property} categories={categories} />
            ))}
        </div>
    )
}
export default page