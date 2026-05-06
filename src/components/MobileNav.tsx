import { Link, useLocation } from "@tanstack/react-router";
import { Home, Gamepad2, Package, TrendingUp, Menu } from "lucide-react";

const ITEMS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/games", label: "Games", icon: Gamepad2 },
  { to: "/apps", label: "Apps", icon: Package },
  { to: "/trending", label: "Trending", icon: TrendingUp },
  { to: "/topics", label: "More", icon: Menu },
] as const;

export function MobileNav() {
  const { pathname } = useLocation();
  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-card pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid grid-cols-5">
        {ITEMS.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <li key={to}>
              <Link
                to={to}
                className={`flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-semibold transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
