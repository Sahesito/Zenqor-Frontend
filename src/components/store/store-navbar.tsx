"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";
import { useCartStore } from "@/store/cart.store";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Search, LogOut, User, Package  } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";

interface StoreNavbarProps {
    onSearch?: (q: string) => void;
}

export function StoreNavbar({ onSearch }: StoreNavbarProps) {
    const { user, logout } = useAuthStore();
    const { items } = useCartStore();
    const [search, setSearch] = useState("");
    const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);

    return (
        <header className="sticky top-0 z-50 bg-[#07111B]/90 backdrop-blur-xl border-b border-[#1f2d3d]">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
                {/* Logo */}
                <Link href="/store" className="shrink-0">
                    <img src="/Zenqor.png" alt="ZENQOR" className="h-7 w-auto" />
                </Link>

                {/* Search */}
                <div className="flex-1" />

                {/* Actions */}
                <div className="flex items-center gap-3 shrink-0">
                    {/* User */}
                    <div className="hidden sm:flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#C89B5A]/20 flex items-center justify-center">
                            <User className="w-3.5 h-3.5 text-[#C89B5A]" />
                        </div>
                        <span className="text-sm text-[#9CA3AF]">
                            {user?.name?.split(" ")[0]}
                        </span>
                    </div>
                    <Link href="/store/orders">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-[#9CA3AF] hover:text-[#F3F4F6] h-8 px-3 rounded-xl"
                        >
                            <Package className="w-3.5 h-3.5 mr-1.5" />
                            My Orders
                        </Button>
                    </Link>

                    <Link href="/account/settings">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 text-[#6B7280] hover:text-[#F3F4F6]"
                        >
                            <Settings className="w-4 h-4" />
                        </Button>
                    </Link>
                    {/* Cart */}
                    <Link href="/store/cart">
                        <Button
                            variant="outline"
                            size="sm"
                            className="relative border-[#1f2d3d] bg-[#111827] text-[#F3F4F6] hover:border-[#C89B5A]/30 rounded-xl h-9"
                        >
                            <ShoppingCart className="w-4 h-4 mr-1.5" />
                            Cart
                            {totalItems > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#C89B5A] text-[#07111B] rounded-full text-xs font-bold flex items-center justify-center"
                                >
                                    {totalItems}
                                </motion.span>
                            )}
                        </Button>
                    </Link>

                    {/* Logout */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={logout}
                        className="w-8 h-8 text-[#6B7280] hover:text-red-400"
                    >
                        <LogOut className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </header>
    );
}