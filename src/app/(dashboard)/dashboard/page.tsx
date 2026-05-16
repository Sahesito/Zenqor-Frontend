import { Header } from "@/components/dashboard/header";

export default function DashboardPage() {
    return (
        <>
            <Header
                title="Overview"
                description="Welcome back, John"
            />
            <main className="flex-1 overflow-y-auto p-6">
                <p className="text-[#9CA3AF] text-sm">Dashboard content coming next...</p>
            </main>
        </>
    );
}