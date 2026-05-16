"use client";

import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
    title: string;
    description?: string;
}

export function Header({ title, description }: HeaderProps) {
    return (
        <header className="h-16 border-b border-[#1f2d3d] flex items-center justify-between px-6 bg-[#07111B] shrink-0">
            <div>
                <h1 className="text-sm font-semibold text-[#F3F4F6]">{title}</h1>
                {description && (
                    <p className="text-xs text-[#9CA3AF] mt-0.5">{description}</p>
                )}
            </div>

            <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6B7280]" />
                    <Input
                        placeholder="Search..."
                        className="pl-9 h-8 w-52 bg-[#111827] border-[#1f2d3d] text-[#F3F4F6] placeholder:text-[#6B7280] text-sm rounded-lg focus:border-[#C89B5A]/50"
                    />
                </div>

                {/* Notifications */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative w-8 h-8 text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1f2d3d]"
                >
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#C89B5A] rounded-full" />
                </Button>
            </div>
        </header>
    );
}