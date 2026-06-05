import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Star } from "lucide-react";

interface QuickViewProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickView({ product, open, onOpenChange }: QuickViewProps) {
  const { add } = useCart();
  const initialIdx = Math.max(
    0,
    product.variants.findIndex((v) => v.name === product.color),
  );
  const [variantIdx, setVariantIdx] = useState(initialIdx);
  const [size, setSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);
  const variant = product.variants[variantIdx];

  const handleAdd = () => {
    add(product.id, size, 1, variant.name);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onOpenChange(false);
    }, 900);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 gap-0 overflow-hidden">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <DialogDescription className="sr-only">{product.description}</DialogDescription>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="aspect-square md:aspect-auto bg-surface">
            <img
              src={variant.image}
              alt={`${product.name} — ${variant.name}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 md:p-8 flex flex-col">
            {product.badge && (
              <span className="inline-block self-start bg-foreground text-background text-[9px] font-bold uppercase px-2 py-1 tracking-tighter mb-4">
                {product.badge}
              </span>
            )}
            <h2 className="text-2xl text-display leading-tight mb-1">{product.name}</h2>
            <p className="text-xs text-muted-foreground mb-4">{variant.name}</p>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-3 ${i < product.rating ? "fill-foreground text-foreground" : "text-muted-foreground/30"}`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">
                {product.rating}.0 ({product.reviews})
              </span>
            </div>

            <div className="text-xl font-bold mb-4">${product.price}</div>

            <p className="text-xs text-muted-foreground leading-relaxed mb-6">
              {product.description}
            </p>

            {product.variants.length > 1 && (
              <div className="mb-5">
                <h3 className="label-eyebrow mb-2">Color</h3>
                <div className="flex items-center gap-2">
                  {product.variants.map((v, i) => (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => setVariantIdx(i)}
                      aria-label={`Select ${v.name}`}
                      aria-pressed={variantIdx === i}
                      className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${
                        variantIdx === i ? "border-foreground scale-110" : "border-border"
                      }`}
                      style={{ backgroundColor: v.swatch }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="label-eyebrow mb-2">Size</h3>
              <div className="grid grid-cols-5 gap-1.5">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    aria-pressed={size === s}
                    className={`border py-2 text-[10px] font-bold tracking-wider transition-colors ${
                      size === s
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto flex gap-2">
              <button
                onClick={handleAdd}
                className="flex-1 bg-foreground text-background py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-foreground/90 transition-colors"
              >
                {added ? "Added" : "Add to Cart"}
              </button>
              <Link
                to="/product/$id"
                params={{ id: product.id }}
                onClick={() => onOpenChange(false)}
                className="border border-border hover:border-foreground py-3 px-4 text-[11px] font-bold uppercase tracking-widest grid place-items-center"
              >
                Details
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
