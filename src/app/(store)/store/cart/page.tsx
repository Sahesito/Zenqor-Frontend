"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cart.store";
import { useCreateOrder } from "@/hooks/use-orders";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const PAYMENT_METHODS = [
    { value: "card", label: "Credit Card", icon: "💳" },
    { value: "transfer", label: "Bank Transfer", icon: "🏦" },
    { value: "cash", label: "Cash", icon: "💵" },
    { value: "crypto", label: "Crypto", icon: "₿" },
];

export default function CartPage() {
    const { items, removeItem, updateQty, clearCart, total } = useCartStore();
    const { user } = useAuthStore();
    const createOrder = useCreateOrder();
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState("");
    const [checking, setChecking] = useState(false);

    const handleCheckout = async () => {
        if (!paymentMethod) {
            toast.error("Please select a payment method");
            return;
        }
        try {
            setChecking(true);
            await createOrder.mutateAsync({
                items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
                notes: `Payment: ${paymentMethod}`,
            });
            clearCart();
            toast.success("Order placed successfully! 🎉");
            setTimeout(() => router.push("/store/orders"), 1500);
        } catch {
            toast.error("Failed to place order");
        } finally {
            setChecking(false);
        }
    };

    if (items.length === 0) {
        return (
            <main className="max-w-2xl mx-auto px-4 py-20 text-center">
                <div className="w-20 h-20 rounded-3xl bg-[#111827] flex items-center justify-center mx-auto mb-6">
                    <ShoppingCart className="w-10 h-10 text-[#6B7280]" />
                </div>
                <h2 className="text-xl font-semibold text-[#F3F4F6] mb-2">Your cart is empty</h2>
                <p className="text-[#9CA3AF] mb-8">Add some products to get started</p>
                <Link href="/store">
                    <Button className="bg-[#C89B5A] hover:bg-[#D8B178] text-[#07111B] font-semibold rounded-xl">
                        Browse Products
                    </Button>
                </Link>
                <Toaster theme="dark" toastOptions={{ style: { background: "#111827", border: "1px solid #1f2d3d", color: "#F3F4F6" } }} />
            </main>
        );
    }

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-8">
                <Link href="/store">
                    <Button variant="ghost" size="icon" className="text-[#9CA3AF] hover:text-[#F3F4F6]">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                </Link>
                <h1 className="text-lg font-semibold text-[#F3F4F6]">
                    Your Cart ({items.length} {items.length === 1 ? "item" : "items"})
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Items */}
                <div className="lg:col-span-2 space-y-3">
                    <AnimatePresence>
                        {items.map((item) => (
                            <motion.div
                                key={item.productId}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="bg-[#111827] border border-[#1f2d3d] rounded-2xl p-4 flex items-center gap-4"
                            >
                                <div className="w-16 h-16 rounded-xl bg-[#1f2d3d] flex items-center justify-center shrink-0">
                                    <ShoppingCart className="w-6 h-6 text-[#6B7280]" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-[#F3F4F6] truncate">{item.name}</p>
                                    <p className="text-sm font-bold text-[#C89B5A]">
                                        {formatCurrency(item.price)}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    <button
                                        onClick={() => updateQty(item.productId, item.quantity - 1)}
                                        className="w-7 h-7 rounded-lg bg-[#1f2d3d] flex items-center justify-center text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
                                    >
                                        <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="text-sm font-semibold text-[#F3F4F6] w-6 text-center">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => updateQty(item.productId, item.quantity + 1)}
                                        className="w-7 h-7 rounded-lg bg-[#1f2d3d] flex items-center justify-center text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
                                    >
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>

                                <p className="text-sm font-bold text-[#F3F4F6] w-20 text-right shrink-0">
                                    {formatCurrency(item.price * item.quantity)}
                                </p>

                                <button
                                    onClick={() => removeItem(item.productId)}
                                    className="text-[#6B7280] hover:text-red-400 transition-colors shrink-0"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Summary */}
                <div className="space-y-4">
                    {/* Order summary */}
                    <div className="bg-[#111827] border border-[#1f2d3d] rounded-2xl p-5">
                        <h3 className="text-sm font-semibold text-[#F3F4F6] mb-4">Order Summary</h3>

                        <div className="space-y-2 mb-4">
                            {items.map((item) => (
                                <div key={item.productId} className="flex justify-between text-xs">
                                    <span className="text-[#9CA3AF] truncate mr-2">
                                        {item.name} × {item.quantity}
                                    </span>
                                    <span className="text-[#F3F4F6] shrink-0">
                                        {formatCurrency(item.price * item.quantity)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-[#1f2d3d] pt-3 flex justify-between">
                            <span className="text-sm font-medium text-[#F3F4F6]">Total</span>
                            <span className="text-lg font-bold text-[#C89B5A]">
                                {formatCurrency(total())}
                            </span>
                        </div>
                    </div>

                    {/* Payment method */}
                    <div className="bg-[#111827] border border-[#1f2d3d] rounded-2xl p-5">
                        <h3 className="text-sm font-semibold text-[#F3F4F6] mb-3">Payment Method</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {PAYMENT_METHODS.map((method) => (
                                <button
                                    key={method.value}
                                    onClick={() => setPaymentMethod(method.value)}
                                    className={`relative p-3 rounded-xl border text-left transition-all duration-200 ${paymentMethod === method.value
                                            ? "border-[#C89B5A]/40 bg-[#C89B5A]/5"
                                            : "border-[#1f2d3d] hover:border-[#C89B5A]/20 bg-[#07111B]"
                                        }`}
                                >
                                    <span className="text-lg block mb-1">{method.icon}</span>
                                    <span className="text-xs font-medium text-[#F3F4F6]">{method.label}</span>
                                    {paymentMethod === method.value && (
                                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#C89B5A]" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Checkout */}
                    <div className="bg-[#111827] border border-[#1f2d3d] rounded-2xl p-5">
                        <p className="text-xs text-[#9CA3AF] mb-1">Ordering as</p>
                        <p className="text-sm font-semibold text-[#F3F4F6] mb-4">{user?.name}</p>

                        <Button
                            onClick={handleCheckout}
                            disabled={checking || !paymentMethod}
                            className="w-full bg-[#C89B5A] hover:bg-[#D8B178] text-[#07111B] font-semibold rounded-xl h-11 disabled:opacity-40"
                        >
                            {checking ? (
                                <div className="w-4 h-4 border-2 border-[#07111B]/30 border-t-[#07111B] rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Check className="w-4 h-4 mr-2" />
                                    Place Order — {formatCurrency(total())}
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
            <Toaster theme="dark" toastOptions={{ style: { background: "#111827", border: "1px solid #1f2d3d", color: "#F3F4F6" } }} />
        </main>
    );
}