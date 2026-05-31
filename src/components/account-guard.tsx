"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export function AccountGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { token, initialize } = useAuthStore();
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            initialize();
        }
    }, []);

    useEffect(() => {
        if (!token) router.push("/login");
    }, [token]);

    if (!token) return null;

    return <>{children}</>;
}