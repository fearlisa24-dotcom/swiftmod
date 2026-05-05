import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Zap } from "lucide-react";

export const Route = createFileRoute("/auth")({ component: AuthPage });

function AuthPage() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: name || email.split("@")[0] },
          },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      nav({ to: "/" });
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-md py-12">
      <Link to="/" className="mb-6 flex items-center justify-center gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: "#22C55E" }}>
          <Zap className="h-6 w-6 text-white" fill="white" />
        </span>
        <span className="text-xl font-bold text-brand">SwiftMod</span>
      </Link>
      <div className="rounded-lg border border-border bg-card p-6">
        <h1 className="text-xl font-bold">{mode === "signin" ? "Sign in" : "Create account"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "signin" ? "Welcome back to SwiftMod." : "Join to comment, rate, and sync favorites."}
        </p>

        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Display name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary"
            />
          )}
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Password (min 6)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary"
          />
          {err && <p className="text-xs text-destructive">{err}</p>}
          <button
            type="submit"
            disabled={busy}
            className="h-10 w-full rounded-md font-bold text-white disabled:opacity-60"
            style={{ backgroundColor: "#22C55E" }}
          >
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-brand"
        >
          {mode === "signin" ? "No account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}
