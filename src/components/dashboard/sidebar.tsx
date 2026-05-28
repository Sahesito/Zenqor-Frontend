"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    BarChart3,
    Settings,
    ChevronLeft,
    LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuthStore } from "@/store/auth.store";

const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
    { href: "/dashboard/products", icon: Package, label: "Products" },
    { href: "/dashboard/sales", icon: ShoppingCart, label: "Sales" },
    { href: "/dashboard/customers", icon: Users, label: "Customers" },
    { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();
    const { user, logout } = useAuthStore();

    return (
        <TooltipProvider delayDuration={0}>
            <motion.aside
                animate={{ width: collapsed ? 64 : 220 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative flex flex-col h-screen bg-[#0a1628] border-r border-[#1f2d3d] shrink-0 overflow-hidden"
            >
                {/* Logo */}
                <div className="h-16 flex items-center px-4 border-b border-[#1f2d3d] shrink-0">
                    <Link href="/dashboard" className="flex items-center gap-3 min-w-0">
                        <img src="/Zenqor.png" alt="ZENQOR" className="h-7 w-auto shrink-0" />
                        <AnimatePresence>
                            {!collapsed && (
                                <motion.span
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    exit={{ opacity: 0, width: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-sm font-semibold text-[#F3F4F6] tracking-tight overflow-hidden whitespace-nowrap"
                                >
                                    ZENQOR
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>
                </div>

                {/* Nav */}
                <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Tooltip key={item.href}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-3 h-9 rounded-lg text-sm transition-all duration-200 group relative",
                                            isActive
                                                ? "bg-[#C89B5A]/10 text-[#C89B5A]"
                                                : "text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1f2d3d]/50"
                                        )}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeNav"
                                                className="absolute inset-0 rounded-lg bg-[#C89B5A]/10 border border-[#C89B5A]/20"
                                                transition={{ duration: 0.2 }}
                                            />
                                        )}
                                        <item.icon className="w-4 h-4 shrink-0 relative z-10" />
                                        <AnimatePresence>
                                            {!collapsed && (
                                                <motion.span
                                                    initial={{ opacity: 0, width: 0 }}
                                                    animate={{ opacity: 1, width: "auto" }}
                                                    exit={{ opacity: 0, width: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="overflow-hidden whitespace-nowrap relative z-10"
                                                >
                                                    {item.label}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </Link>
                                </TooltipTrigger>
                                {collapsed && (
                                    <TooltipContent side="right" className="bg-[#111827] border-[#1f2d3d] text-[#F3F4F6]">
                                        {item.label}
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        );
                    })}
                </nav>

                {/* User */}
                <div className="border-t border-[#1f2d3d] p-3 shrink-0">
                    <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8 shrink-0">
                            <AvatarFallback className="bg-[#C89B5A]/20 text-[#C89B5A] text-xs font-semibold">
                                {user?.name?.split(" ").map((n) => n[0]).join("") || "??"}
                            </AvatarFallback>
                        </Avatar>
                        <AnimatePresence>
                            {!collapsed && (
                                <motion.div
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    exit={{ opacity: 0, width: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex-1 min-w-0 overflow-hidden"
                                >
                                    <p className="text-xs font-medium text-[#F3F4F6] truncate">
                                        {user?.name || "User"}
                                    </p>
                                    <p className="text-xs text-[#9CA3AF] truncate capitalize">
                                        {user?.role?.toLowerCase() || "user"}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <AnimatePresence>
                            {!collapsed && (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={logout}
                                    className="text-[#6B7280] hover:text-[#EF4444] transition-colors shrink-0"
                                >
                                    <LogOut className="w-4 h-4" />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Collapse button */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute -right-3 top-20 w-6 h-6 bg-[#111827] border border-[#1f2d3d] rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-[#C89B5A] transition-colors z-10"
                >
                    <motion.div
                        animate={{ rotate: collapsed ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronLeft className="w-3 h-3" />
                    </motion.div>
                </button>
            </motion.aside>
        </TooltipProvider>
    );
}