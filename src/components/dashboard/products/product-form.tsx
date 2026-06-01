"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { useCategories } from "@/hooks/use-categories";
import { useCreateProduct, useUpdateProduct, type Product } from "@/hooks/use-products";

const productSchema = z.object({
    name: z.string().min(2, "Name is required"),
    category: z.string().min(1, "Category is required"),
    price: z.preprocess((v) => parseFloat(String(v)), z.number().positive("Price must be positive")),
    stock: z.preprocess((v) => parseInt(String(v)), z.number().min(0, "Stock cannot be negative")),
    status: z.enum(["active", "inactive", "low_stock"]),
    imageUrl: z.string().optional(),
});

type ProductFormValues = {
    name: string;
    category: string;
    price: number;
    stock: number;
    status: "active" | "inactive" | "low_stock";
    imageUrl?: string;
};

type ProductForm = z.infer<typeof productSchema>;

interface ProductFormProps {
    open: boolean;
    onClose: () => void;
    defaultValues?: Product | null;
    mode?: "create" | "edit";
}
export function ProductForm({
    open,
    onClose,
    defaultValues,
    mode = "create",
}: ProductFormProps) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ProductForm>({
        resolver: zodResolver(productSchema) as any,
        defaultValues: defaultValues
            ? {
                name: defaultValues.name,
                category: defaultValues.categoryId,
                price: defaultValues.price,
                stock: defaultValues.stock,
                status: defaultValues.isActive ? "active" : "inactive",
            }
            : { status: "active" },
    });

    const { data: categories } = useCategories();
    const createProduct = useCreateProduct();
    const updateProduct = useUpdateProduct();

    const onSubmit = async (data: ProductFormValues) => {
        if (mode === "create") {
            await createProduct.mutateAsync({
                name: data.name,
                price: data.price,
                stock: data.stock,
                categoryId: data.category,
                imageUrl: data.imageUrl,
            });
        } else if (defaultValues?.id) {
            await updateProduct.mutateAsync({
                id: defaultValues.id,
                data: {
                    name: data.name,
                    price: data.price,
                    stock: data.stock,
                    categoryId: data.category,
                    imageUrl: data.imageUrl,
                },
            });
        }
        reset();
        onClose();
    };

    const inputClass =
        "bg-[#07111B] border-[#1f2d3d] text-[#F3F4F6] placeholder:text-[#6B7280] focus:border-[#C89B5A]/50 h-10 rounded-xl";

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="bg-[#111827] border-[#1f2d3d] text-[#F3F4F6] w-full sm:max-w-md">
                <SheetHeader className="mb-6">
                    <SheetTitle className="text-[#F3F4F6]">
                        {mode === "create" ? "Add Product" : "Edit Product"}
                    </SheetTitle>
                    <SheetDescription className="text-[#9CA3AF]">
                        {mode === "create"
                            ? "Add a new product to your catalog"
                            : "Update product details"}
                    </SheetDescription>
                </SheetHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">


                    <div className="space-y-2">
                        <Label className="text-sm text-[#9CA3AF]">Product Name</Label>
                        <Input {...register("name")} placeholder="e.g. Enterprise License" className={inputClass} />
                        {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm text-[#9CA3AF]">Category</Label>
                        <Select onValueChange={(v) => setValue("category", v)} defaultValue={defaultValues?.categoryId}>
                            <SelectTrigger className={inputClass}>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#111827] border-[#1f2d3d]">
                                {categories?.map((c) => (
                                    <SelectItem key={c.id} value={c.id} className="text-[#F3F4F6] focus:bg-[#1f2d3d]">
                                        {c.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.category && <p className="text-xs text-red-400">{errors.category.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-sm text-[#9CA3AF]">Price ($)</Label>
                            <Input {...register("price")} type="number" placeholder="0.00" className={inputClass} />
                            {errors.price && <p className="text-xs text-red-400">{errors.price.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-[#9CA3AF]">Stock</Label>
                            <Input {...register("stock")} type="number" placeholder="0" className={inputClass} />
                            {errors.stock && <p className="text-xs text-red-400">{errors.stock.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm text-[#9CA3AF]">Image URL (optional)</Label>
                        <Input
                            {...register("imageUrl")}
                            placeholder="https://example.com/image.jpg"
                            className={inputClass}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm text-[#9CA3AF]">Status</Label>
                        <Select onValueChange={(v) => setValue("status", v as ProductForm["status"])} defaultValue={defaultValues?.isActive === false ? "inactive" : "active"}>
                            <SelectTrigger className={inputClass}>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#111827] border-[#1f2d3d]">
                                <SelectItem value="active" className="text-[#F3F4F6] focus:bg-[#1f2d3d]">Active</SelectItem>
                                <SelectItem value="low_stock" className="text-[#F3F4F6] focus:bg-[#1f2d3d]">Low Stock</SelectItem>
                                <SelectItem value="inactive" className="text-[#F3F4F6] focus:bg-[#1f2d3d]">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1 border-[#1f2d3d] text-[#9CA3AF] hover:text-[#F3F4F6] bg-transparent rounded-xl"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-[#C89B5A] hover:bg-[#D8B178] text-[#07111B] font-semibold rounded-xl"
                        >
                            {isSubmitting ? (
                                <div className="w-4 h-4 border-2 border-[#07111B]/30 border-t-[#07111B] rounded-full animate-spin" />
                            ) : mode === "create" ? "Add Product" : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
}