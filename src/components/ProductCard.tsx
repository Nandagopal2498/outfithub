import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Star } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const stars = Array.from({ length: 5 }, (_, i) => i < product.rating);

  return (
    <div className="group">
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="block relative aspect-[3/4] overflow-hidden bg-surface mb-5"
      >
        <img
          src={product.image}
          alt={`${product.name} — ${product.color}`}
          loading="lazy"
          width={800}
          height={1024}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <img
          src={product.altImage}
          alt=""
          aria-hidden
          loading="lazy"
          width={800}
          height={1024}
          className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-700 group-hover:scale-100"
        />
        {product.badge && (
          <span className="absolute top-4 left-4 bg-foreground text-background text-[9px] font-bold uppercase px-2 py-1 tracking-tighter">
            {product.badge}
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            add(product.id, product.sizes[0], 1);
          }}
          className="absolute bottom-0 left-0 w-full py-4 bg-foreground text-background text-[10px] font-bold uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform"
        >
          Quick Add
        </button>
      </Link>
      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-bold uppercase tracking-tight truncate">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">{product.color}</p>
        </div>
        <span className="text-sm font-bold whitespace-nowrap">${product.price}</span>
      </div>
      <div className="mt-2 flex items-center gap-1.5">
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
    </div>
  );
}
