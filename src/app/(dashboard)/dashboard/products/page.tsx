"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard/header";
import { ProductTable } from "@/components/dashboard/products/product-table";
import { ProductForm } from "@/components/dashboard/products/product-form";

export default function ProductsPage() {
    const [formOpen, setFormOpen] = useState(false);
    const [editProduct, setEditProduct] = useState<any>(null);

    return (
        <>
            <Header title="Products" description="Manage your product catalog" />
            <main className="flex-1 overflow-y-auto p-6">
                <ProductTable
                    onAdd={() => { setEditProduct(null); setFormOpen(true); }}
                    onEdit={(p) => { setEditProduct(p); setFormOpen(true); }}
                />
                <ProductForm
                    open={formOpen}
                    onClose={() => { setFormOpen(false); setEditProduct(null); }}
                    defaultValues={editProduct}
                    mode={editProduct ? "edit" : "create"}
                />
            </main>
        </>
    );
}