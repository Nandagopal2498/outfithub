import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { z } from "zod";
import { useState, useEffect } from "react";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

const loginSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/login")({
  validateSearch: loginSearchSchema,
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Sign In — VANTAGE" },
      { name: "description", content: "Sign in to your VANTAGE account." },
    ],
  }),
});

function LoginPage() {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate({ to: redirect || "/" });
    }
  }, [user, loading, navigate, redirect]);

  const handleGoogle = async () => {
    setError(null);
    setGoogleLoading(true);
    if (redirect) {
      sessionStorage.setItem("auth_redirect", redirect);
    }
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError(result.error.message || "Google sign-in failed.");
      setGoogleLoading(false);
      return;
    }
    if (result.redirected) return;
    toast.success("Signed in");
    navigate({ to: redirect || "/" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const fullName = String(form.get("name") || "").trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      if (mode === "signup") {
        const { error: err } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: fullName },
          },
        });
        if (err) throw err;
        toast.success("Account created");
        navigate({ to: redirect || "/" });
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
        toast.success("Signed in");
        navigate({ to: redirect || "/" });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Authentication failed.";
      setError(msg.includes("Invalid login") ? "Invalid email or password." : msg);
    } finally {
      setSubmitting(false);
    }
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

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <GoogleSignInButton onClick={handleGoogle} isLoading={googleLoading} />

            <div className="relative flex items-center justify-center py-1">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <span className="relative bg-background px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                or
              </span>
            </div>

            {mode === "signup" && <Input name="name" type="text" label="Full Name" />}
            <Input name="email" type="email" label="Email" />
            <Input name="password" type="password" label="Password" />

            {error && <p className="text-[11px] font-semibold text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-foreground text-background py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-foreground/90 transition-colors disabled:opacity-60"
            >
              {submitting ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
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

          <p className="text-[10px] text-center text-muted-foreground mt-6">
            <Link to="/" className="hover:text-foreground">Back to shopping</Link>
          </p>
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
