import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAllProperties } from "../../_actions/allProperty"
import { PropertyCard } from "../AllProperties"


export default async function FeaturedProperties() {
    const { success, data } = await getAllProperties()

    if (!success || !data?.length) {
        return null
    }

    const featured = data.slice(0, 6)

    return (
        <section className="w-10/12 mx-auto py-16">
            <div className="flex items-end justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-semibold text-foreground">
                        Featured Properties
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        Handpicked listings to get you started
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featured.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>

            <div className="flex justify-center mt-10">
                <Button asChild size="lg" variant="outline" className="gap-2">
                    <Link href="/properties">
                        View All Properties
                        <ArrowRight size={16} />
                    </Link>
                </Button>
            </div>
        </section>
    )
}