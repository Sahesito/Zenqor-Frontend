"use client";

import { Header } from "@/components/dashboard/header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { SalesTable } from "@/components/dashboard/sales/sales-table";
import { useOrderStats } from "@/hooks/use-orders";
import { DollarSign, ShoppingCart, TrendingUp, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function SalesPage() {
    const { data: stats } = useOrderStats();

    const metrics = [
        {
            title: "Total Revenue",
            value: formatCurrency(stats?.revenue || 0),
            change: 14.2,
            icon: DollarSign,
        },
        {
            title: "Total Orders",
            value: String(stats?.total || 0),
            change: 8.1,
            icon: ShoppingCart,
        },
        {
            title: "Completed",
            value: String(stats?.completed || 0),
            change: 5.3,
            icon: TrendingUp,
        },
        {
            title: "Pending",
            value: String(stats?.pending || 0),
            change: -12.0,
            icon: Clock,
        },
    ];

    return (
        <>
            <Header title="Sales" description="Track and manage your orders" />
            <main className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {metrics.map((m, i) => (
                        <MetricCard key={m.title} {...m} index={i} />
                    ))}
                </div>
                <SalesTable />
            </main>
        </>
    );
}