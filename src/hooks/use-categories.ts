import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface Category {
    id: string;
    name: string;
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