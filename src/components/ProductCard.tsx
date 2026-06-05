import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { Heart, Star } from "lucide-react";
import { useRef, useState } from "react";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const saved = has(product.id);
  const stars = Array.from({ length: 5 }, (_, i) => i < product.rating);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeVariant, setActiveVariant] = useState<number | null>(null);

  const displayImage =
    activeVariant !== null ? product.variants[activeVariant].image : product.image;
  const displayColor =
    activeVariant !== null ? product.variants[activeVariant].name : product.color;
  const variantActive = activeVariant !== null;

  const handleMouseEnter = () => {
    if (!variantActive) videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setActiveVariant(null);
  };

  return (
    <div className="group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="block relative aspect-[3/4] overflow-hidden bg-surface mb-5"
      >
        <img
          src={displayImage}
          alt={`${product.name} — ${displayColor}`}
          loading="lazy"
          width={800}
          height={1024}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            variantActive ? "opacity-100" : "group-hover:opacity-0"
          }`}
        />
        {product.video ? (
          <video
            ref={videoRef}
            src={product.video}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              variantActive ? "opacity-0" : "opacity-0 group-hover:opacity-100"
            }`}
          />
        ) : (
          <img
            src={product.altImage}
            alt=""
            aria-hidden
            loading="lazy"
            width={800}
            height={1024}
            className={`absolute inset-0 w-full h-full object-cover scale-105 transition-all duration-700 ${
              variantActive ? "opacity-0" : "group-hover:scale-100"
            }`}
          />
        )}
        {product.badge && (
          <span className="absolute top-4 left-4 bg-foreground text-background text-[9px] font-bold uppercase px-2 py-1 tracking-tighter">
            {product.badge}
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggle(product.id);
          }}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          className="absolute top-3 right-3 w-9 h-9 grid place-items-center bg-background/80 backdrop-blur hover:bg-background transition-colors"
        >
          <Heart className={`size-4 ${saved ? "fill-foreground text-foreground" : ""}`} />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            const variant =
              activeVariant !== null ? product.variants[activeVariant].name : product.color;
            add(product.id, product.sizes[0], 1, variant);
          }}
          className="absolute bottom-0 left-0 w-full py-4 bg-foreground text-background text-[10px] font-bold uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform"
        >
          Quick Add
        </button>
      </Link>
      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-bold uppercase tracking-tight truncate">{product.name}</h3>
          <p className="text-xs text-muted-foreground mt-1 transition-colors">{displayColor}</p>
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
                aria-label={`Preview ${v.name}`}
                onMouseEnter={() => setActiveVariant(i)}
                onFocus={() => setActiveVariant(i)}
                className={`w-3.5 h-3.5 rounded-full border transition-transform hover:scale-125 ${
                  activeVariant === i ? "border-foreground scale-125" : "border-border"
                }`}
                style={{ backgroundColor: v.swatch }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
