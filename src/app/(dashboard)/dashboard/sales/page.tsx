"use client";

import { Header } from "@/components/dashboard/header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { QuickStats } from "@/components/dashboard/quick-stats";
import { useAuthStore } from "@/store/auth.store";
import { useDashboardStats } from "@/hooks/use-dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";
import { DollarSign, ShoppingCart, Package, TrendingUp } from "lucide-react";
import { useCreateOrder } from "@/hooks/use-orders";
import { useProducts } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
            title: "Products Listed",
            value: String(stats?.products || 0),
            change: 4.1,
            icon: Package,
        },
        {
            title: "Completed Orders",
            value: String(stats?.completed || 0),
            change: 5.3,
            icon: TrendingUp,
        },
    ];

    const createOrder = useCreateOrder();
    const { data: products } = useProducts();

    const createTestOrder = async () => {
        if (!products?.length) return;
        await createOrder.mutateAsync({
            items: [{ productId: products[0].id, quantity: 1 }],
            notes: "Test order",
        });
    };

    return (
        <>
            <Header
                title="Overview"
                description={`Welcome back, ${user?.name?.split(" ")[0] || "there"} 👋`}
            />
            <div className="flex justify-end px-6 pt-2">
                <Button
                    onClick={createTestOrder}
                    size="sm"
                    className="bg-[#C89B5A] hover:bg-[#D8B178] text-[#07111B] font-semibold rounded-lg"
                >
                    <Plus className="w-3.5 h-3.5 mr-1.5" />
                    Test Order
                </Button>
            </div>
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