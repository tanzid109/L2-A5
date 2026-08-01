import { getCategory } from "../../_actions/landlordActions"
import { CategoryTable } from "../../_components/CategoryTable"

const page = async () => {
    const result = await getCategory()

    if (!result.success) {
        return (
            <div className="bg-background border border-border rounded-xl p-8 text-center text-muted-foreground">
                <p className="text-sm text-destructive">{result.message}</p>
            </div>
        )
    }

    const categories = result.data?.categories ?? []

    return (
        <div className="p-6">
            <CategoryTable initialCategories={categories} />
        </div>
    )
}

export default page