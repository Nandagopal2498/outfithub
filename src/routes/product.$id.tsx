import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { ProductCard } from "@/components/ProductCard";
import { Heart, Star, Truck, Recycle, Play } from "lucide-react";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — VANTAGE` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — VANTAGE` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="py-32 text-center">
      <h1 className="text-display text-4xl">Product not found</h1>
      <Link to="/shop" className="inline-block mt-6 text-xs font-bold uppercase tracking-widest border-b-2 border-foreground pb-1">
        Back to Shop
      </Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const saved = has(product.id);
  const [size, setSize] = useState(product.sizes[0]);
  const [activeMedia, setActiveMedia] = useState(product.image);
  const [added, setAdded] = useState(false);
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const isVideoActive = activeMedia === product.video;

  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );

  const handleAdd = () => {
    add(product.id, size, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 pt-8">
        <nav className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground flex gap-2">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Gallery */}
        <div className="lg:col-span-7 grid grid-cols-[80px_1fr] gap-4">
          <div className="flex flex-col gap-3">
            {[product.image, product.altImage, ...(product.video ? [product.video] : [])].map((src) => (
              <button
                key={src}
                onClick={() => setActiveMedia(src)}
                className={`aspect-square overflow-hidden bg-surface border-2 transition-colors ${
                  activeMedia === src ? "border-foreground" : "border-transparent"
                }`}
              >
                {src === product.video ? (
                  <div className="w-full h-full relative">
                    <img src={product.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 grid place-items-center bg-black/30">
                      <Play className="size-5 text-white fill-white" />
                    </div>
                  </div>
                ) : (
                  <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                )}
              </button>
            ))}
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
                src={activeMedia}
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
          <h1 className="text-3xl md:text-4xl text-display leading-[0.95] mb-2">
            {product.name}
          </h1>
          <p className="text-sm text-muted-foreground mb-5">{product.color}</p>

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

          <div className="text-2xl font-bold mb-8">${product.price}</div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-10">
            {product.description}
          </p>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="label-eyebrow">Size</h3>
              <button className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground">
                Size Guide
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((s: string) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`border py-3 text-[11px] font-bold tracking-wider transition-colors ${
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

          <div className="flex gap-3 mb-10">
            <button
              onClick={handleAdd}
              className="flex-1 bg-foreground text-background py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-foreground/90 transition-colors"
            >
              {added ? "Added to Cart" : "Add to Cart"}
            </button>
            <button
              className="border border-border p-4 hover:border-foreground transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="size-4" />
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
                <p className="text-xs text-muted-foreground mt-1">No questions asked, fully refundable.</p>
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
