import { Link, useNavigate } from "@tanstack/react-router";
import { Search, LogIn, LogOut } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const initials = (user?.user_metadata?.display_name || user?.email || "")
    .split(/[ @]/)[0]
    .slice(0, 2)
    .toUpperCase();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) navigate({ to: "/games", search: { q: q.trim() } as never });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-2 px-3 sm:h-16 sm:gap-4 sm:px-4">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img
            src={logo}
            alt="Swift Mod"
            width={36}
            height={36}
            className="h-9 w-9 rounded-lg object-contain"
          />
          <span className="hidden text-lg font-bold text-brand sm:inline">SWIFT MOD</span>
        </Link>

        <form
          onSubmit={onSearch}
          className="flex h-9 max-w-xl flex-1 items-center overflow-hidden rounded-md border border-border bg-card sm:h-10"
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search apps, games…"
            className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            aria-label="Search"
            className="flex h-full items-center gap-1 bg-primary px-3 text-sm font-semibold text-primary-foreground hover:opacity-90 sm:px-4"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </form>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {user ? (
            <div className="flex items-center gap-2 rounded-full border border-border bg-secondary py-1 pl-1 pr-2 sm:pr-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {initials || "U"}
              </div>
              <button
                onClick={signOut}
                aria-label="Sign out"
                className="hidden text-muted-foreground hover:text-destructive sm:inline-flex"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-2.5 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90 sm:px-3 sm:py-2 sm:text-sm"
            >
              <LogIn className="h-4 w-4" /> <span className="hidden xs:inline">Sign in</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
