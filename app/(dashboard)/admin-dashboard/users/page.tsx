import { Suspense } from "react"
import { getAllUsers } from "../../_actions/adminActions"
import { AdminUsersTable } from "../../_components/Admin/Adminuserstable"
import Loading from "@/app/loading"

export const dynamic = "force-dynamic"


const page = async () => {
    const { success, data, message } = await getAllUsers()

    const content = !success || !data?.length ? (
        <div className="bg-background border border-border rounded-xl p-8 text-center text-muted-foreground">
            {message ?? "No users found."}
        </div>
    ) : (
        <div>
            <AdminUsersTable users={data} />
        </div>
    )

    return <Suspense fallback={<Loading />}>{content}</Suspense>
}
export default page