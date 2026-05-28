import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface DashboardStats {
    revenue: number;
    orders: number;
    customers: number;
    products: number;
    revenueChange: number;
    ordersChange: number;
}

export function useDashboardStats() {
    return useQuery({
        queryKey: ["dashboard", "stats"],
        queryFn: async () => {
            const [orders, products] = await Promise.all([
                api.get("/orders/stats"),
                api.get("/products"),
            ]);
            return {
                revenue: orders.data.revenue || 0,
                orders: orders.data.total || 0,
                products: products.data.length || 0,
                completed: orders.data.completed || 0,
                pending: orders.data.pending || 0,
            };
        },
    });
}