import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";

export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    isActive: boolean;
    imageUrl?: string;
    categoryId: string;
    category: { id: string; name: string };
    createdAt: string;
}

export interface CreateProductInput {
    name: string;
    description?: string;
    price: number;
    stock: number;
    categoryId: string;
}

export function useProducts(search?: string) {
    return useQuery({
        queryKey: ["products", search],
        queryFn: async () => {
            const res = await api.get("/products", {
                params: search ? { search } : undefined,
            });
            return res.data as Product[];
        },
    });
}

export function useCreateProduct() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (data: CreateProductInput) => {
            const res = await api.post("/products", data);
            return res.data;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["products"] });
            toast.success("Product created successfully");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || "Failed to create product");
        },
    });
}

export function useUpdateProduct() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: Partial<CreateProductInput> }) => {
            const res = await api.put(`/products/${id}`, data);
            return res.data;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["products"] });
            toast.success("Product updated successfully");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || "Failed to update product");
        },
    });
}

export function useDeleteProduct() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/products/${id}`);
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["products"] });
            toast.success("Product deleted");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || "Failed to delete product");
        },
    });
}