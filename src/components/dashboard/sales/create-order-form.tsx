"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useProducts } from "@/hooks/use-products";
import { useCustomers } from "@/hooks/use-customers";
import { useCreateOrder } from "@/hooks/use-orders";
import { formatCurrency } from "@/lib/utils";
import {
    Plus, Minus, Trash2, ShoppingCart,
    User, Package, CreditCard, FileText,
    ChevronRight, ChevronLeft, Check,
} from "lucide-react";

interface OrderItem {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
}

interface CreateOrderFormProps {
    open: boolean;
    onClose: () => void;
}

const STEPS = [
    { id: 1, label: "Customer", icon: User },
    { id: 2, label: "Products", icon: Package },
    { id: 3, label: "Payment", icon: CreditCard },
    { id: 4, label: "Review", icon: FileText },
];

const PAYMENT_METHODS = [
    { value: "card", label: "Credit Card", icon: "💳" },
    { value: "transfer", label: "Bank Transfer", icon: "🏦" },
    { value: "cash", label: "Cash", icon: "💵" },
    { value: "crypto", label: "Crypto", icon: "₿" },
];

export function CreateOrderForm({ open, onClose }: CreateOrderFormProps) {
    const [step, setStep] = useState(1);
    const [selectedCustomer, setSelectedCustomer] = useState<string>("");
    const [items, setItems] = useState<OrderItem[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const [notes, setNotes] = useState<string>("");
    const [selectedProduct, setSelectedProduct] = useState<string>("");

    const { data: products } = useProducts();
    const { data: customers } = useCustomers();
    const createOrder = useCreateOrder();

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const resetForm = () => {
        setStep(1);
        setSelectedCustomer("");
        setItems([]);
        setPaymentMethod("");
        setNotes("");
        setSelectedProduct("");
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const addProduct = () => {
        if (!selectedProduct) return;
        const product = products?.find((p) => p.id === selectedProduct);
        if (!product) return;

        const existing = items.find((i) => i.productId === selectedProduct);
        if (existing) {
            setItems(items.map((i) =>
                i.productId === selectedProduct
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
            ));
        } else {
            setItems([...items, {
                productId: product.id,
                productName: product.name,
                price: Number(product.price),
                quantity: 1,
            }]);
        }
        setSelectedProduct("");
    };

    const updateQty = (productId: string, delta: number) => {
        setItems(items
            .map((i) => i.productId === productId ? { ...i, quantity: i.quantity + delta } : i)
            .filter((i) => i.quantity > 0)
        );
    };

    const removeItem = (productId: string) => {
        setItems(items.filter((i) => i.productId !== productId));
    };

    const handleSubmit = async () => {
        await createOrder.mutateAsync({
            items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
            notes: notes || undefined,
        });
        handleClose();
    };

    const canNext = () => {
        if (step === 1) return !!selectedCustomer;
        if (step === 2) return items.length > 0;
        if (step === 3) return !!paymentMethod;
        return true;
    };

    const customer = customers?.find((c) => c.id === selectedCustomer);

    return (
        <Sheet open={open} onOpenChange={handleClose}>
            <SheetContent className="bg-[#111827] border-[#1f2d3d] text-[#F3F4F6] w-full sm:max-w-lg flex flex-col">
                <SheetHeader className="mb-6">
                    <SheetTitle className="text-[#F3F4F6]">New Order</SheetTitle>
                    <SheetDescription className="text-[#9CA3AF]">
                        Create a new sales order
                    </SheetDescription>
                </SheetHeader>

                {/* Steps indicator */}
                <div className="flex items-center gap-2 mb-6">
                    {STEPS.map((s, i) => (
                        <div key={s.id} className="flex items-center gap-2 flex-1">
                            <div className={`flex items-center gap-2 ${i < STEPS.length - 1 ? "flex-1" : ""}`}>
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 shrink-0 ${step > s.id
                                        ? "bg-[#C89B5A] text-[#07111B]"
                                        : step === s.id
                                            ? "bg-[#C89B5A]/20 text-[#C89B5A] border border-[#C89B5A]/40"
                                            : "bg-[#1f2d3d] text-[#6B7280]"
                                    }`}>
                                    {step > s.id ? <Check className="w-3.5 h-3.5" /> : s.id}
                                </div>
                                <span className={`text-xs hidden sm:block transition-colors ${step >= s.id ? "text-[#F3F4F6]" : "text-[#6B7280]"
                                    }`}>
                                    {s.label}
                                </span>
                            </div>
                            {i < STEPS.length - 1 && (
                                <div className={`flex-1 h-px transition-colors duration-300 ${step > s.id ? "bg-[#C89B5A]/40" : "bg-[#1f2d3d]"
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step content */}
                <div className="flex-1 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-4"
                        >
                            {/* Step 1 — Customer */}
                            {step === 1 && (
                                <div className="space-y-4">
                                    <div>
                                        <Label className="text-sm text-[#9CA3AF] mb-2 block">
                                            Select Customer
                                        </Label>
                                        <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                                            <SelectTrigger className="bg-[#07111B] border-[#1f2d3d] text-[#F3F4F6] h-11 rounded-xl focus:border-[#C89B5A]/50">
                                                <SelectValue placeholder="Choose a customer..." />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#111827] border-[#1f2d3d]">
                                                {customers?.map((c) => (
                                                    <SelectItem
                                                        key={c.id}
                                                        value={c.id}
                                                        className="text-[#F3F4F6] focus:bg-[#1f2d3d]"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded-full bg-[#C89B5A]/20 flex items-center justify-center text-xs text-[#C89B5A] font-semibold">
                                                                {c.name[0]}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm">{c.name}</p>
                                                                <p className="text-xs text-[#9CA3AF]">{c.email}</p>
                                                            </div>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Customer preview */}
                                    {customer && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-[#07111B] border border-[#C89B5A]/20 rounded-xl p-4"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-[#C89B5A]/20 flex items-center justify-center text-[#C89B5A] font-semibold">
                                                    {customer.name[0]}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-[#F3F4F6]">{customer.name}</p>
                                                    <p className="text-xs text-[#9CA3AF]">{customer.email}</p>
                                                    {customer.company && (
                                                        <p className="text-xs text-[#6B7280]">{customer.company}</p>
                                                    )}
                                                </div>
                                                <Badge className="ml-auto bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs">
                                                    {customer._count.orders} orders
                                                </Badge>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            )}

                            {/* Step 2 — Products */}
                            {step === 2 && (
                                <div className="space-y-4">
                                    <div className="flex gap-2">
                                        <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                                            <SelectTrigger className="bg-[#07111B] border-[#1f2d3d] text-[#F3F4F6] h-10 rounded-xl flex-1 focus:border-[#C89B5A]/50">
                                                <SelectValue placeholder="Select product..." />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#111827] border-[#1f2d3d]">
                                                {products?.filter((p) => p.isActive).map((p) => (
                                                    <SelectItem
                                                        key={p.id}
                                                        value={p.id}
                                                        className="text-[#F3F4F6] focus:bg-[#1f2d3d]"
                                                    >
                                                        <div className="flex items-center justify-between w-full gap-4">
                                                            <span>{p.name}</span>
                                                            <span className="text-[#C89B5A] font-semibold">
                                                                {formatCurrency(Number(p.price))}
                                                            </span>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            onClick={addProduct}
                                            disabled={!selectedProduct}
                                            className="bg-[#C89B5A] hover:bg-[#D8B178] text-[#07111B] font-semibold h-10 px-4 rounded-xl shrink-0"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    {/* Items list */}
                                    {items.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-12 border border-dashed border-[#1f2d3d] rounded-xl">
                                            <ShoppingCart className="w-8 h-8 text-[#6B7280] mb-2" />
                                            <p className="text-sm text-[#9CA3AF]">No products added yet</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {items.map((item) => (
                                                <motion.div
                                                    key={item.productId}
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="flex items-center gap-3 bg-[#07111B] border border-[#1f2d3d] rounded-xl p-3"
                                                >
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-[#F3F4F6] truncate">
                                                            {item.productName}
                                                        </p>
                                                        <p className="text-xs text-[#9CA3AF]">
                                                            {formatCurrency(item.price)} each
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-2 shrink-0">
                                                        <button
                                                            onClick={() => updateQty(item.productId, -1)}
                                                            className="w-6 h-6 rounded-lg bg-[#1f2d3d] flex items-center justify-center text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="text-sm font-semibold text-[#F3F4F6] w-6 text-center">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQty(item.productId, 1)}
                                                            className="w-6 h-6 rounded-lg bg-[#1f2d3d] flex items-center justify-center text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>

                                                    <p className="text-sm font-semibold text-[#C89B5A] w-20 text-right shrink-0">
                                                        {formatCurrency(item.price * item.quantity)}
                                                    </p>

                                                    <button
                                                        onClick={() => removeItem(item.productId)}
                                                        className="text-[#6B7280] hover:text-red-400 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </motion.div>
                                            ))}

                                            <div className="flex items-center justify-between pt-2 border-t border-[#1f2d3d]">
                                                <span className="text-sm text-[#9CA3AF]">Subtotal</span>
                                                <span className="text-lg font-semibold text-[#F3F4F6]">
                                                    {formatCurrency(total)}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Step 3 — Payment */}
                            {step === 3 && (
                                <div className="space-y-4">
                                    <Label className="text-sm text-[#9CA3AF] block mb-2">
                                        Payment Method
                                    </Label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {PAYMENT_METHODS.map((method) => (
                                            <button
                                                key={method.value}
                                                onClick={() => setPaymentMethod(method.value)}
                                                className={`p-4 rounded-xl border text-left transition-all duration-200 ${paymentMethod === method.value
                                                        ? "border-[#C89B5A]/40 bg-[#C89B5A]/5"
                                                        : "border-[#1f2d3d] hover:border-[#C89B5A]/20 bg-[#07111B]"
                                                    }`}
                                            >
                                                <span className="text-2xl block mb-2">{method.icon}</span>
                                                <span className="text-sm font-medium text-[#F3F4F6]">
                                                    {method.label}
                                                </span>
                                                {paymentMethod === method.value && (
                                                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#C89B5A]" />
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="space-y-2 mt-4">
                                        <Label className="text-sm text-[#9CA3AF]">Notes (optional)</Label>
                                        <textarea
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            placeholder="Add any notes for this order..."
                                            rows={3}
                                            className="w-full bg-[#07111B] border border-[#1f2d3d] text-[#F3F4F6] placeholder:text-[#6B7280] rounded-xl p-3 text-sm resize-none focus:outline-none focus:border-[#C89B5A]/50"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Step 4 — Review */}
                            {step === 4 && (
                                <div className="space-y-4">
                                    {/* Customer */}
                                    <div className="bg-[#07111B] border border-[#1f2d3d] rounded-xl p-4">
                                        <p className="text-xs text-[#6B7280] mb-2 uppercase tracking-wider">Customer</p>
                                        <p className="text-sm font-semibold text-[#F3F4F6]">{customer?.name}</p>
                                        <p className="text-xs text-[#9CA3AF]">{customer?.email}</p>
                                    </div>

                                    {/* Items */}
                                    <div className="bg-[#07111B] border border-[#1f2d3d] rounded-xl p-4">
                                        <p className="text-xs text-[#6B7280] mb-3 uppercase tracking-wider">
                                            Items ({items.length})
                                        </p>
                                        <div className="space-y-2">
                                            {items.map((item) => (
                                                <div key={item.productId} className="flex justify-between text-sm">
                                                    <span className="text-[#9CA3AF]">
                                                        {item.productName} × {item.quantity}
                                                    </span>
                                                    <span className="text-[#F3F4F6] font-medium">
                                                        {formatCurrency(item.price * item.quantity)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Payment */}
                                    <div className="bg-[#07111B] border border-[#1f2d3d] rounded-xl p-4">
                                        <p className="text-xs text-[#6B7280] mb-2 uppercase tracking-wider">Payment</p>
                                        <p className="text-sm font-medium text-[#F3F4F6] capitalize">
                                            {PAYMENT_METHODS.find((m) => m.value === paymentMethod)?.icon}{" "}
                                            {PAYMENT_METHODS.find((m) => m.value === paymentMethod)?.label}
                                        </p>
                                        {notes && <p className="text-xs text-[#9CA3AF] mt-1">{notes}</p>}
                                    </div>

                                    {/* Total */}
                                    <div className="bg-[#C89B5A]/5 border border-[#C89B5A]/20 rounded-xl p-4 flex items-center justify-between">
                                        <span className="text-sm font-medium text-[#F3F4F6]">Total Amount</span>
                                        <span className="text-xl font-bold text-[#C89B5A]">
                                            {formatCurrency(total)}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation buttons */}
                <div className="flex gap-3 pt-4 border-t border-[#1f2d3d] mt-4">
                    {step > 1 && (
                        <Button
                            variant="outline"
                            onClick={() => setStep(step - 1)}
                            className="flex-1 border-[#1f2d3d] text-[#9CA3AF] hover:text-[#F3F4F6] bg-transparent rounded-xl"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back
                        </Button>
                    )}

                    {step < 4 ? (
                        <Button
                            onClick={() => setStep(step + 1)}
                            disabled={!canNext()}
                            className="flex-1 bg-[#C89B5A] hover:bg-[#D8B178] text-[#07111B] font-semibold rounded-xl disabled:opacity-40"
                        >
                            Next
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleSubmit}
                            disabled={createOrder.isPending}
                            className="flex-1 bg-[#C89B5A] hover:bg-[#D8B178] text-[#07111B] font-semibold rounded-xl"
                        >
                            {createOrder.isPending ? (
                                <div className="w-4 h-4 border-2 border-[#07111B]/30 border-t-[#07111B] rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Check className="w-4 h-4 mr-1.5" />
                                    Confirm Order
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}