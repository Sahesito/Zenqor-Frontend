"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { token, isLoading } = useAuthStore();

    useEffect(() => {
        if (!isLoading && !token) {
            router.push("/login");
        }
    }, [token, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#07111B] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-[#C89B5A]/20 border-t-[#C89B5A] rounded-full animate-spin" />
                    <p className="text-xs text-[#9CA3AF]">Loading...</p>
                </div>
            </div>
        );
    }

    if (!token) return null;

    return <>{children}</>;
}