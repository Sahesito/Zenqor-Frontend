"use client";

import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

function AuthInitializer({ children }: { children: React.ReactNode }) {
    const initialize = useAuthStore((s) => s.initialize);
    useEffect(() => { initialize(); }, [initialize]);
    return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthInitializer>{children}</AuthInitializer>
        </QueryClientProvider>
    );
}