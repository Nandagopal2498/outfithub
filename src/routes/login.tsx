import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Sign In — VANTAGE" },
      { name: "description", content: "Sign in to your VANTAGE account." },
    ],
  }),
});

function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setError(null);
    setDone(true);
  };

  return (
    <div className="min-h-[80vh] grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:block bg-foreground relative">
        <div className="absolute inset-0 p-16 flex flex-col justify-between text-background">
          <span className="text-3xl font-extrabold tracking-tighter uppercase italic">VANTAGE</span>
          <div>
            <p className="label-eyebrow text-background/60 mb-4">Members Circle</p>
            <h2 className="text-5xl text-display leading-[0.9]">
              Early access.
              <br />
              Better terms.
            </h2>
            <p className="mt-6 text-sm text-background/60 max-w-sm">
              Join the circle for first looks at every drop, member-only releases, and seamless
              returns.
            </p>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-background/40">
            Engineered Simplicity
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          <p className="label-eyebrow text-muted-foreground mb-3">Account</p>
          <h1 className="text-4xl md:text-5xl text-display mb-3">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </h1>
          <p className="text-sm text-muted-foreground mb-10">
            {mode === "signin" ? "Welcome back to the circle." : "Start your VANTAGE membership."}
          </p>

          {done ? (
            <div className="border border-foreground p-8 text-center">
              <p className="text-sm font-bold uppercase tracking-widest mb-3">
                {mode === "signin" ? "Signed In" : "Welcome"}
              </p>
              <p className="text-sm text-muted-foreground mb-6">Authentication is a demo only.</p>
              <Link
                to="/"
                className="inline-block bg-foreground text-background px-8 py-3 text-[11px] font-bold uppercase tracking-widest"
              >
                Continue
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {mode === "signup" && <Input name="name" type="text" label="Full Name" />}
              <Input name="email" type="email" label="Email" />
              <Input name="password" type="password" label="Password" />

              {error && <p className="text-[11px] font-semibold text-destructive">{error}</p>}

              <button
                type="submit"
                className="w-full bg-foreground text-background py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-foreground/90 transition-colors"
              >
                {mode === "signin" ? "Sign In" : "Create Account"}
              </button>

              <p className="text-xs text-center text-muted-foreground pt-4">
                {mode === "signin" ? "New to VANTAGE?" : "Already a member?"}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode(mode === "signin" ? "signup" : "signin");
                    setError(null);
                  }}
                  className="text-foreground font-bold uppercase tracking-widest text-[11px] border-b border-foreground"
                >
                  {mode === "signin" ? "Create Account" : "Sign In"}
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({ name, type, label }: { name: string; type: string; label: string }) {
  return (
    <label className="block">
      <span className="label-eyebrow block mb-2">{label}</span>
      <input
        name={name}
        type={type}
        className="w-full border border-border bg-background px-3 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
      />
    </label>
  );
}
