import { Link, useLocation } from "@tanstack/react-router";
import {
  Home,
  Gamepad2,
  Package,
  TrendingUp,
  Trophy,
  Hash,
  Sword,
  Puzzle,
  Car,
  Trophy as Sports,
  Music,
  Camera,
  MessageCircle,
  Crown,
  ShieldCheck,
  Download,
} from "lucide-react";

const MAIN = [
  { to: "/", label: "Home", icon: Home },
  { to: "/games", label: "Games", icon: Gamepad2 },
  { to: "/apps", label: "Apps", icon: Package },
  { to: "/trending", label: "Trending", icon: TrendingUp },
  { to: "/rankings", label: "Top Charts", icon: Trophy },
  { to: "/topics", label: "Topics", icon: Hash },
] as const;

const CATEGORIES = [
  { label: "Action", icon: Sword, color: "#ef4444" },
  { label: "Puzzle", icon: Puzzle, color: "#8b5cf6" },
  { label: "Racing", icon: Car, color: "#f59e0b" },
  { label: "Sports", icon: Sports, color: "#0ea5e9" },
  { label: "Music", icon: Music, color: "#ec4899" },
  { label: "Photo", icon: Camera, color: "#22c55e" },
  { label: "Social", icon: MessageCircle, color: "#3b82f6" },
] as const;

export function Sidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="hidden w-60 shrink-0 border-r border-sidebar-border bg-sidebar md:block">
      <nav className="sticky top-16 flex max-h-[calc(100vh-4rem)] flex-col gap-1 overflow-y-auto p-3">
        <div className="mb-1 px-3 pt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Browse
        </div>
        {MAIN.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <Icon className="h-[18px] w-[18px]" />
              {label}
            </Link>
          );
        })}

        <div className="mb-1 mt-4 px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Categories
        </div>
        {CATEGORIES.map(({ label, icon: Icon, color }) => (
          <Link
            key={label}
            to="/games"
            search={{ category: label }}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <span
              className="flex h-6 w-6 items-center justify-center rounded-md"
              style={{ backgroundColor: color + "22", color }}
            >
              <Icon className="h-3.5 w-3.5" />
            </span>
            {label}
          </Link>
        ))}

        <div className="mb-1 mt-4 px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Status
        </div>
        <div className="rounded-md border border-border bg-background p-3">
          <div className="flex items-center gap-2 text-xs font-bold text-foreground">
            <ShieldCheck className="h-4 w-4" style={{ color: "#22C55E" }} />
            All Mods Verified
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Every APK is scanned for malware before listing.
          </p>
        </div>

        <a
          href="#install-app"
          onClick={(e) => {
            e.preventDefault();
            window.dispatchEvent(new Event("swiftmod:install"));
          }}
          className="mt-3 flex items-center justify-center gap-2 rounded-md px-3 py-2.5 text-sm font-bold text-white"
          style={{ backgroundColor: "#22C55E" }}
        >
          <Download className="h-4 w-4" /> Install App
        </a>

        <div className="mt-3 rounded-md bg-gradient-to-br from-amber-50 to-orange-50 p-3 text-center">
          <Crown className="mx-auto h-5 w-5 text-[#ff6d00]" />
          <div className="mt-1 text-xs font-bold">Go Pro</div>
          <p className="text-[11px] text-muted-foreground">Unlimited fast downloads.</p>
        </div>
      </nav>
    </aside>
  );
}
