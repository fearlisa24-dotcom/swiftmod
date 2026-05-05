import { Link } from "@tanstack/react-router";
import { Search, Bell, Upload, Award, LogIn, LogOut, Download } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";
import { useAuth } from "@/hooks/useAuth";

const TRENDING = [
  "Toca Boca World",
  "Minecraft",
  "Roblox",
  "Spotify",
  "Genshin Impact",
  "Subway Surfers",
  "TikTok",
];

export function Header() {
  const [q, setQ] = useState("");
  const { user, signOut } = useAuth();
  const initials = (user?.user_metadata?.display_name || user?.email || "")
    .split(/[ @]/)[0]
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="SwiftMod" width={36} height={36} className="h-9 w-9 rounded-lg" />
          <span className="text-lg font-bold text-brand">SwiftMod</span>
        </Link>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="ml-4 flex h-10 max-w-xl flex-1 items-center overflow-hidden rounded-md border border-border bg-card"
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search apps, games, mods…"
            className="h-full flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="flex h-full items-center gap-1 bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
        </form>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => window.dispatchEvent(new Event("swiftmod:install"))}
            className="hidden items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm font-semibold hover:border-primary hover:text-primary lg:inline-flex"
            type="button"
          >
            <Download className="h-4 w-4" /> Get App
          </button>
          <button
            className="hidden items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 sm:inline-flex"
            type="button"
          >
            <Upload className="h-4 w-4" /> Upload Mod
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-secondary"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#ff6d00]" />
          </button>
          {user ? (
            <div className="flex items-center gap-2 rounded-full border border-border bg-secondary py-1 pl-1 pr-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {initials || "U"}
              </div>
              <span className="hidden items-center gap-1 text-xs font-bold text-foreground md:inline-flex">
                <Award className="h-3.5 w-3.5 text-[#ff6d00]" />
                Lv 1
              </span>
              <button
                onClick={signOut}
                aria-label="Sign out"
                className="text-muted-foreground hover:text-destructive"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              <LogIn className="h-4 w-4" /> Sign in
            </Link>
          )}
        </div>
      </div>

      <div className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-[1400px] items-center gap-2 overflow-x-auto px-4 py-2">
          <span className="shrink-0 text-xs font-semibold text-muted-foreground">Trending:</span>
          {TRENDING.map((t) => (
            <span
              key={t}
              className="shrink-0 cursor-pointer rounded-full border border-border bg-secondary px-3 py-1 text-xs text-foreground hover:border-brand hover:text-brand"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
