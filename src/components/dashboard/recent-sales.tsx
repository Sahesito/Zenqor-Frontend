"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatCurrency } from "@/lib/utils";

const sales = [
    { name: "Alex Johnson", email: "alex@company.com", amount: 4200, status: "completed" },
    { name: "Sarah Chen", email: "sarah@company.com", amount: 1800, status: "completed" },
    { name: "Mike Torres", email: "mike@company.com", amount: 3400, status: "pending" },
    { name: "Emily Davis", email: "emily@company.com", amount: 920, status: "completed" },
    { name: "James Wilson", email: "james@company.com", amount: 6100, status: "processing" },
];

const statusStyles: Record<string, string> = {
    completed: "bg-emerald-500/10 text-emerald-400",
    pending: "bg-amber-500/10 text-amber-400",
    processing: "bg-blue-500/10 text-blue-400",
};

export function RecentSales() {
    return (
        <div className="bg-[#111827] border border-[#1f2d3d] rounded-2xl p-6">
            <div className="mb-6">
                <h3 className="text-sm font-semibold text-[#F3F4F6]">Recent Sales</h3>
                <p className="text-xs text-[#9CA3AF] mt-0.5">Latest transactions</p>
            </div>

            <div className="space-y-4">
                {sales.map((sale, i) => (
                    <motion.div
                        key={sale.email}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.06 }}
                        className="flex items-center gap-4"
                    >
                        <Avatar className="w-8 h-8 shrink-0">
                            <AvatarFallback className="bg-[#1f2d3d] text-[#9CA3AF] text-xs">
                                {sale.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#F3F4F6] truncate">
                                {sale.name}
                            </p>
                            <p className="text-xs text-[#9CA3AF] truncate">{sale.email}</p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                            <span
                                className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusStyles[sale.status]}`}
                            >
                                {sale.status}
                            </span>
                            <span className="text-sm font-semibold text-[#F3F4F6]">
                                {formatCurrency(sale.amount)}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}