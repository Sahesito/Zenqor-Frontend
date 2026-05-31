import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";

export interface Category {
    id: string;
    name: string;
    description?: string;
    _count?: { products: number };
}

export function useCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await api.get("/categories");
            return res.data as Category[];
        },
    });
}

export function useCreateCategory() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (data: { name: string; description?: string }) => {
            const res = await api.post("/categories", data);
            return res.data;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Category created");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || "Failed to create category");
        },
    });
}

export function useUpdateCategory() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: { name?: string; description?: string } }) => {
            const res = await api.put(`/categories/${id}`, data);
            return res.data;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Category updated");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || "Failed to update category");
        },
    });
}

export function useDeleteCategory() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/categories/${id}`);
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Category deleted");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || "Failed to delete category");
        },
    });
}