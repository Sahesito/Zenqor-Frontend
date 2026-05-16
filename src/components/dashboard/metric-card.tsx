"use client";

import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
    title: string;
    value: string;
    change: number;
    icon: LucideIcon;
    index?: number;
}

export function MetricCard({
    title,
    value,
    change,
    icon: Icon,
    index = 0,
}: MetricCardProps) {
    const isPositive = change >= 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="bg-[#111827] border border-[#1f2d3d] rounded-2xl p-6 group hover:border-[#C89B5A]/20 transition-all duration-300"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#C89B5A]/10 border border-[#C89B5A]/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#C89B5A]" />
                </div>
                <span
                    className={cn(
                        "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                        isPositive
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-red-500/10 text-red-400"
                    )}
                >
                    {isPositive ? (
                        <TrendingUp className="w-3 h-3" />
                    ) : (
                        <TrendingDown className="w-3 h-3" />
                    )}
                    {Math.abs(change)}%
                </span>
            </div>

            <p className="text-2xl font-semibold text-[#F3F4F6] mb-1">{value}</p>
            <p className="text-xs text-[#9CA3AF]">{title}</p>
        </motion.div>
    );
}