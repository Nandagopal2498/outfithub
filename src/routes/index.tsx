import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import catTees from "@/assets/cat-tees.jpg";
import catHoodies from "@/assets/cat-hoodies.jpg";
import catShoes from "@/assets/cat-shoes.jpg";
import catWatches from "@/assets/cat-watches.jpg";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Truck, Recycle, Headphones, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const categoryTiles = [
  { id: "tees", label: "Tees", img: catTees, num: "01" },
  { id: "hoodies", label: "Hoodies", img: catHoodies, num: "02" },
  { id: "shoes", label: "Shoes", img: catShoes, num: "03" },
  { id: "watches", label: "Watches", img: catWatches, num: "04" },
] as const;

function Index() {
  const featured = products.slice(0, 3);


  return (
    <div>
      <title>VANTAGE — Engineered Simplicity</title>
      <meta
        name="description"
        content="Autumn / Winter Core Collection. Premium minimalist clothing, footwear and watches by VANTAGE Collective."
      />
      <meta property="og:image" content={heroImg} />
      {/* Hero */}
      <section
        className="relative h-[85vh] w-full overflow-hidden flex items-end px-6 md:px-12 pb-16 md:pb-24"
      >
        <img
          src={heroImg}
          alt="Model wearing the Autumn Core collection"
          width={1920}
          height={1280}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-0" />
        <div className="relative z-10 max-w-2xl text-white animate-fade-up">
          <p className="label-eyebrow text-white/70 mb-5">AW / 2026 Core Collection</p>
          <h1 className="text-5xl sm:text-7xl text-display leading-[0.9] mb-6">
            Engineered
            <br />
            Simplicity
          </h1>
          <p className="text-base md:text-lg font-medium max-w-md mb-8 opacity-90">
            Technical fabrics reimagined for urban utility. Built once, worn for a decade.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="px-8 md:px-10 py-4 md:py-5 bg-background text-foreground font-bold uppercase text-xs tracking-widest hover:bg-background/85 transition-colors"
            >
              Shop The Drop
            </Link>
            <Link
              to="/shop"
              search={{ category: "shoes" }}
              className="px-8 md:px-10 py-4 md:py-5 bg-transparent border border-white text-white font-bold uppercase text-xs tracking-widest hover:bg-white/10 transition-colors"
            >
              View Footwear
            </Link>
          </div>
        </div>
      </section>

      {/* Category Tiles */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-8 pt-20 md:pt-32">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="label-eyebrow text-muted-foreground mb-3">Categories</p>
            <h2 className="text-3xl md:text-5xl text-display">Shop By Discipline</h2>
            <div className="w-12 h-1 bg-foreground mt-5" />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {categoryTiles.map((c) => (
            <Link
              key={c.id}
              to="/shop"
              search={{ category: c.id }}
              className="group relative aspect-[3/4] overflow-hidden bg-surface"
            >
              <img
                src={c.img}
                alt={c.label}
                loading="lazy"
                width={800}
                height={1024}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
                <span className="text-[10px] font-mono opacity-70">{c.num}</span>
                <h3 className="text-2xl md:text-3xl text-display">{c.label}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-8 py-24 md:py-32">
        <div className="flex flex-wrap gap-4 justify-between items-end mb-12">
          <div>
            <p className="label-eyebrow text-muted-foreground mb-3">The Essentials</p>
            <h2 className="text-3xl md:text-5xl text-display">Featured Pieces</h2>
            <div className="w-12 h-1 bg-foreground mt-5" />
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold uppercase tracking-widest border-b-2 border-foreground pb-1 hover:opacity-60 transition-opacity"
          >
            View All Products
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Feature Strip */}
      <section className="bg-surface py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            {
              Icon: Truck,
              title: "Global Shipping",
              text: "Rapid distribution across five continents.",
            },
            {
              Icon: Recycle,
              title: "Sustainable Make",
              text: "80% recycled or organic source materials.",
            },
            {
              Icon: Headphones,
              title: "Premium Support",
              text: "24/7 dedicated concierge for members.",
            },
            {
              Icon: ShieldCheck,
              title: "Secure Payments",
              text: "Fully encrypted with fraud protection.",
            },
          ].map(({ Icon, title, text }) => (
            <div key={title} className="text-center">
              <div className="size-12 bg-foreground/5 rounded-full mx-auto mb-5 grid place-items-center">
                <Icon className="size-5" strokeWidth={1.5} />
              </div>
              <h5 className="text-[11px] font-bold uppercase tracking-widest mb-2">{title}</h5>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-[22ch] mx-auto">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
