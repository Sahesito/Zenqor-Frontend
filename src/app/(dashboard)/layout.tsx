import { Sidebar } from "@/components/dashboard/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { AuthGuard } from "@/components/auth-guard";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard>
            <div className="flex h-screen bg-[#07111B] overflow-hidden">
                <Sidebar />
                <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    {children}
                </div>
                <Toaster
                    theme="dark"
                    toastOptions={{
                        style: {
                            background: "#111827",
                            border: "1px solid #1f2d3d",
                            color: "#F3F4F6",
                        },
                    }}
                />
            </div>
        </AuthGuard>
    );
}