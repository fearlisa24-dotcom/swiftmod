import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function CookieBar() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem("swiftmod-cookie-ok")) setVisible(true);
  }, []);
  if (!visible) return null;
  return (
    <div className="fixed bottom-20 left-2 right-2 z-40 rounded-lg border border-border bg-card p-3 shadow-lg sm:bottom-4 sm:left-4 sm:right-4 md:left-auto md:right-4 md:max-w-md">
      <p className="text-xs text-foreground">
        We use cookies to personalise ads and analyse traffic. By using Swift Mod you agree to
        our{" "}
        <Link to="/privacy-policy" className="text-brand underline">
          cookie policy
        </Link>
        .
      </p>
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            localStorage.setItem("swiftmod-cookie-ok", "1");
            setVisible(false);
          }}
          className="rounded-md bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground hover:opacity-90"
        >
          Accept
        </button>
        <Link to="/privacy-policy" className="text-xs text-muted-foreground hover:text-brand">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}
