import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";
import { Check, Tag } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () => ({
    meta: [
      { title: "Checkout — VANTAGE" },
      { name: "description", content: "Complete your VANTAGE order." },
    ],
  }),
});

const schema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  firstName: z.string().trim().min(1, "Required").max(80),
  lastName: z.string().trim().min(1, "Required").max(80),
  address: z.string().trim().min(3, "Required").max(200),
  city: z.string().trim().min(1, "Required").max(80),
  postal: z.string().trim().min(3, "Required").max(20),
  country: z.string().trim().min(2, "Required").max(80),
  card: z
    .string()
    .trim()
    .regex(/^[0-9\s]{12,23}$/, "Enter a valid card number"),
  expiry: z
    .string()
    .trim()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "MM/YY"),
  cvc: z
    .string()
    .trim()
    .regex(/^\d{3,4}$/, "3–4 digits"),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function CheckoutPage() {
  const { items, subtotal, shipping, discount, total, promoCode, clear } = useCart();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const tax = +(subtotal * 0.08).toFixed(2);
  const grandTotal = +(total + tax).toFixed(2);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    const res = schema.safeParse(data);
    if (!res.success) {
      const errs: Errors = {};
      for (const issue of res.error.issues) {
        const k = issue.path[0] as keyof Errors;
        if (!errs[k]) errs[k] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
    clear();
    setTimeout(() => navigate({ to: "/" }), 3500);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-6 py-32 text-center">
        <div className="size-16 bg-foreground text-background rounded-full grid place-items-center mx-auto mb-8">
          <Check className="size-7" strokeWidth={2.5} />
        </div>
        <h1 className="text-3xl md:text-5xl text-display mb-4">Order Confirmed</h1>
        <p className="text-sm text-muted-foreground mb-10">
          Your bag is on its way. A confirmation has been sent to your inbox.
        </p>
        <Link
          to="/"
          className="inline-block bg-foreground text-background px-10 py-4 text-[11px] font-bold uppercase tracking-widest"
        >
          Return Home
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-6 py-32 text-center">
        <h1 className="text-3xl text-display mb-6">Nothing to Checkout</h1>
        <p className="text-sm text-muted-foreground mb-8">Your bag is empty.</p>
        <Link
          to="/shop"
          className="inline-block bg-foreground text-background px-10 py-4 text-[11px] font-bold uppercase tracking-widest"
        >
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-12 md:py-20">
      <div className="mb-12">
        <p className="label-eyebrow text-muted-foreground mb-3">Step 02</p>
        <h1 className="text-4xl md:text-6xl text-display">Checkout</h1>
        <div className="w-12 h-1 bg-foreground mt-5" />
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16"
      >
        <div className="lg:col-span-7 space-y-10">
          <Section title="Contact">
            <Field name="email" label="Email" type="email" errors={errors} />
          </Section>

          <Section title="Delivery">
            <div className="grid grid-cols-2 gap-4">
              <Field name="firstName" label="First name" errors={errors} />
              <Field name="lastName" label="Last name" errors={errors} />
            </div>
            <Field name="address" label="Street address" errors={errors} />
            <div className="grid grid-cols-3 gap-4">
              <Field name="city" label="City" errors={errors} />
              <Field name="postal" label="Postal code" errors={errors} />
              <Field name="country" label="Country" errors={errors} defaultValue="USA" />
            </div>
          </Section>

          <Section title="Payment">
            <Field
              name="card"
              label="Card number"
              errors={errors}
              placeholder="0000 0000 0000 0000"
            />
            <div className="grid grid-cols-2 gap-4">
              <Field name="expiry" label="Expiry (MM/YY)" errors={errors} placeholder="08/28" />
              <Field name="cvc" label="CVC" errors={errors} placeholder="123" />
            </div>
          </Section>
        </div>

        <aside className="lg:col-span-5">
          <div className="bg-surface p-6 md:p-8 lg:sticky lg:top-28">
            <h2 className="label-eyebrow mb-6">Order Summary</h2>
            <ul className="space-y-4 pb-6 border-b border-border">
              {items.map((item) => {
                const p = getProduct(item.id);
                if (!p) return null;
                return (
                  <li
                    key={`${item.id}-${item.size}-${item.variant}`}
                    className="flex gap-4 items-center"
                  >
                    <div className="relative size-16 bg-background overflow-hidden shrink-0">
                      <img
                        src={p.variants.find((v) => v.name === item.variant)?.image ?? p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute -top-1 -right-1 bg-foreground text-background text-[10px] size-5 rounded-full grid place-items-center font-bold">
                        {item.qty}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold uppercase tracking-tight truncate">
                        {p.name}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span
                          className="inline-block w-2.5 h-2.5 rounded-full border border-border"
                          style={{
                            backgroundColor:
                              p.variants.find((v) => v.name === item.variant)?.swatch ??
                              "transparent",
                          }}
                        />
                        <span className="text-[11px] text-muted-foreground">
                          {item.variant} · {item.size}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold">${(p.price * item.qty).toFixed(2)}</span>
                  </li>
                );
              })}
            </ul>
            <div className="space-y-2 text-sm py-6 border-b border-border">
              <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              {discount > 0 && (
                <div className="flex justify-between text-green-700">
                  <span className="flex items-center gap-1.5 text-sm">
                    <Tag className="size-3" />
                    Discount ({promoCode})
                  </span>
                  <span className="font-semibold text-sm">-${discount.toFixed(2)}</span>
                </div>
              )}
              <Row label="Shipping" value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`} />
              <Row label="Tax" value={`$${tax.toFixed(2)}`} />
            </div>
            <div className="flex justify-between text-base font-bold py-6">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
            <button
              type="submit"
              className="w-full bg-foreground text-background py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-foreground/90 transition-colors"
            >
              Place Order
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="label-eyebrow mb-5 pb-3 border-b border-border">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  errors,
  placeholder,
  defaultValue,
}: {
  name: string;
  label: string;
  type?: string;
  errors: Errors;
  placeholder?: string;
  defaultValue?: string;
}) {
  const err = errors[name as keyof Errors];
  return (
    <label className="block">
      <span className="label-eyebrow block mb-2">{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`w-full border bg-background px-3 py-3 text-sm focus:outline-none transition-colors ${
          err ? "border-destructive" : "border-border focus:border-foreground"
        }`}
      />
      {err && <span className="block mt-1 text-[11px] text-destructive font-semibold">{err}</span>}
    </label>
  );
}
