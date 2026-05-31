"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/use-products";
import { useCartStore } from "@/store/cart.store";
import { formatCurrency } from "@/lib/utils";
import { ShoppingCart, Package, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function StorePage() {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const { data: products, isLoading } = useProducts();
    const { addItem, items } = useCartStore();

    const categories = ["All", ...Array.from(new Set(products?.map((p) => p.category.name) || []))];

    const filtered = (products || []).filter((p) => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchCat = activeCategory === "All" || p.category.name === activeCategory;
        return matchSearch && matchCat && p.isActive;
    });

    const handleAddToCart = (product: typeof filtered[0]) => {
        addItem({
            productId: product.id,
            name: product.name,
            price: Number(product.price),
            quantity: 1,
        });
        toast.success(`${product.name} added to cart`, {
            description: formatCurrency(Number(product.price)),
        });
    };

    const getCartQty = (productId: string) =>
        items.find((i) => i.productId === productId)?.quantity || 0;

    return (
        <>
            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Barra de búsqueda local */}
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                    <Input
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 h-10 bg-[#111827] border-[#1f2d3d] text-[#F3F4F6] placeholder:text-[#6B7280] rounded-xl focus:border-[#C89B5A]/50 w-full max-w-md"
                    />
                </div>
                {/* Categories */}
                <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 h-8 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${activeCategory === cat
                                ? "bg-[#C89B5A] text-[#07111B]"
                                : "bg-[#111827] text-[#9CA3AF] hover:text-[#F3F4F6] border border-[#1f2d3d]"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Products grid */}
                {isLoading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {[...Array(10)].map((_, i) => (
                            <Skeleton key={i} className="h-64 bg-[#111827] rounded-2xl" />
                        ))}
                    </div>
                ) : !filtered.length ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <div className="w-16 h-16 rounded-2xl bg-[#111827] flex items-center justify-center mb-4">
                            <Package className="w-8 h-8 text-[#6B7280]" />
                        </div>
                        <p className="text-[#F3F4F6] font-medium mb-1">No products found</p>
                        <p className="text-sm text-[#9CA3AF]">Try a different search or category</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {filtered.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-[#111827] border border-[#1f2d3d] rounded-2xl overflow-hidden group hover:border-[#C89B5A]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(200,155,90,0.08)]"
                            >
                                {/* Product image placeholder */}
                                <div className="aspect-square bg-[#1f2d3d] flex items-center justify-center relative overflow-hidden">
                                    <Package className="w-12 h-12 text-[#6B7280]" />
                                    {product.stock < 10 && product.stock > 0 && (
                                        <Badge className="absolute top-2 left-2 bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                                            Low Stock
                                        </Badge>
                                    )}
                                    {product.stock === 0 && (
                                        <Badge className="absolute top-2 left-2 bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                                            Out of Stock
                                        </Badge>
                                    )}
                                    {getCartQty(product.id) > 0 && (
                                        <div className="absolute top-2 right-2 w-5 h-5 bg-[#C89B5A] rounded-full flex items-center justify-center text-xs font-bold text-[#07111B]">
                                            {getCartQty(product.id)}
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="p-3">
                                    <p className="text-xs text-[#9CA3AF] mb-1">{product.category.name}</p>
                                    <p className="text-sm font-medium text-[#F3F4F6] line-clamp-2 mb-2 min-h-[2.5rem]">
                                        {product.name}
                                    </p>

                                    {/* Stars decorative */}
                                    <div className="flex items-center gap-0.5 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3 h-3 ${i < 4 ? "text-[#C89B5A] fill-[#C89B5A]" : "text-[#6B7280]"}`}
                                            />
                                        ))}
                                        <span className="text-xs text-[#9CA3AF] ml-1">4.0</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-base font-bold text-[#C89B5A]">
                                            {formatCurrency(Number(product.price))}
                                        </span>
                                    </div>

                                    <Button
                                        onClick={() => handleAddToCart(product)}
                                        disabled={product.stock === 0}
                                        size="sm"
                                        className="w-full mt-2 h-8 bg-[#C89B5A]/10 hover:bg-[#C89B5A] text-[#C89B5A] hover:text-[#07111B] border border-[#C89B5A]/30 rounded-xl text-xs font-semibold transition-all duration-200 disabled:opacity-40"
                                    >
                                        <ShoppingCart className="w-3 h-3 mr-1.5" />
                                        {getCartQty(product.id) > 0 ? "Add More" : "Add to Cart"}
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
            <Toaster
                theme="dark"
                toastOptions={{
                    style: { background: "#111827", border: "1px solid #1f2d3d", color: "#F3F4F6" },
                }}
            />
        </>
    );
}