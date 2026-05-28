"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";
import { LayoutDashboard } from "lucide-react";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { token, initialize } = useAuthStore();

    useEffect(() => {
        initialize();
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? "bg-[#07111B]/80 backdrop-blur-xl border-b border-[#1f2d3d]"
                    : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center group">
                    <img src="/logo.png" alt="ZENQOR" className="h-8 w-auto object-contain" />
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {["Product", "Features", "Pricing", "Docs"].map((item) => (
                        <Link
                            key={item}
                            href="#"
                            className="text-sm text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors duration-200"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    {token ? (
                        <Link href="/dashboard">
                            <Button
                                size="sm"
                                className="bg-[#C89B5A] hover:bg-[#D8B178] text-[#07111B] font-semibold transition-all duration-200"
                            >
                                <LayoutDashboard className="w-3.5 h-3.5 mr-1.5" />
                                Dashboard
                            </Button>
                        </Link>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="ghost" size="sm" className="text-[#9CA3AF] hover:text-[#F3F4F6]">
                                    Sign in
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button
                                    size="sm"
                                    className="bg-[#C89B5A] hover:bg-[#D8B178] text-[#07111B] font-semibold"
                                >
                                    Get started
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </motion.header>
    );
}