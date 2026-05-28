import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";

export interface OrderItem {
    id: string;
    quantity: number;
    price: number;
    product: { id: string; name: string; price: number };
}

export interface Order {
    id: string;
    total: number;
    status: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED";
    notes?: string;
    createdAt: string;
    user: { id: string; name: string; email: string };
    items: OrderItem[];
    payment?: any;
}

export interface OrderStats {
    total: number;
    completed: number;
    pending: number;
    revenue: number;
}

export function useOrders() {
    return useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const res = await api.get("/orders");
            return res.data as Order[];
        },
    });
}

export function useOrderStats() {
    return useQuery({
        queryKey: ["orders", "stats"],
        queryFn: async () => {
            const res = await api.get("/orders/stats");
            return res.data as OrderStats;
        },
    });
}

export function useUpdateOrderStatus() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, status }: { id: string; status: string }) => {
            const res = await api.put(`/orders/${id}/status`, { status });
            return res.data;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["orders"] });
            toast.success("Order status updated");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || "Failed to update order");
        },
    });
}

export function useCreateOrder() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (data: { items: { productId: string; quantity: number }[]; notes?: string }) => {
            const res = await api.post("/orders", data);
            return res.data;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["orders"] });
            toast.success("Order created successfully");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || "Failed to create order");
        },
    });
}