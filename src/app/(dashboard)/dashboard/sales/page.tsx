"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard/header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { SalesTable } from "@/components/dashboard/sales/sales-table";
import { CreateOrderForm } from "@/components/dashboard/sales/create-order-form";
import { useOrderStats } from "@/hooks/use-orders";
import { DollarSign, ShoppingCart, TrendingUp, Clock, Plus } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function SalesPage() {
    const { data: stats } = useOrderStats();
    const [formOpen, setFormOpen] = useState(false);

    const metrics = [
        { title: "Total Revenue", value: formatCurrency(stats?.revenue || 0), change: 14.2, icon: DollarSign },
        { title: "Total Orders", value: String(stats?.total || 0), change: 8.1, icon: ShoppingCart },
        { title: "Completed", value: String(stats?.completed || 0), change: 5.3, icon: TrendingUp },
        { title: "Pending", value: String(stats?.pending || 0), change: -12.0, icon: Clock },
    ];

    return (
        <>
            <Header title="Sales" description="Track and manage your orders" />
            <main className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="flex justify-end">
                    <Button
                        onClick={() => setFormOpen(true)}
                        className="bg-[#C89B5A] hover:bg-[#D8B178] text-[#07111B] font-semibold rounded-xl h-9 px-4"
                    >
                        <Plus className="w-3.5 h-3.5 mr-1.5" />
                        New Order
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {metrics.map((m, i) => (
                        <MetricCard key={m.title} {...m} index={i} />
                    ))}
                </div>

                <SalesTable />

                <CreateOrderForm
                    open={formOpen}
                    onClose={() => setFormOpen(false)}
                />
            </main>
        </>
    );
}