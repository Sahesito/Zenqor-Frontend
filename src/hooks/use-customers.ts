import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";

export interface Customer {
    id: string;
    name: string;
    email: string;
    company?: string;
    role: string;
    isActive: boolean;
    createdAt: string;
    _count: { orders: number };
}

export function useCustomers() {
    return useQuery({
        queryKey: ["customers"],
        queryFn: async () => {
            const res = await api.get("/users?limit=50");
            return (res.data.users || res.data) as Customer[];
        },
    });
}

export function useCustomerStats() {
    return useQuery({
        queryKey: ["customers", "stats"],
        queryFn: async () => {
            const res = await api.get("/users/stats");
            return res.data as { total: number; active: number };
        },
    });
}

export function useDeactivateCustomer() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const res = await api.patch(`/users/${id}/deactivate`);
            return res.data;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["customers"] });
            toast.success("Customer deactivated");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || "Failed to deactivate");
        },
    });
}