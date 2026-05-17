"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/dashboard/header";
import { MetricCard } from "@/components/dashboard/metric-card";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { TrendingUp, DollarSign, ShoppingCart, Users } from "lucide-react";

const metrics = [
    { title: "Total Revenue", value: "$48,295", change: 12.5, icon: DollarSign },
    { title: "Total Orders", value: "1,284", change: 8.2, icon: ShoppingCart },
    { title: "New Customers", value: "342", change: 15.1, icon: Users },
    { title: "Growth Rate", value: "24.8%", change: 4.3, icon: TrendingUp },
];

const revenueData = [
    { month: "Jan", revenue: 12400, orders: 98 },
    { month: "Feb", revenue: 18200, orders: 142 },
    { month: "Mar", revenue: 15800, orders: 119 },
    { month: "Apr", revenue: 22400, orders: 178 },
    { month: "May", revenue: 19600, orders: 155 },
    { month: "Jun", revenue: 28900, orders: 224 },
    { month: "Jul", revenue: 32100, orders: 248 },
    { month: "Aug", revenue: 27400, orders: 211 },
    { month: "Sep", revenue: 35800, orders: 276 },
    { month: "Oct", revenue: 31200, orders: 241 },
    { month: "Nov", revenue: 42600, orders: 318 },
    { month: "Dec", revenue: 48295, orders: 384 },
];

const categoryData = [
    { name: "Software", value: 45 },
    { name: "Services", value: 28 },
    { name: "Templates", value: 18 },
    { name: "Hardware", value: 9 },
];

const COLORS = ["#C89B5A", "#D8B178", "#8B6B3D", "#4a3a22"];

const weeklyData = [
    { day: "Mon", sales: 14 },
    { day: "Tue", sales: 22 },
    { day: "Wed", sales: 18 },
    { day: "Thu", sales: 29 },
    { day: "Fri", sales: 35 },
    { day: "Sat", sales: 12 },
    { day: "Sun", sales: 8 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#111827] border border-[#1f2d3d] rounded-xl p-3 shadow-xl">
                <p className="text-xs text-[#9CA3AF] mb-1">{label}</p>
                {payload.map((p: any) => (
                    <p key={p.name} className="text-sm font-semibold text-[#F3F4F6]">
                        {p.name === "revenue" ? `$${p.value.toLocaleString()}` : p.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function AnalyticsPage() {
    return (
        <>
            <Header title="Analytics" description="Track your business performance" />
            <main className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {metrics.map((m, i) => (
                        <MetricCard key={m.title} {...m} index={i} />
                    ))}
                </div>

                {/* Revenue Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="bg-[#111827] border border-[#1f2d3d] rounded-2xl p-6"
                >
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-[#F3F4F6]">Revenue Overview</h3>
                        <p className="text-xs text-[#9CA3AF] mt-0.5">Monthly revenue for 2025</p>
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                        <AreaChart data={revenueData}>
                            <defs>
                                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#C89B5A" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#C89B5A" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1f2d3d" vertical={false} />
                            <XAxis
                                dataKey="month"
                                tick={{ fill: "#6B7280", fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fill: "#6B7280", fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#C89B5A"
                                strokeWidth={2}
                                fill="url(#revenueGrad)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Bottom row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Weekly sales bar chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="lg:col-span-2 bg-[#111827] border border-[#1f2d3d] rounded-2xl p-6"
                    >
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-[#F3F4F6]">Weekly Sales</h3>
                            <p className="text-xs text-[#9CA3AF] mt-0.5">Orders per day this week</p>
                        </div>
                        <ResponsiveContainer width="100%" height={180}>
                            <BarChart data={weeklyData} barSize={28}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1f2d3d" vertical={false} />
                                <XAxis
                                    dataKey="day"
                                    tick={{ fill: "#6B7280", fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fill: "#6B7280", fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="sales" fill="#C89B5A" radius={[6, 6, 0, 0]} opacity={0.85} />
                            </BarChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* Pie chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        className="bg-[#111827] border border-[#1f2d3d] rounded-2xl p-6"
                    >
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-[#F3F4F6]">By Category</h3>
                            <p className="text-xs text-[#9CA3AF] mt-0.5">Revenue distribution</p>
                        </div>
                        <ResponsiveContainer width="100%" height={140}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={45}
                                    outerRadius={65}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {categoryData.map((_, i) => (
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

                        {/* Legend */}
                        <div className="space-y-2 mt-2">
                            {categoryData.map((item, i) => (
                                <div key={item.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-2.5 h-2.5 rounded-full shrink-0"
                                            style={{ background: COLORS[i] }}
                                        />
                                        <span className="text-xs text-[#9CA3AF]">{item.name}</span>
                                    </div>
                                    <span className="text-xs font-medium text-[#F3F4F6]">
                                        {item.value}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </main>
        </>
    );
}