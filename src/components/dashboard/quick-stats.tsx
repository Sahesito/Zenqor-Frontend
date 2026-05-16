"use client";

import { motion } from "framer-motion";

const stats = [
    { label: "Conversion Rate", value: "3.24%", bar: 32 },
    { label: "Avg. Order Value", value: "$284", bar: 58 },
    { label: "Customer Satisfaction", value: "94.2%", bar: 94 },
    { label: "Monthly Target", value: "78%", bar: 78 },
];

export function QuickStats() {
    return (
        <div className="bg-[#111827] border border-[#1f2d3d] rounded-2xl p-6">
            <div className="mb-6">
                <h3 className="text-sm font-semibold text-[#F3F4F6]">Performance</h3>
                <p className="text-xs text-[#9CA3AF] mt-0.5">Key metrics this month</p>
            </div>

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
        </div>
    );
}