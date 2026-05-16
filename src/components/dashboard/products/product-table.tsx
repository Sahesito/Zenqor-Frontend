"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Plus, MoreHorizontal, Pencil, Trash2, Package } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const products = [
    { id: "1", name: "Enterprise License", category: "Software", price: 4999, stock: 999, status: "active" },
    { id: "2", name: "Pro Dashboard Kit", category: "Templates", price: 299, stock: 50, status: "active" },
    { id: "3", name: "Analytics Module", category: "Software", price: 1499, stock: 999, status: "active" },
    { id: "4", name: "API Access Bundle", category: "Services", price: 799, stock: 25, status: "low_stock" },
    { id: "5", name: "Custom Integration", category: "Services", price: 9999, stock: 0, status: "inactive" },
    { id: "6", name: "Starter Pack", category: "Templates", price: 99, stock: 200, status: "active" },
];

const statusStyles: Record<string, { label: string; className: string }> = {
    active: { label: "Active", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    low_stock: { label: "Low Stock", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    inactive: { label: "Inactive", className: "bg-[#1f2d3d] text-[#9CA3AF] border-[#1f2d3d]" },
};

interface ProductTableProps {
    onAdd: () => void;
    onEdit: (product: typeof products[0]) => void;
}

export function ProductTable({ onAdd, onEdit }: ProductTableProps) {
    const [search, setSearch] = useState("");

    const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-[#111827] border border-[#1f2d3d] rounded-2xl overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-4 border-b border-[#1f2d3d]">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6B7280]" />
                    <Input
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 h-8 w-60 bg-[#07111B] border-[#1f2d3d] text-[#F3F4F6] placeholder:text-[#6B7280] text-sm rounded-lg focus:border-[#C89B5A]/50"
                    />
                </div>
                <Button
                    onClick={onAdd}
                    size="sm"
                    className="bg-[#C89B5A] hover:bg-[#D8B178] text-[#07111B] font-semibold h-8 rounded-lg"
                >
                    <Plus className="w-3.5 h-3.5 mr-1.5" />
                    Add Product
                </Button>
            </div>

            {/* Table */}
            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-[#1f2d3d] flex items-center justify-center mb-4">
                        <Package className="w-6 h-6 text-[#6B7280]" />
                    </div>
                    <p className="text-sm font-medium text-[#F3F4F6] mb-1">No products found</p>
                    <p className="text-xs text-[#9CA3AF]">Try adjusting your search</p>
                </div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow className="border-[#1f2d3d] hover:bg-transparent">
                            <TableHead className="text-xs text-[#6B7280] font-medium">Product</TableHead>
                            <TableHead className="text-xs text-[#6B7280] font-medium">Category</TableHead>
                            <TableHead className="text-xs text-[#6B7280] font-medium">Price</TableHead>
                            <TableHead className="text-xs text-[#6B7280] font-medium">Stock</TableHead>
                            <TableHead className="text-xs text-[#6B7280] font-medium">Status</TableHead>
                            <TableHead className="text-xs text-[#6B7280] font-medium w-12" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((product, i) => (
                            <motion.tr
                                key={product.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.04 }}
                                className="border-[#1f2d3d] hover:bg-[#1f2d3d]/30 transition-colors"
                            >
                                <TableCell className="font-medium text-sm text-[#F3F4F6]">
                                    {product.name}
                                </TableCell>
                                <TableCell className="text-sm text-[#9CA3AF]">
                                    {product.category}
                                </TableCell>
                                <TableCell className="text-sm text-[#F3F4F6] font-medium">
                                    {formatCurrency(product.price)}
                                </TableCell>
                                <TableCell className="text-sm text-[#9CA3AF]">
                                    {product.stock === 999 ? "∞" : product.stock}
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className={`text-xs rounded-full ${statusStyles[product.status].className}`}
                                    >
                                        {statusStyles[product.status].label}
                                    </Badge>
                                </TableCell>
                                <TableCell>
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
                                        <DropdownMenuContent
                                            align="end"
                                            className="bg-[#111827] border-[#1f2d3d] text-[#F3F4F6] w-36"
                                        >
                                            <DropdownMenuItem
                                                onClick={() => onEdit(product)}
                                                className="text-sm cursor-pointer hover:bg-[#1f2d3d] focus:bg-[#1f2d3d]"
                                            >
                                                <Pencil className="w-3.5 h-3.5 mr-2 text-[#9CA3AF]" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-sm cursor-pointer text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-400">
                                                <Trash2 className="w-3.5 h-3.5 mr-2" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </motion.tr>
                        ))}
                    </TableBody>
                </Table>
            )}

            {/* Footer */}
            <div className="px-4 py-3 border-t border-[#1f2d3d] flex items-center justify-between">
                <p className="text-xs text-[#6B7280]">
                    {filtered.length} of {products.length} products
                </p>
            </div>
        </div>
    );
}