"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useOrders } from "@/hooks/use-orders";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart } from "lucide-react";

const statusStyles: Record<string, string> = {
    COMPLETED: "bg-emerald-500/10 text-emerald-400",
    PENDING: "bg-amber-500/10 text-amber-400",
    PROCESSING: "bg-blue-500/10 text-blue-400",
    CANCELLED: "bg-red-500/10 text-red-400",
};

export function RecentSales() {
    const { data: orders, isLoading } = useOrders();
    const recent = orders?.slice(0, 5) || [];

    return (
        <div className="bg-[#111827] border border-[#1f2d3d] rounded-2xl p-6">
            <div className="mb-6">
                <h3 className="text-sm font-semibold text-[#F3F4F6]">Recent Orders</h3>
                <p className="text-xs text-[#9CA3AF] mt-0.5">Latest transactions</p>
            </div>

            {isLoading ? (
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-10 bg-[#1f2d3d] rounded-xl" />
                    ))}
                </div>
            ) : !recent.length ? (
                <div className="flex flex-col items-center justify-center py-10">
                    <div className="w-10 h-10 rounded-xl bg-[#1f2d3d] flex items-center justify-center mb-3">
                        <ShoppingCart className="w-5 h-5 text-[#6B7280]" />
                    </div>
                    <p className="text-xs text-[#9CA3AF]">No orders yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {recent.map((order, i) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.06 }}
                            className="flex items-center gap-4"
                        >
                            <Avatar className="w-8 h-8 shrink-0">
                                <AvatarFallback className="bg-[#1f2d3d] text-[#9CA3AF] text-xs">
                                    {order.user.name.split(" ").map((n) => n[0]).join("")}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[#F3F4F6] truncate">
                                    {order.user.name}
                                </p>
                                <p className="text-xs text-[#9CA3AF]">
                                    {formatDate(order.createdAt)}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                                <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusStyles[order.status]}`}>
                                    {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
                                </span>
                                <span className="text-sm font-semibold text-[#F3F4F6]">
                                    {formatCurrency(Number(order.total))}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}