import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, X, ShoppingBag, Truck, Tag, ChevronRight, Sparkles } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";

const FREE_SHIPPING_THRESHOLD = 150;

function ShippingProgress({ subtotal }: { subtotal: number }) {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const qualified = remaining <= 0;

  return (
    <div className="px-5 py-3 bg-surface/60">
      <div className="flex items-center gap-2 mb-2">
        <Truck className="size-3.5 shrink-0" strokeWidth={1.75} />
        {qualified ? (
          <p className="text-[11px] font-bold uppercase tracking-wider text-green-700">
            <Sparkles className="size-3 inline mr-1 -mt-0.5" />
            You've unlocked free shipping!
          </p>
        ) : (
          <p className="text-[11px] font-semibold text-muted-foreground">
            <span className="font-bold text-foreground">${remaining.toFixed(0)}</span> away from free shipping
          </p>
        )}
      </div>
      <div className="h-1.5 bg-border/60 overflow-hidden relative">
        <div
          className={`h-full transition-all duration-700 ease-out ${
            qualified
              ? "bg-green-600 shipping-bar-shimmer"
              : "bg-foreground"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function DrawerQuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
}: {
  value: number;
  onChange: (qty: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center border border-border overflow-hidden">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="p-1.5 hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus className="size-2.5" />
      </button>
      <span className="w-7 text-center text-[11px] font-bold tabular-nums select-none">
        {value}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="p-1.5 hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Increase quantity"
      >
        <Plus className="size-2.5" />
      </button>
    </div>
  );
}

function PromoCodeInput() {
  const { promoCode, promoLabel, promoError, applyPromo, removePromo } = useCart();
  const [input, setInput] = useState("");
  const [expanded, setExpanded] = useState(!!promoCode);

  const handleApply = () => {
    if (input.trim()) {
      applyPromo(input.trim());
    }
  };

  if (promoCode) {
    return (
      <div className="flex items-center justify-between bg-green-50 border border-green-200 px-3 py-2">
        <div className="flex items-center gap-2">
          <Tag className="size-3 text-green-700" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-green-800">
            {promoCode}
          </span>
          <span className="text-[10px] text-green-600 font-semibold">
            — {promoLabel}
          </span>
        </div>
        <button
          onClick={removePromo}
          className="text-green-700 hover:text-green-900 transition-colors"
          aria-label="Remove promo code"
        >
          <X className="size-3" />
        </button>
      </div>
    );
  }

  return (
    <div>
      {!expanded ? (
        <button
          onClick={() => setExpanded(true)}
          className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
        >
          <Tag className="size-3" />
          Add promo code
          <ChevronRight className="size-3" />
        </button>
      ) : (
        <div>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleApply();
              }}
              placeholder="Enter code"
              className="flex-1 border border-border bg-background px-3 py-2 text-[11px] font-semibold uppercase tracking-wider focus:outline-none focus:border-foreground transition-colors"
            />
            <button
              onClick={handleApply}
              disabled={!input.trim()}
              className="bg-foreground text-background px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-foreground/90 disabled:opacity-40 transition-colors"
            >
              Apply
            </button>
          </div>
          {promoError && (
            <p className="text-[10px] text-destructive font-semibold mt-1.5">{promoError}</p>
          )}
        </div>
      )}
    </div>
  );
}

export function CartDrawer() {
  const {
    items, count, subtotal, shipping, discount, total,
    promoCode, isDrawerOpen, closeDrawer,
    setQty, remove, lastAddedKey,
  } = useCart();

  return (
    <Sheet open={isDrawerOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <SheetContent
        side="right"
        className="flex flex-col w-full sm:max-w-md p-0 gap-0"
      >
        <SheetHeader className="px-5 py-5 border-b border-border text-left space-y-0">
          <SheetTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            <ShoppingBag className="size-4" strokeWidth={1.75} />
            Your Bag
            <span className="text-muted-foreground font-semibold">
              ({count} {count === 1 ? "item" : "items"})
            </span>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Review and manage items in your shopping bag
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center mb-6">
              <ShoppingBag className="size-8 text-muted-foreground" strokeWidth={1.25} />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest mb-2">Your bag is empty</p>
            <p className="text-xs text-muted-foreground mb-8 max-w-[200px]">
              Looks like you haven't added anything yet.
            </p>
            <Link
              to="/shop"
              onClick={() => closeDrawer()}
              className="bg-foreground text-background px-8 py-3.5 text-[10px] font-bold uppercase tracking-widest hover:bg-foreground/90 transition-colors"
            >
              Browse Collection
            </Link>
          </div>
        ) : (
          <>
            {/* Shipping progress */}
            <ShippingProgress subtotal={subtotal} />

            {/* Items list */}
            <div className="flex-1 overflow-y-auto">
              <div className="divide-y divide-border">
                {items.map((item) => {
                  const product = getProduct(item.id);
                  if (!product) return null;
                  const itemKey = `${item.id}-${item.size}-${item.variant}`;
                  const isHighlighted = lastAddedKey === itemKey;
                  const variantData = product.variants.find((v) => v.name === item.variant);

                  return (
                    <div
                      key={itemKey}
                      className={`flex gap-3 px-5 py-4 animate-slide-item-in ${
                        isHighlighted ? "cart-item-highlight" : ""
                      }`}
                    >
                      <Link
                        to="/product/$id"
                        params={{ id: product.id }}
                        search={{ color: item.variant, size: item.size }}
                        onClick={() => closeDrawer()}
                        className="w-20 aspect-[3/4] bg-surface overflow-hidden shrink-0"
                      >
                        <img
                          src={variantData?.image ?? product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      <div className="flex-1 flex flex-col min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0">
                            <h3 className="text-[11px] font-bold uppercase tracking-tight truncate">
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span
                                className="inline-block w-2.5 h-2.5 rounded-full border border-border"
                                style={{
                                  backgroundColor: variantData?.swatch ?? "transparent",
                                }}
                              />
                              <span className="text-[10px] text-muted-foreground">
                                {item.variant} · {item.size}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => remove(item.id, item.size, item.variant)}
                            aria-label="Remove"
                            className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
                          >
                            <X className="size-3.5" />
                          </button>
                        </div>
                        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
                          <DrawerQuantityStepper
                            value={item.qty}
                            onChange={(qty) => setQty(item.id, item.size, qty, item.variant)}
                            min={1}
                            max={10}
                          />
                          <span className="text-[11px] font-bold tabular-nums">
                            ${(product.price * item.qty).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Promo + Summary + CTA */}
            <div className="border-t border-border shrink-0">
              <div className="px-5 py-4 space-y-3">
                <PromoCodeInput />

                <div className="space-y-1.5 text-[12px]">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold tabular-nums">${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-700">
                      <span>Discount ({promoCode})</span>
                      <span className="font-semibold tabular-nums">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold tabular-nums">
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-sm font-bold pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="px-5 pb-5 space-y-2">
                <Link
                  to="/checkout"
                  onClick={() => closeDrawer()}
                  className="block text-center bg-foreground text-background py-3.5 text-[11px] font-bold uppercase tracking-widest hover:bg-foreground/90 transition-colors"
                >
                  Checkout · ${total.toFixed(2)}
                </Link>
                <Link
                  to="/cart"
                  onClick={() => closeDrawer()}
                  className="block text-center py-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  View Full Cart
                </Link>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
