import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string;
}

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (productId: string) => void;
    updateQty: (productId: string, qty: number) => void;
    clearCart: () => void;
    total: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) => {
                const existing = get().items.find((i) => i.productId === item.productId);
                if (existing) {
                    set({
                        items: get().items.map((i) =>
                            i.productId === item.productId
                                ? { ...i, quantity: i.quantity + 1 }
                                : i
                        ),
                    });
                } else {
                    set({ items: [...get().items, { ...item, quantity: 1 }] });
                }
            },

            removeItem: (productId) => {
                set({ items: get().items.filter((i) => i.productId !== productId) });
            },

            updateQty: (productId, qty) => {
                if (qty <= 0) {
                    get().removeItem(productId);
                    return;
                }
                set({
                    items: get().items.map((i) =>
                        i.productId === productId ? { ...i, quantity: qty } : i
                    ),
                });
            },

            clearCart: () => set({ items: [] }),

            total: () =>
                get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),
        }),
        { name: 'zenqor-cart' }
    )
);