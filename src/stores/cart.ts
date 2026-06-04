import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  slug: string;
  name: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  updateQuantity: (slug: string, size: string, quantity: number) => void;
  removeItem: (slug: string, size: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.slug === item.slug && i.size === item.size,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.slug === item.slug && i.size === item.size
                  ? { ...i, quantity: i.quantity + 1 }
                  : i,
              ),
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { ...item, quantity: 1 }],
            isOpen: true,
          };
        }),
      updateQuantity: (slug, size, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter(
                  (i) => !(i.slug === slug && i.size === size),
                )
              : state.items.map((i) =>
                  i.slug === slug && i.size === size
                    ? { ...i, quantity }
                    : i,
                ),
        })),
      removeItem: (slug, size) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.slug === slug && i.size === size),
          ),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "scorsatto-cart" },
  ),
);

export const selectCartCount = (s: { items: CartItem[] }) =>
  s.items.reduce((sum, i) => sum + i.quantity, 0);

export const selectCartSubtotal = (s: { items: CartItem[] }) =>
  s.items.reduce((sum, i) => sum + i.quantity * i.price, 0);