"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/dashboard/header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Users, UserCheck, TrendingUp, DollarSign,
    Search, MoreHorizontal, Mail, UserX,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useCustomers, useCustomerStats, useDeactivateCustomer } from "@/hooks/use-customers";
import { Skeleton } from "@/components/ui/skeleton";

const statusStyles: Record<string, string> = {
    true: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    false: "bg-[#1f2d3d] text-[#9CA3AF] border-[#1f2d3d]",
};

export default function CustomersPage() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const { data: customers, isLoading } = useCustomers();
    const { data: stats } = useCustomerStats();
    const deactivate = useDeactivateCustomer();

    const metrics = [
        { title: "Total Customers", value: String(stats?.total || 0), change: 8.1, icon: Users },
        { title: "Active Customers", value: String(stats?.active || 0), change: 5.3, icon: UserCheck },
        { title: "Avg. Orders", value: "3.2", change: 12.4, icon: DollarSign },
        { title: "Retention Rate", value: "94.2%", change: 2.1, icon: TrendingUp },
    ];

    const filtered = (customers || []).filter((c) => {
        const matchSearch =
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase()) ||
            (c.company || "").toLowerCase().includes(search.toLowerCase());
        const matchFilter =
            filter === "All" ||
            (filter === "Active" && c.isActive) ||
            (filter === "Inactive" && !c.isActive);
        return matchSearch && matchFilter;
    });

    return (
        <>
            <Header title="Customers" description="Manage your customer base" />
            <main className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {metrics.map((m, i) => (
                        <MetricCard key={m.title} {...m} index={i} />
                    ))}
                </div>

                {/* Table */}
                <div className="bg-[#111827] border border-[#1f2d3d] rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between p-4 border-b border-[#1f2d3d]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6B7280]" />
                            <Input
                                placeholder="Search customers..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9 h-8 w-60 bg-[#07111B] border-[#1f2d3d] text-[#F3F4F6] placeholder:text-[#6B7280] text-sm rounded-lg focus:border-[#C89B5A]/50"
                            />
                        </div>
                        <div className="flex items-center gap-1">
                            {["All", "Active", "Inactive"].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-3 h-7 rounded-lg text-xs font-medium transition-all duration-200 ${filter === f
                                            ? "bg-[#C89B5A]/10 text-[#C89B5A] border border-[#C89B5A]/20"
                                            : "text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1f2d3d]"
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="p-4 space-y-3">
                            {[...Array(5)].map((_, i) => (
                                <Skeleton key={i} className="h-14 w-full bg-[#1f2d3d] rounded-xl" />
                            ))}
                        </div>
                    ) : !filtered.length ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-12 h-12 rounded-2xl bg-[#1f2d3d] flex items-center justify-center mb-4">
                                <Users className="w-6 h-6 text-[#6B7280]" />
                            </div>
                            <p className="text-sm font-medium text-[#F3F4F6] mb-1">No customers found</p>
                            <p className="text-xs text-[#9CA3AF]">Try adjusting your search</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-[#1f2d3d]">
                            {filtered.map((customer, i) => (
                                <motion.div
                                    key={customer.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.04 }}
                                    className="flex items-center gap-4 px-4 py-3 hover:bg-[#1f2d3d]/30 transition-colors"
                                >
                                    <Avatar className="w-9 h-9 shrink-0">
                                        <AvatarFallback className="bg-[#C89B5A]/10 text-[#C89B5A] text-xs font-semibold">
                                            {customer.name.split(" ").map((n) => n[0]).join("")}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-[#F3F4F6] truncate">
                                            {customer.name}
                                        </p>
                                        <p className="text-xs text-[#9CA3AF] truncate">{customer.email}</p>
                                    </div>

                                    <div className="hidden md:block w-32">
                                        <p className="text-xs text-[#9CA3AF] truncate">
                                            {customer.company || "—"}
                                        </p>
                                    </div>

                                    <div className="hidden lg:block w-20 text-center">
                                        <p className="text-xs text-[#9CA3AF]">
                                            {customer._count.orders} orders
                                        </p>
                                    </div>

                                    <div className="hidden sm:block w-28 text-right">
                                        <p className="text-xs text-[#9CA3AF]">
                                            Joined {formatDate(customer.createdAt)}
                                        </p>
                                    </div>

                                    <Badge
                                        variant="outline"
                                        className={`text-xs rounded-full shrink-0 ${statusStyles[String(customer.isActive)]}`}
                                    >
                                        {customer.isActive ? "Active" : "Inactive"}
                                    </Badge>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="w-7 h-7 text-[#6B7280] hover:text-[#F3F4F6] hover:bg-[#1f2d3d] shrink-0"
                                            >
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="end"
                                            className="bg-[#111827] border-[#1f2d3d] text-[#F3F4F6] w-36"
                                        >
                                            <DropdownMenuItem className="text-sm cursor-pointer hover:bg-[#1f2d3d] focus:bg-[#1f2d3d]">
                                                <Mail className="w-3.5 h-3.5 mr-2 text-[#9CA3AF]" />
                                                Send Email
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => deactivate.mutate(customer.id)}
                                                className="text-sm cursor-pointer text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-400"
                                            >
                                                <UserX className="w-3.5 h-3.5 mr-2" />
                                                Deactivate
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    <div className="px-4 py-3 border-t border-[#1f2d3d]">
                        <p className="text-xs text-[#6B7280]">
                            {filtered.length} of {customers?.length || 0} customers
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}