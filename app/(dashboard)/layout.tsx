import { getMe } from "@/service/getMe";
import DashboardSidebar from "./_components/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const DashboardLayout = async (
    {
        children
    }: {
        children: React.ReactNode
    }
) => {
    const user = await getMe();
    return (
        <div className="flex min-h-screen flex-col">
            <SidebarProvider>
                <div className="flex flex-1 flex-col md:flex-row">
                    <DashboardSidebar user={user} />
                    <div className="flex flex-1 flex-col min-w-0">
                        <header className="border-b border-border bg-background/95 px-4 py-3 md:hidden">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold">Dashboard</p>
                                    <p className="text-xs text-muted-foreground">Quick access to your workspace</p>
                                </div>
                                <SidebarTrigger className="md:hidden" />
                            </div>
                        </header>
                        <main className="flex-1 min-w-0 p-4 md:p-6">{children}</main>
                    </div>
                </div>
            </SidebarProvider>
        </div>
    );
};

export default DashboardLayout