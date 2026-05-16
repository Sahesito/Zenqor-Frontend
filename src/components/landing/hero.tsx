"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C89B5A]/8 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-[#C89B5A]/5 rounded-full blur-[80px]" />
            </div>

            {/* Grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#C89B5A 1px, transparent 1px), linear-gradient(90deg, #C89B5A 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mb-8"
                >
                    <Badge className="bg-[#C89B5A]/10 text-[#C89B5A] border border-[#C89B5A]/20 px-4 py-1.5 text-xs font-medium rounded-full">
                        <Zap className="w-3 h-3 mr-1.5" />
                        Sales Intelligence Platform
                    </Badge>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-semibold tracking-tight text-[#F3F4F6] leading-[1.1] mb-6"
                >
                    Sales that move at{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C89B5A] to-[#D8B178]">
                        the speed of thought
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg text-[#9CA3AF] max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    ZENQOR gives high-performance teams a unified command center to manage
                    products, track sales, and close deals — with intelligence built in.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link href="/register">
                        <Button
                            size="lg"
                            className="bg-[#C89B5A] hover:bg-[#D8B178] text-[#07111B] font-semibold px-8 h-12 transition-all duration-200 hover:shadow-[0_0_30px_rgba(200,155,90,0.3)]"
                        >
                            Start for free
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                    <Link href="/login">
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-[#1f2d3d] text-[#9CA3AF] hover:text-[#F3F4F6] hover:border-[#C89B5A]/30 h-12 px-8 bg-transparent"
                        >
                            View dashboard
                        </Button>
                    </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
                >
                    {[
                        { value: "10K+", label: "Active users" },
                        { value: "$2.4B", label: "Revenue tracked" },
                        { value: "99.9%", label: "Uptime SLA" },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-2xl font-semibold text-[#F3F4F6]">
                                {stat.value}
                            </div>
                            <div className="text-xs text-[#9CA3AF] mt-1">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}