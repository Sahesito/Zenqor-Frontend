"use client";

import { motion } from "framer-motion";
import { useAnalyticsOverview } from "@/hooks/use-analytics";
import { Skeleton } from "@/components/ui/skeleton";

export function QuickStats() {
    const { data: overview, isLoading } = useAnalyticsOverview();

    const total = (overview?.totalOrders || 0);
    const completed = overview?.completedOrders || 0;
    const pending = overview?.pendingOrders || 0;
    const products = overview?.totalProducts || 0;

    const conversionRate = total > 0 ? ((completed / total) * 100).toFixed(1) : "0";
    const completionBar = total > 0 ? (completed / total) * 100 : 0;
    const pendingBar = total > 0 ? (pending / total) * 100 : 0;

    const stats = [
        { label: "Completion Rate", value: `${conversionRate}%`, bar: completionBar },
        { label: "Pending Rate", value: `${total > 0 ? ((pending / total) * 100).toFixed(1) : 0}%`, bar: pendingBar },
        { label: "Active Products", value: String(products), bar: Math.min((products / 50) * 100, 100) },
        { label: "Monthly Target", value: "78%", bar: 78 },
    ];

    return (
        <div className="bg-[#111827] border border-[#1f2d3d] rounded-2xl p-6">
            <div className="mb-6">
                <h3 className="text-sm font-semibold text-[#F3F4F6]">Performance</h3>
                <p className="text-xs text-[#9CA3AF] mt-0.5">Key metrics this month</p>
            </div>

            {isLoading ? (
                <div className="space-y-5">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-8 bg-[#1f2d3d] rounded-xl" />
                    ))}
                </div>
            ) : (
                <div className="space-y-5">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.08 }}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-[#9CA3AF]">{stat.label}</span>
                                <span className="text-xs font-semibold text-[#F3F4F6]">
                                    {stat.value}
                                </span>
                            </div>
                            <div className="h-1.5 bg-[#1f2d3d] rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${stat.bar}%` }}
                                    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                                    className="h-full bg-gradient-to-r from-[#C89B5A] to-[#D8B178] rounded-full"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}