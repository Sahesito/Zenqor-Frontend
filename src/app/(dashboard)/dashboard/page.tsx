"use client";

import { Header } from "@/components/dashboard/header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { QuickStats } from "@/components/dashboard/quick-stats";
import { useAuthStore } from "@/store/auth.store";
import { useDashboardStats } from "@/hooks/use-dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";
import { DollarSign, ShoppingCart, Users, Package } from "lucide-react";

export default function DashboardPage() {
    const user = useAuthStore((s) => s.user);
    const { data: stats, isLoading } = useDashboardStats();

    const metrics = [
        {
            title: "Total Revenue",
            value: formatCurrency(stats?.revenue || 0),
            change: 12.5,
            icon: DollarSign,
        },
        {
            title: "Total Orders",
            value: String(stats?.orders || 0),
            change: 8.2,
            icon: ShoppingCart,
        },
        {
            title: "Total Customers",
            value: String(stats?.customers || 0),
            change: 5.1,
            icon: Users,
        },
        {
            title: "Products Listed",
            value: String(stats?.products || 0),
            change: 4.1,
            icon: Package,
        },
    ];

    return (
        <>
            <Header
                title="Overview"
                description={`Welcome back, ${user?.name?.split(" ")[0] || "there"} 👋`}
            />
            <main className="flex-1 overflow-y-auto p-6 space-y-6">
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="h-32 bg-[#111827] rounded-2xl" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {metrics.map((metric, i) => (
                            <MetricCard key={metric.title} {...metric} index={i} />
                        ))}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2">
                        <RecentSales />
                    </div>
                    <div>
                        <QuickStats />
                    </div>
                </div>
            </main>
        </>
    );
}