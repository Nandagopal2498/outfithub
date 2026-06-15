import { createContext, useContext, useEffect, useState, useCallback, useMemo, type ReactNode } from "react";
import { getProduct } from "./products";

export interface CartItem {
  id: string;
  qty: number;
  size: string;
  variant: string;
}

const PROMO_CODES: Record<string, { type: "percent" | "freeShipping"; value: number; label: string }> = {
  VANTAGE10: { type: "percent", value: 10, label: "10% Off" },
  WELCOME15: { type: "percent", value: 15, label: "15% Off" },
  FREESHIP: { type: "freeShipping", value: 0, label: "Free Shipping" },
};

const FREE_SHIPPING_THRESHOLD = 150;
const FLAT_SHIPPING = 12;

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  promoCode: string | null;
  promoLabel: string | null;
  promoError: string | null;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  add: (id: string, size: string, qty?: number, variant?: string) => void;
  setQty: (id: string, size: string, qty: number, variant: string) => void;
  remove: (id: string, size: string, variant: string) => void;
  clear: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  lastAddedKey: string | null;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "vantage_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lastAddedKey, setLastAddedKey] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

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

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const add: CartContextValue["add"] = useCallback((id, size, qty = 1, variant) => {
    const color = variant ?? getProduct(id)?.color ?? "Unknown";
    const key = `${id}-${size}-${color}`;
    setItems((cur) => {
      const existing = cur.find((i) => i.id === id && i.size === size && i.variant === color);
      if (existing) {
        return cur.map((i) =>
          i.id === id && i.size === size && i.variant === color ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [...cur, { id, size, qty, variant: color }];
    });
    setLastAddedKey(key);
    setIsDrawerOpen(true);
    // Clear the highlight after animation
    setTimeout(() => setLastAddedKey(null), 2000);
  }, []);

  const setQty: CartContextValue["setQty"] = useCallback((id, size, qty, variant) => {
    setItems((cur) =>
      qty <= 0
        ? cur.filter((i) => !(i.id === id && i.size === size && i.variant === variant))
        : cur.map((i) =>
            i.id === id && i.size === size && i.variant === variant ? { ...i, qty } : i,
          ),
    );
  }, []);

  const remove: CartContextValue["remove"] = useCallback((id, size, variant) =>
    setItems((cur) =>
      cur.filter((i) => !(i.id === id && i.size === size && i.variant === variant)),
    ), []);

  const clear = useCallback(() => {
    setItems([]);
    setPromoCode(null);
    setPromoError(null);
  }, []);

  const applyPromo = useCallback((code: string): boolean => {
    const upper = code.trim().toUpperCase();
    const promo = PROMO_CODES[upper];
    if (!promo) {
      setPromoError("Invalid promo code");
      setPromoCode(null);
      return false;
    }
    setPromoCode(upper);
    setPromoError(null);
    return true;
  }, []);

  const removePromo = useCallback(() => {
    setPromoCode(null);
    setPromoError(null);
  }, []);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => {
    const p = getProduct(i.id);
    return s + (p?.price ?? 0) * i.qty;
  }, 0);

  const { shipping, discount, total, promoLabel } = useMemo(() => {
    const promo = promoCode ? PROMO_CODES[promoCode] : null;
    let disc = 0;
    let ship = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : FLAT_SHIPPING;

    if (promo) {
      if (promo.type === "percent") {
        disc = +(subtotal * (promo.value / 100)).toFixed(2);
      } else if (promo.type === "freeShipping") {
        ship = 0;
      }
    }

    return {
      shipping: ship,
      discount: disc,
      total: +(subtotal - disc + ship).toFixed(2),
      promoLabel: promo?.label ?? null,
    };
  }, [subtotal, promoCode]);

  return (
    <CartContext.Provider
      value={{
        items, count, subtotal, shipping, discount, total,
        promoCode, promoLabel, promoError, applyPromo, removePromo,
        add, setQty, remove, clear,
        isDrawerOpen, openDrawer, closeDrawer, lastAddedKey,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
