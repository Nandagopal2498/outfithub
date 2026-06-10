import * as React from "react";
import { cn } from "@/lib/utils";

interface GoogleSignInButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const GoogleLogo = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const GoogleSignInButton = React.forwardRef<
  HTMLButtonElement,
  GoogleSignInButtonProps
>(({ className, isLoading, disabled, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled || isLoading}
      className={cn(
        // Base layout
        "group relative inline-flex w-full items-center justify-center gap-3",
        "h-12 px-4",
        "text-sm font-medium",
        "rounded-lg",
        // Colors
        "bg-white text-[#3c4043]",
        "border border-[#DADCE0]",
        // Shadow
        "shadow-[0_1px_3px_rgba(60,64,67,0.08)]",
        // Typography
        "font-sans antialiased",
        // Transitions
        "transition-all duration-200 ease-out",
        // Hover
        "hover:bg-[#F7F8F8] hover:shadow-[0_2px_6px_rgba(60,64,67,0.12)] hover:border-[#DADCE0]",
        // Active
        "active:bg-[#E8EAED] active:shadow-[0_1px_2px_rgba(60,64,67,0.06)]",
        // Focus
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]/40 focus-visible:ring-offset-2",
        // Disabled / loading
        "disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none disabled:hover:bg-white disabled:hover:shadow-none",
        isLoading && "cursor-wait",
        className,
      )}
      aria-label="Continue with Google"
      {...props}
    >
      {isLoading ? (
        <span
          className="absolute left-4 inline-flex h-5 w-5 items-center justify-center"
          aria-hidden="true"
        >
          <svg
            className="h-5 w-5 animate-spin text-[#4285F4]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </span>
      ) : (
        <span className="absolute left-4 inline-flex items-center justify-center">
          <GoogleLogo />
        </span>
      )}

      <span className="truncate">{isLoading ? "Signing in..." : (children ?? "Continue with Google")}</span>
    </button>
  );
});

GoogleSignInButton.displayName = "GoogleSignInButton";

export { GoogleSignInButton };
