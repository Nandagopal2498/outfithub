import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct } from "./products";

export interface CartItem {
  id: string;
  qty: number;
  size: string;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (id: string, size: string, qty?: number) => void;
  setQty: (id: string, size: string, qty: number) => void;
  remove: (id: string, size: string) => void;
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
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const add: CartContextValue["add"] = (id, size, qty = 1) => {
    setItems((cur) => {
      const existing = cur.find((i) => i.id === id && i.size === size);
      if (existing) {
        return cur.map((i) =>
          i.id === id && i.size === size ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [...cur, { id, size, qty }];
    });
  };

  const setQty: CartContextValue["setQty"] = (id, size, qty) => {
    setItems((cur) =>
      qty <= 0
        ? cur.filter((i) => !(i.id === id && i.size === size))
        : cur.map((i) => (i.id === id && i.size === size ? { ...i, qty } : i)),
    );
  };

  const remove: CartContextValue["remove"] = (id, size) =>
    setItems((cur) => cur.filter((i) => !(i.id === id && i.size === size)));

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
