import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";

export function useDashboardStats() {
    return useQuery({
        queryKey: ["dashboard", "stats"],
        queryFn: async () => {
            const [analytics, products, customers] = await Promise.all([
                api.get("/analytics/overview"),
                api.get("/products"),
                api.get("/users/stats"),
            ]);
            return {
                revenue: analytics.data.totalRevenue || 0,
                orders: analytics.data.totalOrders || 0,
                products: products.data.length || 0,
                customers: customers.data.total || 0,
                completed: analytics.data.completedOrders || 0,
                pending: analytics.data.pendingOrders || 0,
            };
        },
    });
}