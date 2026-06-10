import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { getProduct, products, getProductStock } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { ProductCard } from "@/components/ProductCard";
import { Heart, Star, Truck, Recycle, Play } from "lucide-react";
import { z } from "zod";

const productSearchSchema = z.object({
  color: z.string().optional(),
  size: z.string().optional(),
});

export const Route = createFileRoute("/product/$id")({
  validateSearch: productSearchSchema,
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  notFoundComponent: () => (
    <div className="py-32 text-center">
      <h1 className="text-display text-4xl">Product not found</h1>
      <Link
        to="/shop"
        className="inline-block mt-6 text-xs font-bold uppercase tracking-widest border-b-2 border-foreground pb-1"
      >
        Back to Shop
      </Link>
    </div>
  ),
  component: ProductPage,
});


function ProductPage() {
  const { product } = Route.useLoaderData();
  const { color: searchColor, size: searchSize } = Route.useSearch();
  const navigate = useNavigate();
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const saved = has(product.id);

  // Active size and variant index derived from URL search parameters or defaults
  const activeSize = searchSize && product.sizes.includes(searchSize) ? searchSize : product.sizes[0];
  const initialVariantIdx = Math.max(
    0,
    product.variants.findIndex((v: { name: string }) => v.name === (searchColor || product.color)),
  );
  const activeVariant = product.variants[initialVariantIdx];

  const [activeMedia, setActiveMedia] = useState<string | null>(null);
  const displayMedia = activeMedia || activeVariant.image;

  const [added, setAdded] = useState(false);
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const isVideoActive = displayMedia === product.video;

  const related = products.filter((p) => p.category === product.category && p.id !== product.id);

  // Determine stock availability
  const stock = getProductStock(product.id, activeVariant.name, activeSize);
  let stockMsg = "In Stock";
  let stockColorClass = "text-green-600 dark:text-green-500 bg-green-600";
  if (stock === 0) {
    stockMsg = "Sold Out";
    stockColorClass = "text-destructive bg-destructive";
  } else if (stock <= 3) {
    stockMsg = `Only ${stock} left`;
    stockColorClass = "text-amber-600 dark:text-amber-500 bg-amber-600";
  }

  const handleSelectVariant = (i: number) => {
    const variantName = product.variants[i].name;
    setActiveMedia(product.variants[i].image);
    navigate({
      search: (prev) => ({ category: prev.category, color: variantName, size: prev.size }),
      replace: true,
    } as Parameters<typeof navigate>[0]);
  };

  const handleSelectSize = (s: string) => {
    navigate({
      search: (prev) => ({ category: prev.category, color: prev.color, size: s }),
      replace: true,
    } as Parameters<typeof navigate>[0]);
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
      const variantName = product.variants[nextIdx].name;
      setActiveMedia(product.variants[nextIdx].image);
      navigate({
        search: (prev) => ({ ...prev, color: variantName }),
        replace: true,
      });
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
      const nextSize = product.sizes[nextIdx];
      navigate({
        search: (prev) => ({ ...prev, size: nextSize }),
        replace: true,
      });
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
    add(product.id, activeSize, 1, activeVariant.name);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div>
      <title>{`${product.name} — VANTAGE`}</title>
      <meta name="description" content={product.description} />
      <meta property="og:title" content={`${product.name} — VANTAGE`} />
      <meta property="og:description" content={product.description} />
      <meta property="og:image" content={product.image} />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 pt-8">
        <nav className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground flex gap-2">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground">
            Shop
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Gallery */}
        <div className="lg:col-span-7 grid grid-cols-[80px_1fr] gap-4">
          <div className="flex flex-col gap-3">
            {[product.image, product.altImage, ...(product.video ? [product.video] : [])].map(
              (src) => (
                <button
                  key={src}
                  onClick={() => setActiveMedia(src)}
                  className={`aspect-square overflow-hidden bg-surface border-2 transition-colors ${
                    displayMedia === src ? "border-foreground" : "border-transparent"
                  }`}
                >
                  {src === product.video ? (
                    <div className="w-full h-full relative">
                      <img
                        src={product.image}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 grid place-items-center bg-black/30">
                        <Play className="size-5 text-white fill-white" />
                      </div>
                    </div>
                  ) : (
                    <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                  )}
                </button>
              ),
            )}
          </div>
          <div className="aspect-[4/5] overflow-hidden bg-surface">
            {isVideoActive && product.video ? (
              <video
                ref={mainVideoRef}
                src={product.video}
                muted
                loop
                playsInline
                autoPlay
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={displayMedia}
                alt={product.name}
                width={1200}
                height={1500}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
          {product.badge && (
            <span className="inline-block bg-foreground text-background text-[9px] font-bold uppercase px-2 py-1 tracking-tighter mb-5">
              {product.badge}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl text-display leading-[0.95] mb-2">{product.name}</h1>
          <p className="text-sm text-muted-foreground mb-5">{activeVariant.name}</p>

          <div className="flex items-center gap-3 mb-8">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`size-3.5 ${i < product.rating ? "fill-foreground text-foreground" : "text-muted-foreground/30"}`}
                />
              ))}
            </div>
            <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-widest">
              {product.rating}.0 — {product.reviews} reviews
            </span>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <div className="text-2xl font-bold">${product.price}</div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-secondary/50">
              <span className={`w-1.5 h-1.5 rounded-full ${stockColorClass.split(' ')[2]}`} />
              <span className={stockColorClass.split(' ').slice(0, 2).join(' ')}>{stockMsg}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-10">
            {product.description}
          </p>

          {product.variants.length > 1 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="label-eyebrow">Color</h3>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {activeVariant.name}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.variants.map((v: { name: string; swatch: string }, i: number) => (
                  <button
                    key={v.name}
                    type="button"
                    onClick={() => handleSelectVariant(i)}
                    onKeyDown={(e) => handleSwatchKeyDown(e, i)}
                    aria-label={`Select ${v.name}`}
                    aria-pressed={initialVariantIdx === i}
                    className={`w-9 h-9 rounded-full border-2 transition-transform hover:scale-110 ${
                      initialVariantIdx === i ? "border-foreground scale-110" : "border-border"
                    }`}
                    style={{ backgroundColor: v.swatch }}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="label-eyebrow">Size</h3>
              <button className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground">
                Size Guide
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((s: string, i: number) => (
                <button
                  key={s}
                  onClick={() => handleSelectSize(s)}
                  onKeyDown={(e) => handleSizeKeyDown(e, i)}
                  className={`border py-3 text-[11px] font-bold tracking-wider transition-colors ${
                    activeSize === s
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mb-10">
            <button
              onClick={handleAdd}
              disabled={stock === 0}
              className={`flex-1 py-4 text-[11px] font-bold uppercase tracking-widest transition-colors ${
                stock === 0
                  ? "bg-muted text-muted-foreground cursor-not-allowed opacity-80 border-border"
                  : "bg-foreground text-background hover:bg-foreground/90 border-foreground"
              }`}
            >
              {stock === 0 ? "Sold Out" : added ? "Added to Cart" : "Add to Cart"}
            </button>
            <button
              onClick={() => toggle(product.id)}
              className={`border p-4 transition-colors ${saved ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
              aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
            >
              <Heart className={`size-4 ${saved ? "fill-current" : ""}`} />
            </button>
          </div>

          <div className="space-y-4 pt-8 border-t border-border">
            <div className="flex items-start gap-3">
              <Truck className="size-4 mt-0.5 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest">Free Express Shipping</p>
                <p className="text-xs text-muted-foreground mt-1">On all orders over $150.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Recycle className="size-4 mt-0.5 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest">30 Day Returns</p>
                <p className="text-xs text-muted-foreground mt-1">
                  No questions asked, fully refundable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-6 lg:px-8 pt-20 pb-8">
          <h2 className="text-2xl md:text-4xl text-display mb-10">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-6">
            {related.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
