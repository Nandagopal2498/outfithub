export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-24 pb-12 mt-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 md:pb-24 border-b border-white/10">
          <div className="md:col-span-4">
            <span className="text-3xl font-extrabold tracking-tighter uppercase italic block mb-8">
              VANTAGE
            </span>
            <p className="text-background/60 text-sm leading-relaxed mb-8 max-w-xs">
              Redefining the boundaries of contemporary fashion through precision engineering and
              timeless geometric forms.
            </p>
            <div className="flex gap-3">
              {["IG", "TW", "YT"].map((s) => (
                <div
                  key={s}
                  className="size-9 bg-white/10 rounded-full grid place-items-center text-[10px] font-bold cursor-pointer hover:bg-white/20 transition-colors"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <h6 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Shop</h6>
            <ul className="space-y-3 text-xs font-medium text-background/60">
              <li className="hover:text-background cursor-pointer">New Arrivals</li>
              <li className="hover:text-background cursor-pointer">Best Sellers</li>
              <li className="hover:text-background cursor-pointer">Collections</li>
              <li className="hover:text-background cursor-pointer">Sale</li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h6 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Support</h6>
            <ul className="space-y-3 text-xs font-medium text-background/60">
              <li className="hover:text-background cursor-pointer">Help Center</li>
              <li className="hover:text-background cursor-pointer">Shipping</li>
              <li className="hover:text-background cursor-pointer">Returns</li>
              <li className="hover:text-background cursor-pointer">Track Order</li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <h6 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Newsletter</h6>
            <p className="text-xs text-background/60 mb-6">
              Join the circle for early access and collection previews.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="bg-white/5 border border-white/10 px-4 py-3 text-xs w-full focus:outline-none focus:border-white/40 transition-colors"
              />
              <button
                type="submit"
                className="bg-background text-foreground px-6 py-3 text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-background/90 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-medium text-background/40 uppercase tracking-widest">
          <span>&copy; {new Date().getFullYear()} Vantage Collective. All rights reserved.</span>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-background">Privacy</span>
            <span className="cursor-pointer hover:text-background">Terms</span>
            <span className="cursor-pointer hover:text-background">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
