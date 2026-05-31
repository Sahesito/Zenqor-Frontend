"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Sheet, SheetContent, SheetHeader,
    SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from "@/hooks/use-categories";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Tag, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";

interface CategoryForm {
    name: string;
    description?: string;
}

export default function CategoriesPage() {
    const [formOpen, setFormOpen] = useState(false);
    const [editCat, setEditCat] = useState<any>(null);

    const { data: categories, isLoading } = useCategories();
    const createCategory = useCreateCategory();
    const updateCategory = useUpdateCategory();
    const deleteCategory = useDeleteCategory();

    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<CategoryForm>();

    const onSubmit = async (data: CategoryForm) => {
        if (editCat) {
            await updateCategory.mutateAsync({ id: editCat.id, data });
        } else {
            await createCategory.mutateAsync(data);
        }
        reset();
        setFormOpen(false);
        setEditCat(null);
    };

    const inputClass = "bg-[#07111B] border-[#1f2d3d] text-[#F3F4F6] placeholder:text-[#6B7280] focus:border-[#C89B5A]/50 h-10 rounded-xl";

    return (
        <>
            <Header title="Categories" description="Manage your product categories" />
            <main className="flex-1 overflow-y-auto p-6">
                <div className="bg-[#111827] border border-[#1f2d3d] rounded-2xl overflow-hidden">
                    {/* Toolbar */}
                    <div className="flex items-center justify-between p-4 border-b border-[#1f2d3d]">
                        <p className="text-sm text-[#9CA3AF]">
                            {categories?.length || 0} categories
                        </p>
                        <Button
                            onClick={() => { setEditCat(null); reset(); setFormOpen(true); }}
                            size="sm"
                            className="bg-[#C89B5A] hover:bg-[#D8B178] text-[#07111B] font-semibold h-8 rounded-lg"
                        >
                            <Plus className="w-3.5 h-3.5 mr-1.5" />
                            Add Category
                        </Button>
                    </div>

                    {/* List */}
                    {isLoading ? (
                        <div className="p-4 space-y-3">
                            {[...Array(4)].map((_, i) => (
                                <Skeleton key={i} className="h-14 w-full bg-[#1f2d3d] rounded-xl" />
                            ))}
                        </div>
                    ) : !categories?.length ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-12 h-12 rounded-2xl bg-[#1f2d3d] flex items-center justify-center mb-4">
                                <Tag className="w-6 h-6 text-[#6B7280]" />
                            </div>
                            <p className="text-sm font-medium text-[#F3F4F6] mb-1">No categories yet</p>
                            <p className="text-xs text-[#9CA3AF]">Add your first category to get started</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-[#1f2d3d]">
                            {categories.map((cat, i) => (
                                <motion.div
                                    key={cat.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.04 }}
                                    className="flex items-center gap-4 px-4 py-3 hover:bg-[#1f2d3d]/30 transition-colors"
                                >
                                    <div className="w-9 h-9 rounded-xl bg-[#C89B5A]/10 border border-[#C89B5A]/20 flex items-center justify-center shrink-0">
                                        <Tag className="w-4 h-4 text-[#C89B5A]" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-[#F3F4F6]">{cat.name}</p>
                                        {cat.description && (
                                            <p className="text-xs text-[#9CA3AF] truncate">{cat.description}</p>
                                        )}
                                    </div>

                                    <Badge
                                        variant="outline"
                                        className="text-xs border-[#1f2d3d] text-[#9CA3AF] shrink-0"
                                    >
                                        {cat._count?.products || 0} products
                                    </Badge>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="w-7 h-7 text-[#6B7280] hover:text-[#F3F4F6] hover:bg-[#1f2d3d]"
                                            >
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-[#111827] border-[#1f2d3d] text-[#F3F4F6] w-36">
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setEditCat(cat);
                                                    reset({ name: cat.name, description: cat.description });
                                                    setFormOpen(true);
                                                }}
                                                className="text-sm cursor-pointer hover:bg-[#1f2d3d] focus:bg-[#1f2d3d]"
                                            >
                                                <Pencil className="w-3.5 h-3.5 mr-2 text-[#9CA3AF]" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => deleteCategory.mutate(cat.id)}
                                                className="text-sm cursor-pointer text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-400"
                                            >
                                                <Trash2 className="w-3.5 h-3.5 mr-2" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Form */}
            <Sheet open={formOpen} onOpenChange={setFormOpen}>
                <SheetContent className="bg-[#111827] border-[#1f2d3d] text-[#F3F4F6] w-full sm:max-w-sm">
                    <SheetHeader className="mb-6">
                        <SheetTitle className="text-[#F3F4F6]">
                            {editCat ? "Edit Category" : "Add Category"}
                        </SheetTitle>
                        <SheetDescription className="text-[#9CA3AF]">
                            {editCat ? "Update category details" : "Create a new product category"}
                        </SheetDescription>
                    </SheetHeader>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-sm text-[#9CA3AF]">Name</Label>
                            <Input
                                {...register("name", { required: true })}
                                placeholder="e.g. Software"
                                className={inputClass}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-[#9CA3AF]">Description (optional)</Label>
                            <Input
                                {...register("description")}
                                placeholder="Brief description..."
                                className={inputClass}
                            />
                        </div>
                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setFormOpen(false)}
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
                                ) : editCat ? "Save Changes" : "Create"}
                            </Button>
                        </div>
                    </form>
                </SheetContent>
            </Sheet>
        </>
    );
}