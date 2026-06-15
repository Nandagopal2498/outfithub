import { Link } from "@tanstack/react-router";
import { type Product, getProductStock } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { Heart, Star, Eye } from "lucide-react";
import { useState } from "react";
import { QuickView } from "@/components/QuickView";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const saved = has(product.id);
  const stars = Array.from({ length: 5 }, (_, i) => i < product.rating);

  const initialIdx = Math.max(
    0,
    product.variants.findIndex((v) => v.name === product.color),
  );
  const [selectedVariant, setSelectedVariant] = useState(initialIdx);
  const [hoverVariant, setHoverVariant] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quickOpen, setQuickOpen] = useState(false);

  const activeIdx = hoverVariant ?? selectedVariant;
  const activeVariant = product.variants[activeIdx];
  const displayImage = activeVariant.image;
  const variantPreviewing = hoverVariant !== null;

  // Determine stock availability for currently selected variant & size
  const stock = getProductStock(product.id, product.variants[selectedVariant].name, selectedSize);
  let stockMsg = "In Stock";
  let stockColorClass = "text-green-600 dark:text-green-500 bg-green-600";
  if (stock === 0) {
    stockMsg = "Sold Out";
    stockColorClass = "text-destructive bg-destructive";
  } else if (stock <= 3) {
    stockMsg = `Only ${stock} left`;
    stockColorClass = "text-amber-600 dark:text-amber-500 bg-amber-600";
  }

  return (
    <div className="group animate-fade-in" onMouseLeave={() => setHoverVariant(null)}>
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        search={{ color: product.variants[selectedVariant].name, size: selectedSize }}
        className="block relative aspect-[3/4] overflow-hidden bg-surface mb-5 focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 outline-none"
      >
        <img
          src={displayImage}
          alt={`${product.name} — ${activeVariant.name}`}
          loading="lazy"
          width={800}
          height={1024}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${variantPreviewing ? "opacity-100" : "group-hover:opacity-0 group-focus-within:opacity-0"
            }`}
        />
        <img
          src={product.altImage}
          alt=""
          aria-hidden
          loading="lazy"
          width={800}
          height={1024}
          className={`absolute inset-0 w-full h-full object-cover scale-105 transition-all duration-700 ${variantPreviewing ? "opacity-0" : "group-hover:scale-100 group-focus-within:scale-100"
            }`}
        />
        {product.badge && (
          <span className="absolute top-4 left-4 bg-foreground text-background text-[9px] font-bold uppercase px-2 py-1 tracking-tighter">
            {product.badge}
          </span>
        )}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggle(product.id);
            }}
            aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
            className="w-9 h-9 grid place-items-center bg-background/80 backdrop-blur hover:bg-background transition-colors focus:ring-2 focus:ring-foreground focus:outline-none"
          >
            <Heart className={`size-4 ${saved ? "fill-foreground text-foreground" : ""}`} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setQuickOpen(true);
            }}
            aria-label="Quick view"
            className="w-9 h-9 grid place-items-center bg-background/80 backdrop-blur hover:bg-background transition-colors opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus:opacity-100 focus-visible:opacity-100 focus:ring-2 focus:ring-foreground focus:outline-none"
          >
            <Eye className="size-4" strokeWidth={1.75} />
          </button>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (stock > 0) {
              add(product.id, selectedSize, 1, product.variants[selectedVariant].name);
            }
          }}
          disabled={stock === 0}
          className={`absolute bottom-0 left-0 w-full py-4 text-[10px] font-bold uppercase tracking-widest translate-y-full group-hover:translate-y-0 group-focus-within:translate-y-0 focus:translate-y-0 focus-visible:translate-y-0 transition-transform focus:outline-none z-10 ${stock === 0
              ? "bg-muted text-muted-foreground cursor-not-allowed opacity-80"
              : "bg-foreground text-background hover:bg-foreground/90"
            }`}
        >
          {stock === 0 ? "Sold Out" : `Quick Add · ${selectedSize}`}
        </button>
      </Link>

      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-bold uppercase tracking-tight truncate">{product.name}</h3>
          <p className="text-xs text-muted-foreground mt-1 transition-colors">
            {activeVariant.name}
          </p>
        </div>
        <span className="text-sm font-bold whitespace-nowrap">${product.price}</span>
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {stars.map((on, i) => (
              <Star
                key={i}
                className={`size-3 ${on ? "fill-foreground text-foreground" : "text-muted-foreground/30"}`}
              />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground font-semibold">
            ({product.reviews})
          </span>
        </div>
        {product.variants.length > 1 && (
          <div className="flex items-center gap-1.5">
            {product.variants.map((v, i) => (
              <button
                key={v.name}
                type="button"
                aria-label={`Select ${v.name}`}
                aria-pressed={selectedVariant === i}
                onMouseEnter={() => setHoverVariant(i)}
                onFocus={() => setHoverVariant(i)}
                onBlur={() => setHoverVariant(null)}
                onClick={() => setSelectedVariant(i)}
                className={`w-3.5 h-3.5 rounded-full border transition-transform hover:scale-125 focus:scale-125 focus:outline-none ${selectedVariant === i
                    ? "border-foreground scale-125 ring-1 ring-foreground ring-offset-1 ring-offset-background"
                    : "border-border"
                  }`}
                style={{ backgroundColor: v.swatch }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        {product.sizes.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSelectedSize(s)}
            aria-pressed={selectedSize === s}
            className={`min-w-[28px] px-1.5 py-1 text-[10px] font-bold tracking-wider border transition-colors focus:ring-1 focus:ring-foreground focus:outline-none ${selectedSize === s
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider">
        <span className={`w-1.5 h-1.5 rounded-full ${stockColorClass.split(' ')[2]}`} />
        <span className={stockColorClass.split(' ').slice(0, 2).join(' ')}>{stockMsg}</span>
      </div>

      <QuickView product={product} open={quickOpen} onOpenChange={setQuickOpen} />
    </div>
  );
}
