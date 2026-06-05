import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { type Product, products, getProductStock } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Star, Play } from "lucide-react";

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

  // Active media inside gallery
  const [activeMedia, setActiveMedia] = useState<string | null>(null);

  // Derive matching product to fetch all variant images
  const matchingProduct = products.find(
    (p) => p.name === product.name && p.color === variant.name
  ) || product;

  // Extract unique gallery items for selected color
  const galleryItems = [
    matchingProduct.image,
    matchingProduct.altImage,
    ...(matchingProduct.video ? [matchingProduct.video] : [])
  ].filter((value, index, self) => self.indexOf(value) === index);

  const displayMedia = activeMedia || variant.image;
  const isVideoActive = displayMedia === matchingProduct.video || displayMedia === product.video;

  // Determine stock availability
  const stock = getProductStock(product.id, variant.name, size);
  let stockMsg = "In Stock";
  let stockColorClass = "text-green-600 dark:text-green-500 bg-green-600";
  if (stock === 0) {
    stockMsg = "Sold Out";
    stockColorClass = "text-destructive bg-destructive";
  } else if (stock <= 3) {
    stockMsg = `Only ${stock} left`;
    stockColorClass = "text-amber-600 dark:text-amber-500 bg-amber-600";
  }

  const handleSelectVariant = (idx: number) => {
    setVariantIdx(idx);
    setActiveMedia(null);
  };

  const handleSwatchKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIdx = -1;
    const total = product.variants.length;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      nextIdx = (index + 1) % total;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      nextIdx = (index - 1 + total) % total;
    } else if (e.key === "Home") {
      nextIdx = 0;
    } else if (e.key === "End") {
      nextIdx = total - 1;
    }

    if (nextIdx !== -1) {
      e.preventDefault();
      setVariantIdx(nextIdx);
      setActiveMedia(null);
      setTimeout(() => {
        const parent = e.currentTarget.parentElement;
        const buttons = parent?.querySelectorAll("button");
        if (buttons && buttons[nextIdx]) {
          (buttons[nextIdx] as HTMLButtonElement).focus();
        }
      }, 0);
    }
  };

  const handleSizeKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIdx = -1;
    const total = product.sizes.length;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      nextIdx = (index + 1) % total;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      nextIdx = (index - 1 + total) % total;
    } else if (e.key === "Home") {
      nextIdx = 0;
    } else if (e.key === "End") {
      nextIdx = total - 1;
    }

    if (nextIdx !== -1) {
      e.preventDefault();
      setSize(product.sizes[nextIdx]);
      setTimeout(() => {
        const parent = e.currentTarget.parentElement;
        const buttons = parent?.querySelectorAll("button");
        if (buttons && buttons[nextIdx]) {
          (buttons[nextIdx] as HTMLButtonElement).focus();
        }
      }, 0);
    }
  };

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
          {/* Gallery Media */}
          <div className="flex flex-col h-full bg-surface">
            <div className="flex-1 relative aspect-square md:aspect-[4/5] overflow-hidden min-h-[350px]">
              {isVideoActive ? (
                <video
                  src={displayMedia}
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="w-full h-full absolute inset-0 object-cover"
                />
              ) : (
                <img
                  src={displayMedia}
                  alt={`${product.name} — ${variant.name}`}
                  className="w-full h-full absolute inset-0 object-cover"
                />
              )}
            </div>
            {galleryItems.length > 1 && (
              <div className="flex gap-2 p-3 border-t border-border overflow-x-auto shrink-0 bg-background justify-center">
                {galleryItems.map((src) => {
                  const isVideo = src === matchingProduct.video || src === product.video;
                  return (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setActiveMedia(src)}
                      className={`size-12 overflow-hidden bg-surface border-2 transition-colors ${
                        displayMedia === src ? "border-foreground" : "border-transparent"
                      }`}
                    >
                      {isVideo ? (
                        <div className="w-full h-full relative">
                          <img
                            src={matchingProduct.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 grid place-items-center bg-black/30">
                            <Play className="size-3 text-white fill-white" />
                          </div>
                        </div>
                      ) : (
                        <img src={src} alt="" className="w-full h-full object-cover" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
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

            <div className="flex items-center gap-3 mb-4">
              <div className="text-xl font-bold">${product.price}</div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-secondary/50">
                <span className={`w-1.5 h-1.5 rounded-full ${stockColorClass.split(' ')[2]}`} />
                <span className={stockColorClass.split(' ').slice(0, 2).join(' ')}>{stockMsg}</span>
              </div>
            </div>

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
                      onClick={() => handleSelectVariant(i)}
                      onKeyDown={(e) => handleSwatchKeyDown(e, i)}
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
                {product.sizes.map((s, i) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    onKeyDown={(e) => handleSizeKeyDown(e, i)}
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
                disabled={stock === 0}
                className={`flex-1 py-3 text-[11px] font-bold uppercase tracking-widest transition-colors ${
                  stock === 0
                    ? "bg-muted text-muted-foreground cursor-not-allowed opacity-80"
                    : "bg-foreground text-background hover:bg-foreground/90"
                }`}
              >
                {stock === 0 ? "Sold Out" : added ? "Added" : "Add to Cart"}
              </button>
              <Link
                to="/product/$id"
                params={{ id: product.id }}
                search={{ color: variant.name, size: size }}
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
