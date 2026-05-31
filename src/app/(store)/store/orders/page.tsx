"use client";

import { motion } from "framer-motion";
import { useOrders } from "@/hooks/use-orders";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const statusStyles: Record<string, string> = {
    COMPLETED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    PENDING: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    PROCESSING: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    CANCELLED: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function OrdersPage() {
    const { data: orders, isLoading } = useOrders();

    return (
        <main className="max-w-3xl mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-8">
                <Link href="/store">
                    <Button variant="ghost" size="icon" className="text-[#9CA3AF] hover:text-[#F3F4F6]">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                </Link>
                <h1 className="text-lg font-semibold text-[#F3F4F6]">My Orders</h1>
            </div>

            {isLoading ? (
                <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-24 bg-[#111827] rounded-2xl" />
                    ))}
                </div>
            ) : !orders?.length ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#111827] flex items-center justify-center mb-4">
                        <ShoppingCart className="w-8 h-8 text-[#6B7280]" />
                    </div>
                    <p className="text-[#F3F4F6] font-medium mb-1">No orders yet</p>
                    <p className="text-sm text-[#9CA3AF] mb-6">Start shopping to see your orders here</p>
                    <Link href="/store">
                        <Button className="bg-[#C89B5A] hover:bg-[#D8B178] text-[#07111B] font-semibold rounded-xl">
                            Browse Products
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="space-y-3">
                    {orders.map((order, i) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06 }}
                            className="bg-[#111827] border border-[#1f2d3d] rounded-2xl p-5 hover:border-[#C89B5A]/20 transition-colors"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <p className="text-xs font-mono text-[#C89B5A]">
                                        #{order.id.slice(-8).toUpperCase()}
                                    </p>
                                    <p className="text-xs text-[#9CA3AF] mt-0.5">
                                        {formatDate(order.createdAt)}
                                    </p>
                                </div>
                                <Badge
                                    variant="outline"
                                    className={`text-xs rounded-full capitalize ${statusStyles[order.status]}`}
                                >
                                    {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
                                </Badge>
                            </div>

                            <div className="space-y-1 mb-3">
                                {order.items.map((item) => (
                                    <p key={item.id} className="text-sm text-[#9CA3AF]">
                                        {item.product.name} × {item.quantity}
                                    </p>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-[#1f2d3d]">
                                <span className="text-xs text-[#9CA3AF]">
                                    {order.items.length} {order.items.length === 1 ? "item" : "items"}
                                </span>
                                <span className="text-base font-bold text-[#C89B5A]">
                                    {formatCurrency(Number(order.total))}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </main>
    );
}