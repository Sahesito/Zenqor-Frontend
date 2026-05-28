import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useAnalyticsOverview() {
    return useQuery({
        queryKey: ["analytics", "overview"],
        queryFn: async () => {
            const res = await api.get("/analytics/overview");
            return res.data;
        },
    });
}

export function useMonthlyData() {
    return useQuery({
        queryKey: ["analytics", "monthly"],
        queryFn: async () => {
            const res = await api.get("/analytics/monthly");
            return res.data as { month: string; revenue: number; orders: number }[];
        },
    });
}

export function useOrdersByStatus() {
    return useQuery({
        queryKey: ["analytics", "by-status"],
        queryFn: async () => {
            const res = await api.get("/analytics/by-status");
            return res.data as { name: string; value: number }[];
        },
    });
}