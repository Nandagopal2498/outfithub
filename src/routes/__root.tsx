import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { CartProvider } from "@/lib/cart";
import { WishlistProvider } from "@/lib/wishlist";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-extrabold italic tracking-tighter uppercase">404</h1>
        <h2 className="mt-4 text-sm font-bold uppercase tracking-widest">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="mt-8 inline-block bg-foreground text-background px-8 py-4 text-[10px] font-bold uppercase tracking-widest"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-sm font-bold uppercase tracking-widest">Something went wrong</h1>
        <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-8 bg-foreground text-background px-8 py-4 text-[10px] font-bold uppercase tracking-widest"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VANTAGE — Engineered Simplicity" },
      {
        name: "description",
        content:
          "VANTAGE Collective — premium minimalist clothing, footwear and watches engineered for daily utility.",
      },
      { property: "og:title", content: "VANTAGE — Engineered Simplicity" },
      {
        property: "og:description",
        content: "Premium minimalist clothing, footwear and watches.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "VANTAGE — Engineered Simplicity" },
      { name: "description", content: "StyleHaven Storefront is a modern e-commerce website for clothing, inspired by top fashion retailers." },
      { property: "og:description", content: "StyleHaven Storefront is a modern e-commerce website for clothing, inspired by top fashion retailers." },
      { name: "twitter:description", content: "StyleHaven Storefront is a modern e-commerce website for clothing, inspired by top fashion retailers." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/cbabdb8c-8381-47a3-93b8-4f55e8dbbc87/id-preview-ac125015--8d44f5d9-f5c0-468b-960e-e9e6b33e580d.lovable.app-1780632348042.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/cbabdb8c-8381-47a3-93b8-4f55e8dbbc87/id-preview-ac125015--8d44f5d9-f5c0-468b-960e-e9e6b33e580d.lovable.app-1780632348042.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;1,800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <WishlistProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
          </div>
        </WishlistProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}
