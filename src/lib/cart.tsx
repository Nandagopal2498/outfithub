import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct } from "./products";

export interface CartItem {
  id: string;
  qty: number;
  size: string;
  variant: string;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (id: string, size: string, qty?: number, variant?: string) => void;
  setQty: (id: string, size: string, qty: number, variant: string) => void;
  remove: (id: string, size: string, variant: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "vantage_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: CartItem[] = JSON.parse(raw);
        setItems(
          parsed.map((item) => ({
            ...item,
            variant: item.variant ?? getProduct(item.id)?.color ?? "Unknown",
          })),
        );
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const add: CartContextValue["add"] = (id, size, qty = 1, variant) => {
    const color = variant ?? getProduct(id)?.color ?? "Unknown";
    setItems((cur) => {
      const existing = cur.find(
        (i) => i.id === id && i.size === size && i.variant === color,
      );
      if (existing) {
        return cur.map((i) =>
          i.id === id && i.size === size && i.variant === color
            ? { ...i, qty: i.qty + qty }
            : i,
        );
      }
      return [...cur, { id, size, qty, variant: color }];
    });
  };

  const setQty: CartContextValue["setQty"] = (id, size, qty, variant) => {
    setItems((cur) =>
      qty <= 0
        ? cur.filter(
            (i) => !(i.id === id && i.size === size && i.variant === variant),
          )
        : cur.map((i) =>
            i.id === id && i.size === size && i.variant === variant
              ? { ...i, qty }
              : i,
          ),
    );
  };

  const remove: CartContextValue["remove"] = (id, size, variant) =>
    setItems((cur) =>
      cur.filter(
        (i) => !(i.id === id && i.size === size && i.variant === variant),
      ),
    );

  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => {
    const p = getProduct(i.id);
    return s + (p?.price ?? 0) * i.qty;
  }, 0);

  return (
    <CartContext.Provider value={{ items, count, subtotal, add, setQty, remove, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
