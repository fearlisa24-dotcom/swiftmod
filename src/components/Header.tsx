import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";

const TRENDING = [
  "Toca Boca World",
  "Avatar World",
  "Car Parking Multiplayer",
  "Minecraft",
  "Poppy Playtime",
  "Spotify",
  "Roblox",
];

export function Header() {
  const [q, setQ] = useState("");
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="PlayMods" width={36} height={36} className="h-9 w-9" />
          <span className="text-lg font-bold text-brand">PlayMods</span>
        </Link>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="ml-auto flex h-10 max-w-xl flex-1 items-center overflow-hidden rounded-md border border-border bg-card"
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
