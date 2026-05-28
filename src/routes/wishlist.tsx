import { createFileRoute, Link } from "@tanstack/react-router";
import { useWishlist } from "@/lib/wishlist";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — VANTAGE" },
      { name: "description", content: "Your saved pieces from the VANTAGE collection." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { ids, clear } = useWishlist();
  const items = products.filter((p) => ids.includes(p.id));

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Saved For Later
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold italic uppercase tracking-tighter">
            Wishlist
          </h1>
        </div>
        {items.length > 0 && (
          <button
            onClick={clear}
            className="text-[11px] font-semibold uppercase tracking-widest hover:opacity-50"
          >
            Clear All
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-24 border border-border">
          <Heart className="size-10 mx-auto mb-6 text-muted-foreground" strokeWidth={1.25} />
          <p className="text-sm font-bold uppercase tracking-widest mb-2">No saved items yet</p>
          <p className="text-sm text-muted-foreground mb-8">
            Tap the heart on any product to save it here.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-foreground text-background px-8 py-4 text-[10px] font-bold uppercase tracking-widest"
          >
            Explore the Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-6">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
