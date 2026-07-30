import { getAllProperties } from "../../_actions/adminActions"
import { AdminPropertiesTable } from "../../_components/Adminpropertiestable"

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
        <div>
            <AdminPropertiesTable properties={data} />
        </div>
    )
}
export default page