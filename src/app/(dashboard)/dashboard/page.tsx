"use client"

import { Header } from "@/components/dashboard/header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { QuickStats } from "@/components/dashboard/quick-stats";
import {
    DollarSign,
    ShoppingCart,
    Users,
    Package,
} from "lucide-react";

const metrics = [
    { title: "Total Revenue", value: "$48,295", change: 12.5, icon: DollarSign },
    { title: "Total Orders", value: "1,284", change: 8.2, icon: ShoppingCart },
    { title: "Active Customers", value: "3,942", change: -2.4, icon: Users },
    { title: "Products Listed", value: "128", change: 4.1, icon: Package },
];

export default function DashboardPage() {
    return (
        <>
            <Header title="Overview" description="Welcome back, John" />
            <main className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {metrics.map((metric, i) => (
                        <MetricCard key={metric.title} {...metric} index={i} />
                    ))}
                </div>

                {/* Bottom row */}
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