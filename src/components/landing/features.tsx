"use client";

import { motion } from "framer-motion";
import {
    BarChart3,
    Package,
    ShoppingCart,
    Shield,
    Zap,
    Users,
} from "lucide-react";

const features = [
    {
        icon: BarChart3,
        title: "Real-time Analytics",
        description:
            "Monitor every sale, track revenue trends, and make data-driven decisions with live dashboards.",
    },
    {
        icon: Package,
        title: "Product Management",
        description:
            "Organize your catalog with categories, pricing, and inventory — all in one elegant interface.",
    },
    {
        icon: ShoppingCart,
        title: "Order Tracking",
        description:
            "From placement to fulfillment, track every order with precision and full audit history.",
    },
    {
        icon: Shield,
        title: "Role-based Access",
        description:
            "Granular permissions for admins and users. Keep your data secure without friction.",
    },
    {
        icon: Zap,
        title: "Instant Performance",
        description:
            "Built on Next.js 15 and NestJS. Sub-second load times, optimized for scale.",
    },
    {
        icon: Users,
        title: "Team Ready",
        description:
            "Collaborate with your team in real time. Designed for high-performance sales teams.",
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    },
};

export function Features() {
    return (
        <section className="py-32 px-6 relative">
            {/* Subtle divider glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-[#C89B5A]/20" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-20"
                >
                    <p className="text-[#C89B5A] text-sm font-medium tracking-widest uppercase mb-4">
                        Platform
                    </p>
                    <h2 className="text-4xl md:text-5xl font-semibold text-[#F3F4F6] tracking-tight mb-5">
                        Everything your team needs
                    </h2>
                    <p className="text-[#9CA3AF] text-lg max-w-xl mx-auto leading-relaxed">
                        A complete sales operating system. No integrations needed,
                        no complexity required.
                    </p>
                </motion.div>

                {/* Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1f2d3d]/50 rounded-2xl overflow-hidden border border-[#1f2d3d]"
                >
                    {features.map((feature) => (
                        <motion.div
                            key={feature.title}
                            variants={cardVariants}
                            className="bg-[#07111B] p-8 group hover:bg-[#111827] transition-colors duration-300 relative"
                        >
                            {/* Gold hover line */}
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C89B5A]/0 to-transparent group-hover:via-[#C89B5A]/40 transition-all duration-500" />

                            <div className="w-10 h-10 rounded-xl bg-[#C89B5A]/10 border border-[#C89B5A]/20 flex items-center justify-center mb-5 group-hover:bg-[#C89B5A]/15 transition-colors duration-300">
                                <feature.icon className="w-5 h-5 text-[#C89B5A]" />
                            </div>

                            <h3 className="text-[#F3F4F6] font-semibold mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-[#9CA3AF] text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}