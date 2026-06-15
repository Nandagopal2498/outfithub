import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X, Truck, Tag, ChevronDown, ChevronUp, Sparkles, Package } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({
    meta: [
      { title: "Cart — VANTAGE" },
      { name: "description", content: "Review the items in your VANTAGE bag." },
    ],
  }),
});

const FREE_SHIPPING_THRESHOLD = 150;

function getEstimatedDelivery(): string {
  const now = new Date();
  const min = new Date(now);
  const max = new Date(now);
  // Skip weekends for business days
  let daysAdded = 0;
  while (daysAdded < 3) {
    min.setDate(min.getDate() + 1);
    if (min.getDay() !== 0 && min.getDay() !== 6) daysAdded++;
  }
  daysAdded = 0;
  while (daysAdded < 5) {
    max.setDate(max.getDate() + 1);
    if (max.getDay() !== 0 && max.getDay() !== 6) daysAdded++;
  }
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${fmt(min)} – ${fmt(max)}`;
}

function ShippingProgressBar({ subtotal }: { subtotal: number }) {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const qualified = remaining <= 0;

  return (
    <div className="mb-8 p-4 bg-surface border border-border">
      <div className="flex items-center gap-2 mb-3">
        <Truck className="size-4 shrink-0" strokeWidth={1.75} />
        {qualified ? (
          <p className="text-[11px] font-bold uppercase tracking-wider text-green-700">
            <Sparkles className="size-3 inline mr-1 -mt-0.5" />
            Free express shipping unlocked!
          </p>
        ) : (
          <p className="text-[11px] font-semibold text-muted-foreground">
            Add <span className="font-bold text-foreground">${remaining.toFixed(0)}</span> more for free express shipping
          </p>
        )}
      </div>
      <div className="h-2 bg-border/50 overflow-hidden">
        <div
          className={`h-full transition-all duration-700 ease-out ${
            qualified ? "bg-green-600 shipping-bar-shimmer" : "bg-foreground"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function PromoCodeSection() {
  const { promoCode, promoLabel, promoError, applyPromo, removePromo } = useCart();
  const [input, setInput] = useState("");
  const [expanded, setExpanded] = useState(!!promoCode);

  const handleApply = () => {
    if (input.trim()) {
      applyPromo(input.trim());
    }
  };

  return (
    <div className="pb-6 border-b border-border">
      {promoCode ? (
        <div className="flex items-center justify-between bg-green-50 border border-green-200 px-4 py-3">
          <div className="flex items-center gap-2">
            <Tag className="size-3.5 text-green-700" />
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
            <X className="size-3.5" />
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider w-full"
          >
            <Tag className="size-3.5" />
            Have a promo code?
            {expanded ? <ChevronUp className="size-3 ml-auto" /> : <ChevronDown className="size-3 ml-auto" />}
          </button>
          {expanded && (
            <div className="mt-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleApply();
                  }}
                  placeholder="Enter code"
                  className="flex-1 border border-border bg-background px-3 py-3 text-sm font-semibold uppercase tracking-wider focus:outline-none focus:border-foreground transition-colors"
                />
                <button
                  onClick={handleApply}
                  disabled={!input.trim()}
                  className="bg-foreground text-background px-5 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-foreground/90 disabled:opacity-40 transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoError && (
                <p className="text-[11px] text-destructive font-semibold mt-2">{promoError}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CartPage() {
  const { items, subtotal, shipping, discount, total, promoCode, setQty, remove } = useCart();

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-12 md:py-20">
      <div className="mb-12">
        <p className="label-eyebrow text-muted-foreground mb-3">Your Bag</p>
        <h1 className="text-4xl md:text-6xl text-display">Cart</h1>
        <div className="w-12 h-1 bg-foreground mt-5" />
      </div>

      {items.length === 0 ? (
        <div className="py-24 text-center border-t border-border">
          <p className="text-sm text-muted-foreground mb-8">Your bag is empty.</p>
          <Link
            to="/shop"
            className="inline-block bg-foreground text-background px-10 py-4 text-[11px] font-bold uppercase tracking-widest"
          >
            Browse The Collection
          </Link>
        </div>
      ) : (
        <>
          <ShippingProgressBar subtotal={subtotal} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-8">
              <div className="border-t border-border">
                {items.map((item) => {
                  const product = getProduct(item.id);
                  if (!product) return null;
                  return (
                    <div
                      key={`${item.id}-${item.size}-${item.variant}`}
                      className="flex gap-4 md:gap-6 py-6 border-b border-border animate-slide-item-in"
                    >
                      <Link
                        to="/product/$id"
                        params={{ id: product.id }}
                        search={{ color: item.variant, size: item.size }}
                        className="w-24 md:w-32 aspect-[3/4] bg-surface overflow-hidden shrink-0"
                      >
                        <img
                          src={
                            product.variants.find((v) => v.name === item.variant)?.image ??
                            product.image
                          }
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start gap-3 mb-2">
                          <div>
                            <h3 className="text-sm font-bold uppercase tracking-tight">
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1.5">
                              <span
                                className="inline-block w-3 h-3 rounded-full border border-border"
                                style={{
                                  backgroundColor:
                                    product.variants.find((v) => v.name === item.variant)?.swatch ??
                                    "transparent",
                                }}
                              />
                              <span className="text-xs text-muted-foreground">
                                {item.variant} · Size {item.size}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => remove(item.id, item.size, item.variant)}
                            aria-label="Remove"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <X className="size-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between gap-3">
                          <QuantityStepper
                            value={item.qty}
                            onChange={(qty) => setQty(item.id, item.size, qty, item.variant)}
                            min={1}
                            max={10}
                          />
                          <span className="text-sm font-bold">
                            ${(product.price * item.qty).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="bg-surface p-6 md:p-8 lg:sticky lg:top-28">
                <h2 className="label-eyebrow mb-6">Order Summary</h2>

                <PromoCodeSection />

                <div className="space-y-3 text-sm py-6 border-b border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-700">
                      <span className="flex items-center gap-1.5">
                        <Tag className="size-3" />
                        Discount ({promoCode})
                      </span>
                      <span className="font-semibold">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-base font-bold py-6 border-b border-border">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {/* Estimated delivery */}
                <div className="flex items-center gap-2.5 py-4 border-b border-border">
                  <Package className="size-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Estimated Delivery
                    </p>
                    <p className="text-xs font-semibold mt-0.5">{getEstimatedDelivery()}</p>
                  </div>
                </div>

                <div className="pt-6 space-y-3">
                  <Link
                    to="/checkout"
                    className="block text-center bg-foreground text-background py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-foreground/90 transition-colors"
                  >
                    Proceed to Checkout
                  </Link>
                  <Link
                    to="/shop"
                    className="block text-center py-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </>
      )}
    </div>
  );
}

function QuantityStepper({
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
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(String(value));

  const commit = (raw: string) => {
    const n = parseInt(raw, 10);
    if (!Number.isNaN(n)) {
      onChange(Math.max(min, Math.min(max, n)));
    }
    setEditing(false);
  };

  return (
    <div className="flex items-center border border-border overflow-hidden">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="p-2.5 hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus className="size-3" />
      </button>
      {editing ? (
        <input
          type="number"
          min={min}
          max={max}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => commit(inputValue)}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit(inputValue);
            if (e.key === "Escape") setEditing(false);
          }}
          className="w-10 text-center text-xs font-bold tabular-nums bg-transparent focus:outline-none appearance-none [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          autoFocus
        />
      ) : (
        <button
          onClick={() => {
            setInputValue(String(value));
            setEditing(true);
          }}
          className="w-10 text-center text-xs font-bold tabular-nums select-none hover:bg-surface transition-colors py-2.5"
          aria-label={`Current quantity is ${value}. Click to edit.`}
        >
          {value}
        </button>
      )}
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="p-2.5 hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Increase quantity"
      >
        <Plus className="size-3" />
      </button>
    </div>
  );
}
