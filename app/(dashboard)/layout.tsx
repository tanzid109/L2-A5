
import { getMe } from "@/service/getMe";
import DashboardSidebar from "./_components/DashboardSidebar";
import Navbar from "@/components/shared/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

const DashboardLayout = async (
    {
        children
    }: {
        children: React.ReactNode
    }
) => {
    const user = await getMe();
    return (
        <div className="flex flex-col">
            <SidebarProvider>
                <div className="flex flex-1">
                    <DashboardSidebar user={user} />
                    <main className="flex-1 p-6 min-w-0">{children}</main>
                </div>
            </SidebarProvider>
        </div>
    );
};

export default DashboardLayout