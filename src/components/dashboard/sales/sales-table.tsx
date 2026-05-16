"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Search,
    MoreHorizontal,
    Eye,
    ShoppingCart,
    Download,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

const sales = [
    { id: "ORD-001", customer: "Alex Johnson", product: "Enterprise License", amount: 4999, status: "completed", date: "2025-05-10" },
    { id: "ORD-002", customer: "Sarah Chen", product: "Pro Dashboard Kit", amount: 299, status: "completed", date: "2025-05-11" },
    { id: "ORD-003", customer: "Mike Torres", product: "Analytics Module", amount: 1499, status: "pending", date: "2025-05-12" },
    { id: "ORD-004", customer: "Emily Davis", product: "API Access Bundle", amount: 799, status: "processing", date: "2025-05-13" },
    { id: "ORD-005", customer: "James Wilson", product: "Custom Integration", amount: 9999, status: "completed", date: "2025-05-14" },
    { id: "ORD-006", customer: "Laura Kim", product: "Starter Pack", amount: 99, status: "cancelled", date: "2025-05-15" },
    { id: "ORD-007", customer: "David Park", product: "Enterprise License", amount: 4999, status: "pending", date: "2025-05-15" },
];

const statusStyles: Record<string, string> = {
    completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    processing: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

const filters = ["All", "Completed", "Pending", "Processing", "Cancelled"];

export function SalesTable() {
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    const filtered = sales.filter((s) => {
        const matchSearch =
            s.customer.toLowerCase().includes(search.toLowerCase()) ||
            s.id.toLowerCase().includes(search.toLowerCase()) ||
            s.product.toLowerCase().includes(search.toLowerCase());
        const matchFilter =
            activeFilter === "All" ||
            s.status === activeFilter.toLowerCase();
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

                <div className="flex items-center gap-2">
                    {/* Filter pills */}
                    <div className="flex items-center gap-1">
                        {filters.map((f) => (
                            <button
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                className={`px-3 h-7 rounded-lg text-xs font-medium transition-all duration-200 ${activeFilter === f
                                        ? "bg-[#C89B5A]/10 text-[#C89B5A] border border-[#C89B5A]/20"
                                        : "text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1f2d3d]"
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-[#1f2d3d] text-[#9CA3AF] hover:text-[#F3F4F6] bg-transparent rounded-lg"
                    >
                        <Download className="w-3.5 h-3.5 mr-1.5" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Table */}
            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
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
                            <TableHead className="text-xs text-[#6B7280] font-medium">Product</TableHead>
                            <TableHead className="text-xs text-[#6B7280] font-medium">Amount</TableHead>
                            <TableHead className="text-xs text-[#6B7280] font-medium">Date</TableHead>
                            <TableHead className="text-xs text-[#6B7280] font-medium">Status</TableHead>
                            <TableHead className="text-xs text-[#6B7280] font-medium w-12" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((sale, i) => (
                            <motion.tr
                                key={sale.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.04 }}
                                className="border-[#1f2d3d] hover:bg-[#1f2d3d]/30 transition-colors"
                            >
                                <TableCell className="text-sm font-mono text-[#C89B5A] font-medium">
                                    {sale.id}
                                </TableCell>
                                <TableCell className="text-sm text-[#F3F4F6] font-medium">
                                    {sale.customer}
                                </TableCell>
                                <TableCell className="text-sm text-[#9CA3AF]">
                                    {sale.product}
                                </TableCell>
                                <TableCell className="text-sm font-semibold text-[#F3F4F6]">
                                    {formatCurrency(sale.amount)}
                                </TableCell>
                                <TableCell className="text-sm text-[#9CA3AF]">
                                    {formatDate(sale.date)}
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className={`text-xs rounded-full capitalize ${statusStyles[sale.status]}`}
                                    >
                                        {sale.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="w-7 h-7 text-[#6B7280] hover:text-[#F3F4F6] hover:bg-[#1f2d3d]"
                                            >
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="end"
                                            className="bg-[#111827] border-[#1f2d3d] text-[#F3F4F6] w-36"
                                        >
                                            <DropdownMenuItem className="text-sm cursor-pointer hover:bg-[#1f2d3d] focus:bg-[#1f2d3d]">
                                                <Eye className="w-3.5 h-3.5 mr-2 text-[#9CA3AF]" />
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-sm cursor-pointer hover:bg-[#1f2d3d] focus:bg-[#1f2d3d]">
                                                <Download className="w-3.5 h-3.5 mr-2 text-[#9CA3AF]" />
                                                Invoice
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </motion.tr>
                        ))}
                    </TableBody>
                </Table>
            )}

            {/* Footer */}
            <div className="px-4 py-3 border-t border-[#1f2d3d] flex items-center justify-between">
                <p className="text-xs text-[#6B7280]">
                    {filtered.length} of {sales.length} orders
                </p>
                <p className="text-xs text-[#9CA3AF] font-medium">
                    Total:{" "}
                    <span className="text-[#C89B5A]">
                        {formatCurrency(filtered.reduce((acc, s) => acc + s.amount, 0))}
                    </span>
                </p>
            </div>
        </div>
    );
}