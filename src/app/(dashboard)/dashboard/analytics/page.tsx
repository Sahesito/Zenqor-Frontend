"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/dashboard/header";
import { MetricCard } from "@/components/dashboard/metric-card";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, BarChart, Bar,
    PieChart, Pie, Cell,
} from "recharts";
import { TrendingUp, DollarSign, ShoppingCart, Users } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useAnalyticsOverview, useMonthlyData, useOrdersByStatus } from "@/hooks/use-analytics";
import { Skeleton } from "@/components/ui/skeleton";

const COLORS = ["#C89B5A", "#10B981", "#3B82F6", "#EF4444"];

const fallbackMonthly = [
    { month: "Jan", revenue: 0, orders: 0 },
    { month: "Feb", revenue: 0, orders: 0 },
    { month: "Mar", revenue: 0, orders: 0 },
    { month: "Apr", revenue: 0, orders: 0 },
    { month: "May", revenue: 0, orders: 0 },
    { month: "Jun", revenue: 0, orders: 0 },
];

const fallbackByStatus = [
    { name: "Pending", value: 0 },
    { name: "Processing", value: 0 },
    { name: "Completed", value: 0 },
    { name: "Cancelled", value: 0 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#111827] border border-[#1f2d3d] rounded-xl p-3 shadow-xl">
                <p className="text-xs text-[#9CA3AF] mb-1">{label}</p>
                {payload.map((p: any) => (
                    <p key={p.name} className="text-sm font-semibold text-[#F3F4F6]">
                        {p.name === "revenue" ? formatCurrency(p.value) : p.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function AnalyticsPage() {
    const { data: overview, isLoading: loadingOverview } = useAnalyticsOverview();
    const { data: monthly, isLoading: loadingMonthly } = useMonthlyData();
    const { data: byStatus } = useOrdersByStatus();

    const monthlyData = monthly?.length ? monthly : fallbackMonthly;
    const statusData = byStatus?.length ? byStatus : fallbackByStatus;

    const metrics = [
        { title: "Total Revenue", value: formatCurrency(overview?.totalRevenue || 0), change: 12.5, icon: DollarSign },
        { title: "Total Orders", value: String(overview?.totalOrders || 0), change: 8.2, icon: ShoppingCart },
        { title: "Total Customers", value: String(overview?.totalUsers || 0), change: 15.1, icon: Users },
        { title: "Products Listed", value: String(overview?.totalProducts || 0), change: 4.3, icon: TrendingUp },
    ];

    return (
        <>
            <Header title="Analytics" description="Track your business performance" />
            <main className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Metrics */}
                {loadingOverview ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="h-32 bg-[#111827] rounded-2xl" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {metrics.map((m, i) => (
                            <MetricCard key={m.title} {...m} index={i} />
                        ))}
                    </div>
                )}

                {/* Revenue Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="bg-[#111827] border border-[#1f2d3d] rounded-2xl p-6"
                >
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-[#F3F4F6]">Revenue Overview</h3>
                        <p className="text-xs text-[#9CA3AF] mt-0.5">Last 6 months</p>
                    </div>
                    {loadingMonthly ? (
                        <Skeleton className="h-60 w-full bg-[#1f2d3d] rounded-xl" />
                    ) : (
                        <ResponsiveContainer width="100%" height={240}>
                            <AreaChart data={monthlyData}>
                                <defs>
                                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#C89B5A" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#C89B5A" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1f2d3d" vertical={false} />
                                <XAxis dataKey="month" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="revenue" stroke="#C89B5A" strokeWidth={2} fill="url(#revenueGrad)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </motion.div>

                {/* Bottom row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="lg:col-span-2 bg-[#111827] border border-[#1f2d3d] rounded-2xl p-6"
                    >
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-[#F3F4F6]">Monthly Orders</h3>
                            <p className="text-xs text-[#9CA3AF] mt-0.5">Orders per month</p>
                        </div>
                        <ResponsiveContainer width="100%" height={180}>
                            <BarChart data={monthlyData} barSize={28}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1f2d3d" vertical={false} />
                                <XAxis dataKey="month" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="orders" fill="#C89B5A" radius={[6, 6, 0, 0]} opacity={0.85} />
                            </BarChart>
                        </ResponsiveContainer>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        className="bg-[#111827] border border-[#1f2d3d] rounded-2xl p-6"
                    >
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-[#F3F4F6]">By Status</h3>
                            <p className="text-xs text-[#9CA3AF] mt-0.5">Order distribution</p>
                        </div>
                        <ResponsiveContainer width="100%" height={140}>
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={45}
                                    outerRadius={65}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {statusData.map((_, i) => (
                                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        background: "#111827",
                                        border: "1px solid #1f2d3d",
                                        borderRadius: "12px",
                                        color: "#F3F4F6",
                                        fontSize: "12px",
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>

                        <div className="space-y-2 mt-2">
                            {statusData.map((item, i) => (
                                <div key={item.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} />
                                        <span className="text-xs text-[#9CA3AF]">{item.name}</span>
                                    </div>
                                    <span className="text-xs font-medium text-[#F3F4F6]">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </main>
        </>
    );
}