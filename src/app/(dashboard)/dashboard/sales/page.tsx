"use client";

import { Header } from "@/components/dashboard/header";
import { SalesTable } from "@/components/dashboard/sales/sales-table";
import { MetricCard } from "@/components/dashboard/metric-card";
import { DollarSign, ShoppingCart, TrendingUp, Clock } from "lucide-react";

const metrics = [
    { title: "Total Revenue", value: "$22,694", change: 14.2, icon: DollarSign },
    { title: "Total Orders", value: "7", change: 8.1, icon: ShoppingCart },
    { title: "Avg. Order Value", value: "$3,242", change: 5.3, icon: TrendingUp },
    { title: "Pending Orders", value: "2", change: -12.0, icon: Clock },
];

export default function SalesPage() {
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