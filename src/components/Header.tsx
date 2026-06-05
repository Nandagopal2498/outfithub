import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Search, User, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { categories, products } from "@/lib/products";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

export function AnnouncementBar() {
  return (
    <div className="bg-foreground text-background py-2 px-4 text-center text-[11px] font-semibold uppercase tracking-widest">
      Complimentary Express Shipping on Orders Over $150
    </div>
  );
}

export function Header() {
  const { count } = useCart();
  const { count: wishCount } = useWishlist();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <AnnouncementBar />
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="hidden md:flex flex-1 gap-8 items-center text-[13px] font-semibold uppercase tracking-wide">
            {categories.map((c) => (
              <Link
                key={c.id}
                to="/shop"
                search={{ category: c.id }}
                className="hover:opacity-50 transition-opacity"
              >
                {c.label}
              </Link>
            ))}
          </div>

          <button className="md:hidden p-1" aria-label="Menu" onClick={() => setOpen(true)}>
            <Menu className="size-5" />
          </button>

          <Link to="/" className="flex-none">
            <span className="text-2xl font-extrabold tracking-tighter uppercase italic">
              VANTAGE
            </span>
          </Link>

          <div className="flex-1 flex justify-end items-center gap-5 md:gap-6">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-1.5 group hover:opacity-50 transition-opacity focus:outline-none"
              aria-label="Search"
            >
              <Search className="size-4" />
              <span className="hidden lg:inline text-[13px] font-semibold uppercase">Search</span>
            </button>
            <Link to="/login" className="hidden sm:flex items-center gap-1.5" aria-label="Account">
              <User className="size-4" />
              <span className="hidden lg:inline text-[13px] font-semibold uppercase">Account</span>
            </Link>
            <Link
              to="/wishlist"
              className="flex items-center gap-1.5 relative"
              aria-label="Wishlist"
            >
              <Heart className={`size-4 ${wishCount > 0 ? "fill-foreground" : ""}`} />
              {wishCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-foreground text-background text-[9px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center font-bold">
                  {wishCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="flex items-center gap-2 group" aria-label="Cart">
              <span className="text-[13px] font-semibold uppercase">Cart</span>
              <span className="bg-foreground text-background text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {count}
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-[60] bg-background md:hidden flex flex-col">
          <div className="flex items-center justify-between px-6 h-20 border-b border-border">
            <span className="text-2xl font-extrabold tracking-tighter uppercase italic">
              VANTAGE
            </span>
            <button onClick={() => setOpen(false)} aria-label="Close">
              <X className="size-5" />
            </button>
          </div>
          <div className="flex flex-col p-6 gap-6">
            {categories.map((c) => (
              <Link
                key={c.id}
                to="/shop"
                search={{ category: c.id }}
                onClick={() => setOpen(false)}
                className="text-2xl font-extrabold uppercase italic tracking-tighter"
              >
                {c.label}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="text-2xl font-extrabold uppercase italic tracking-tighter"
            >
              Account
            </Link>
          </div>
        </div>
      )}

      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Search collections, products..." />
        <CommandList className="max-h-[350px] overflow-y-auto">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Products">
            {products.map((p) => (
              <CommandItem
                key={p.id}
                value={`${p.name} ${p.color} ${p.category}`}
                onSelect={() => {
                  setSearchOpen(false);
                  navigate({ to: "/product/$id", params: { id: p.id } });
                }}
                className="flex items-center gap-3 p-2 cursor-pointer hover:bg-accent rounded-sm"
              >
                <img src={p.image} alt="" className="size-10 object-cover bg-surface" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase tracking-tight truncate">{p.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{p.color} · {p.category}</p>
                </div>
                <span className="text-xs font-bold">${p.price}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
