"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Table, TableBody, TableCell,
    TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Eye, Download, ShoppingCart } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useOrders, useUpdateOrderStatus } from "@/hooks/use-orders";
import { Skeleton } from "@/components/ui/skeleton";

const statusStyles: Record<string, string> = {
    COMPLETED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    PENDING: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    PROCESSING: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    CANCELLED: "bg-red-500/10 text-red-400 border-red-500/20",
};

const filters = ["All", "COMPLETED", "PENDING", "PROCESSING", "CANCELLED"];

export function SalesTable() {
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const { data: orders, isLoading } = useOrders();
    const updateStatus = useUpdateOrderStatus();

    const filtered = (orders || []).filter((o) => {
        const matchSearch =
            o.user.name.toLowerCase().includes(search.toLowerCase()) ||
            o.id.toLowerCase().includes(search.toLowerCase());
        const matchFilter = activeFilter === "All" || o.status === activeFilter;
        return matchSearch && matchFilter;
    });

    return (
        <div className="bg-[#111827] border border-[#1f2d3d] rounded-2xl overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b border-[#1f2d3d]">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6B7280]" />
                    <Input
                        placeholder="Search orders..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 h-8 w-60 bg-[#07111B] border-[#1f2d3d] text-[#F3F4F6] placeholder:text-[#6B7280] text-sm rounded-lg focus:border-[#C89B5A]/50"
                    />
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`px-3 h-7 rounded-lg text-xs font-medium transition-all duration-200 ${activeFilter === f
                                    ? "bg-[#C89B5A]/10 text-[#C89B5A] border border-[#C89B5A]/20"
                                    : "text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1f2d3d]"
                                }`}
                        >
                            {f === "All" ? "All" : f.charAt(0) + f.slice(1).toLowerCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Loading */}
            {isLoading ? (
                <div className="p-4 space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full bg-[#1f2d3d] rounded-xl" />
                    ))}
                </div>
            ) : !filtered.length ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-12 h-12 rounded-2xl bg-[#1f2d3d] flex items-center justify-center mb-4">
                        <ShoppingCart className="w-6 h-6 text-[#6B7280]" />
                    </div>
                    <p className="text-sm font-medium text-[#F3F4F6] mb-1">No orders found</p>
                    <p className="text-xs text-[#9CA3AF]">Try adjusting your filters</p>
                </div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow className="border-[#1f2d3d] hover:bg-transparent">
                            <TableHead className="text-xs text-[#6B7280] font-medium">Order</TableHead>
                            <TableHead className="text-xs text-[#6B7280] font-medium">Customer</TableHead>
                            <TableHead className="text-xs text-[#6B7280] font-medium">Items</TableHead>
                            <TableHead className="text-xs text-[#6B7280] font-medium">Amount</TableHead>
                            <TableHead className="text-xs text-[#6B7280] font-medium">Date</TableHead>
                            <TableHead className="text-xs text-[#6B7280] font-medium">Status</TableHead>
                            <TableHead className="w-12" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((order, i) => (
                            <motion.tr
                                key={order.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.04 }}
                                className="border-[#1f2d3d] hover:bg-[#1f2d3d]/30 transition-colors"
                            >
                                <TableCell className="text-sm font-mono text-[#C89B5A] font-medium">
                                    #{order.id.slice(-6).toUpperCase()}
                                </TableCell>
                                <TableCell className="text-sm text-[#F3F4F6] font-medium">
                                    {order.user.name}
                                </TableCell>
                                <TableCell className="text-sm text-[#9CA3AF]">
                                    {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                                </TableCell>
                                <TableCell className="text-sm font-semibold text-[#F3F4F6]">
                                    {formatCurrency(order.total)}
                                </TableCell>
                                <TableCell className="text-sm text-[#9CA3AF]">
                                    {formatDate(order.createdAt)}
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className={`text-xs rounded-full capitalize ${statusStyles[order.status]}`}
                                    >
                                        {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="w-7 h-7 text-[#6B7280] hover:text-[#F3F4F6] hover:bg-[#1f2d3d]">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-[#111827] border-[#1f2d3d] text-[#F3F4F6] w-44">
                                            <DropdownMenuItem className="text-sm cursor-pointer hover:bg-[#1f2d3d] focus:bg-[#1f2d3d]">
                                                <Eye className="w-3.5 h-3.5 mr-2 text-[#9CA3AF]" />
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => updateStatus.mutate({ id: order.id, status: "COMPLETED" })}
                                                className="text-sm cursor-pointer hover:bg-[#1f2d3d] focus:bg-[#1f2d3d]"
                                            >
                                                Mark Completed
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => updateStatus.mutate({ id: order.id, status: "CANCELLED" })}
                                                className="text-sm cursor-pointer text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-400"
                                            >
                                                Cancel Order
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </motion.tr>
                        ))}
                    </TableBody>
                </Table>
            )}

            <div className="px-4 py-3 border-t border-[#1f2d3d] flex items-center justify-between">
                <p className="text-xs text-[#6B7280]">{filtered.length} orders</p>
                <p className="text-xs text-[#9CA3AF] font-medium">
                    Total:{" "}
                    <span className="text-[#C89B5A]">
                        {formatCurrency(filtered.reduce((acc, o) => acc + Number(o.total), 0))}
                    </span>
                </p>
            </div>
        </div>
    );
}