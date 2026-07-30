import { getAllUsers } from "../../_actions/adminActions"
import { AdminUsersTable } from "../../_components/Adminuserstable"

const page = async () => {
    const { success, data, message } = await getAllUsers()

    if (!success || !data?.length) {
        return (
            <div className="bg-background border border-border rounded-xl p-8 text-center text-muted-foreground">
                {message ?? "No users found."}
            </div>
        )
    }

    return (
        <div>
            <AdminUsersTable users={data} />
        </div>
    )
}
export default page