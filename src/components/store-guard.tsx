"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export function StoreGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { token, isLoading, initialize, user } = useAuthStore();
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            initialize();
        }
    }, []);

    useEffect(() => {
        if (!isLoading) {
            if (!token) {
                router.push("/login");
            } else if (user?.role === "ADMIN") {
                router.push("/dashboard");
            }
        }
    }, [isLoading, token, user]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#07111B] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#C89B5A]/20 border-t-[#C89B5A] rounded-full animate-spin" />
            </div>
        );
    }

    if (!token || user?.role === "ADMIN") return null;

    return <>{children}</>;
}