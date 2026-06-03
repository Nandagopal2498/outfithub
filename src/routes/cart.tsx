import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
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

function CartPage() {
  const { items, subtotal, setQty, remove } = useCart();
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 12;
  const total = subtotal + shipping;

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-8">
            <div className="border-t border-border">
              {items.map((item) => {
                const product = getProduct(item.id);
                if (!product) return null;
                return (
                  <div
                    key={`${item.id}-${item.size}-${item.variant}`}
                    className="flex gap-4 md:gap-6 py-6 border-b border-border"
                  >
                    <Link
                      to="/product/$id"
                      params={{ id: product.id }}
                      className="w-24 md:w-32 aspect-[3/4] bg-surface overflow-hidden shrink-0"
                    >
                      <img
                        src={product.variants.find((v) => v.name === item.variant)?.image ?? product.image}
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
                                  product.variants.find((v) => v.name === item.variant)?.swatch ?? "transparent",
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
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => setQty(item.id, item.size, item.qty - 1, item.variant)}
                            className="p-2 hover:bg-surface"
                            aria-label="Decrease"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-10 text-center text-xs font-bold">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => setQty(item.id, item.size, item.qty + 1, item.variant)}
                            className="p-2 hover:bg-surface"
                            aria-label="Increase"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
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
              <div className="space-y-3 text-sm pb-6 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-base font-bold py-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link
                to="/checkout"
                className="block text-center bg-foreground text-background py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-foreground/90 transition-colors"
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/shop"
                className="block text-center mt-3 py-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground"
              >
                Continue Shopping
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
