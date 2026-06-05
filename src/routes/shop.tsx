import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { products, categories, type Category } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Search } from "lucide-react";

const searchSchema = z.object({
  category: z.enum(["tees", "hoodies", "shoes", "watches"]).optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  component: ShopPage,
  head: () => ({
    meta: [
      { title: "Shop — VANTAGE" },
      {
        name: "description",
        content: "Browse the full VANTAGE collection of tees, hoodies, shoes and watches.",
      },
    ],
  }),
});

function ShopPage() {
  const { category } = Route.useSearch();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"featured" | "low" | "high">("featured");

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (category && p.category !== category) return false;
      if (query && !`${p.name} ${p.color}`.toLowerCase().includes(query.toLowerCase()))
        return false;
      return true;
    });

    // Ensure only unique products (by ID) are shown
    const seen = new Set<string>();
    list = list.filter((p) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });

    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, query, sort]);

  const counts: Record<Category | "all", number> = {
    all: products.length,
    tees: products.filter((p) => p.category === "tees").length,
    hoodies: products.filter((p) => p.category === "hoodies").length,
    shoes: products.filter((p) => p.category === "shoes").length,
    watches: products.filter((p) => p.category === "watches").length,
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-12 md:py-20">
      <div className="mb-12 md:mb-16">
        <p className="label-eyebrow text-muted-foreground mb-3">Collection</p>
        <h1 className="text-4xl md:text-6xl text-display">
          {category ? categories.find((c) => c.id === category)?.label : "All Products"}
        </h1>
        <div className="w-12 h-1 bg-foreground mt-5" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        <aside className="lg:col-span-2">
          <div className="space-y-10 lg:sticky lg:top-28">
            <div>
              <label className="label-eyebrow block mb-3">Search</label>
              <div className="relative">
                <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Find a piece"
                  className="w-full border border-border bg-background pl-9 pr-3 py-2.5 text-xs focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
            </div>

            <div>
              <h4 className="label-eyebrow mb-5">Categories</h4>
              <ul className="space-y-3 text-[13px] font-medium">
                <li>
                  <Link
                    to="/shop"
                    className={`flex items-center justify-between transition-colors ${!category ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <span>All Clothing</span>
                    <span className="text-[10px] opacity-50">({counts.all})</span>
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link
                      to="/shop"
                      search={{ category: c.id }}
                      className={`flex items-center justify-between transition-colors ${category === c.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      <span>{c.label}</span>
                      <span className="text-[10px] opacity-50">({counts[c.id]})</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="label-eyebrow mb-5">Sort</h4>
              <div className="flex flex-col gap-2 text-[13px]">
                {(
                  [
                    ["featured", "Featured"],
                    ["low", "Price · Low to High"],
                    ["high", "Price · High to Low"],
                  ] as const
                ).map(([k, label]) => (
                  <button
                    key={k}
                    onClick={() => setSort(k)}
                    className={`text-left transition-colors ${sort === k ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-10">
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground py-20 text-center">
              No products match your search.
            </p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-6 md:gap-y-14">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
